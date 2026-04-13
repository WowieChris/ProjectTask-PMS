<?php

namespace App\Http\Controllers;

use App\Models\Division;
use Inertia\Inertia;
use App\Models\UserGroup;
use Illuminate\Http\Request;
use App\Models\District;
use App\Models\Area;
use App\Models\Branch;
use App\Models\AreaEngineer;
use App\Models\User;
use App\Models\DistrictEngineer;
use Illuminate\Support\Facades\DB;
use App\Models\LocationTransferLog;
use App\Models\EngineerMovementLog;  // ✅ correct model
use Illuminate\Support\Facades\Auth;

class NavigationController extends Controller
{
    public function index(Request $request)
    {
        $userGroupId = $request->input('user_group_id');

        $areaAssignments = AreaEngineer::all();

        $seniorFields = User::with('userGroup', 'designation')
            ->whereHas('designation', function ($q) {
                $q->where('name', 'Senior Field Engineer');
            })
            ->when($userGroupId, function ($query) use ($userGroupId) {
                $query->where('user_group_id', $userGroupId);
            })
            ->get()
            ->map(fn($u) => [
                'id'            => $u->id,
                'name'          => $u->name,
                'last_name'     => $u->last_name,
                'user_group_id' => $u->user_group_id,
                'userGroup'     => $u->userGroup ? [
                    'id'   => $u->userGroup->id,
                    'name' => $u->userGroup->name,
                ] : null,
            ]);

        return Inertia::render('ConfigFiles/Navigation/Index', [
            'userGroups'      => UserGroup::all(),
            'seniorFields'    => $seniorFields,
            'districts'       => District::with(['areas', 'engineer'])->get(),
            'engineers'       => User::whereHas('designation', fn($q) => $q->where('name', 'Field Engineer'))->get(),
            'areaAssignments' => $areaAssignments,
            'divisions'       => Division::with('districts.areas.branches')->get(),
            'filters'         => ['user_group_id' => $userGroupId],
        ]);
    }

    public function move(Request $request)
    {
        $request->validate([
            'type'      => 'required|in:district,area,branch',
            'id'        => 'required|integer',
            'parent_id' => 'required|integer',
        ]);

        DB::transaction(function () use ($request) {

            $type        = $request->type;
            $id          = $request->id;
            $newParentId = $request->parent_id;
            $model       = null;
            $oldParentId = null;
            $fromName    = null;
            $toName      = null;

            switch ($type) {

                case 'district':
                    $model       = District::findOrFail($id);
                    $oldParentId = $model->division_id;
                    $fromName    = Division::find($oldParentId)?->name ?? 'Unknown';
                    $toName      = Division::find($newParentId)?->name ?? 'Unknown';
                    $model->division_id = $newParentId;
                    break;

                case 'area':
                    $model       = Area::findOrFail($id);
                    $oldParentId = $model->district_id;
                    $fromName    = District::find($oldParentId)?->name ?? 'Unknown';
                    $toName      = District::find($newParentId)?->name ?? 'Unknown';
                    $model->district_id = $newParentId;
                    break;

                case 'branch':
                    $model       = Branch::findOrFail($id);
                    $oldParentId = $model->area_id;
                    $fromName    = Area::find($oldParentId)?->name ?? 'Unknown';
                    $toName      = Area::find($newParentId)?->name ?? 'Unknown';
                    $model->area_id = $newParentId;
                    break;

                default:
                    throw new \Exception("Invalid type");
            }

            $model->save();

            LocationTransferLog::create([
                'type'             => $type,
                'location_id'      => $id,
                'location_name'    => $model->name ?? 'Unknown',
                'from_parent_id'   => $oldParentId,
                'from_parent_name' => $fromName,
                'to_parent_id'     => $newParentId,
                'to_parent_name'   => $toName,
                'effectivity_date' => $request->effectivity_date ?? now(),
                'moved_by'         => Auth::id(),
            ]);
        });

        return back()->with('success', 'Location moved successfully.');
    }

    public function store(Request $request)
    {
        DB::transaction(function () use ($request) {

            $districtId = $request->district_id;

            // 1. Get previous base engineer name (before update)
            $previousEngineer = DistrictEngineer::with('user')
                ->where('district_id', $districtId)
                ->first();
            $previousEngineerName = $previousEngineer?->user?->name ?? '—';

            // 2. Save or clear base engineer
            if ($request->base_engineer) {
                DistrictEngineer::updateOrCreate(
                    ['district_id' => $districtId],
                    ['user_id'     => $request->base_engineer]
                );
            } else {
                DistrictEngineer::where('district_id', $districtId)->delete();
            }

            // 3. Always wipe old area overrides for this district first
            $areas = Area::where('district_id', $districtId)->get();
            $areaIds = $areas->pluck('id');
            AreaEngineer::whereIn('area_id', $areaIds)->delete();

            // 4. Re-insert new overrides and log each change
            foreach ($request->overrides ?? [] as $area_id => $user_id) {
                if ($user_id) {
                    AreaEngineer::create([
                        'area_id' => $area_id,
                        'user_id' => $user_id,
                    ]);
                }

                // Log the movement per area
                $area            = $areas->firstWhere('id', $area_id);
                $newEngineerName = $user_id
                    ? User::find($user_id)?->name ?? '—'
                    : (User::find($request->base_engineer)?->name ?? '—');

                EngineerMovementLog::create([
                    'area_name'         => $area?->name ?? "Area #{$area_id}",
                    'previous_engineer' => $previousEngineerName,
                    'new_engineer'      => $newEngineerName,
                    'assigned_by'       => Auth::user()?->name ?? '—',
                    'effectivity_date'  => now()->toDateString(),
                ]);
            }

            // 5. If no overrides, still log the base engineer change for all areas
            if (empty($request->overrides)) {
                $newEngineerName = $request->base_engineer
                    ? User::find($request->base_engineer)?->name ?? '—'
                    : '—';

                foreach ($areas as $area) {
                    EngineerMovementLog::create([
                        'area_name'         => $area->name,
                        'previous_engineer' => $previousEngineerName,
                        'new_engineer'      => $newEngineerName,
                        'assigned_by'       => Auth::user()?->name ?? '—',
                        'effectivity_date'  => now()->toDateString(),
                    ]);
                }
            }
        });

        return back()->with('success', 'Assignment saved!');
    }

    public function logs(Request $request)
    {
        $logs = LocationTransferLog::with('user')
            ->latest()
            ->limit(100)
            ->get();

        return Inertia::render('ConfigFiles/Navigation/Logs', [
            'logs' => $logs,
        ]);
    }

    public function engineerTransferLogs()
    {
        $logs = EngineerMovementLog::latest()->get();

        return Inertia::render('ConfigFiles/Navigation/EngineerTransferLogs', [
            'logs' => $logs,
        ]);
    }

    public function assignSeniorFieldGroup(Request $request)
    {
        $request->validate([
            'senior_field_id' => 'required|exists:users,id',
            'user_group_id'   => 'nullable|exists:user_groups,id',
        ]);

        User::where('id', $request->senior_field_id)
            ->update(['user_group_id' => $request->user_group_id ?: null]);

        return back()->with('success', 'Senior Field Engineer assigned!');
    }
}
