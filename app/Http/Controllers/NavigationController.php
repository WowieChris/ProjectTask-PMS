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
use Illuminate\Support\Facades\Auth;

class NavigationController extends Controller
{

    // public function index()
    // {
    //     $divisions = Division::with('districts.areas.branches')->get();

    //     return Inertia::render('ConfigFiles/Navigation/Index', [
    //         'userGroups' => UserGroup::all(),
    //         'divisions' => Division::with('districts.areas.branches')->get(),
    //     ]);
    // }
    public function index(Request $request)
    {
        $userGroupId = $request->input('user_group_id');

        $divisions = Division::with('districts.areas.branches')->get();
        $districts = District::with([
            'areas',
            'engineer' // base engineer
        ])->get();

        $engineers = User::whereHas('designation', function ($q) {
            $q->where('name', 'Field Engineer');
        })->get();

        $areaAssignments = AreaEngineer::all();

        // ✅ FILTER SENIOR FIELD (SFE)

        $seniorFields = User::whereHas('designation', function ($q) {
            $q->where('name', 'Senior Field Engineer');
        })
            ->when($userGroupId, function ($query) use ($userGroupId) {
                $query->where('user_group_id', $userGroupId);
            })
            ->get();


        return Inertia::render('ConfigFiles/Navigation/Index', [
            'userGroups'   => UserGroup::all(),
            'seniorFields' => $seniorFields, // ✅ THIS IS WHAT YOU WILL DISPLAY
            'districts'       => District::with(['areas', 'engineer'])->get(),
            'engineers'       => User::whereHas('designation', fn($q) => $q->where('name', 'Field Engineer'))->get(),
            'areaAssignments' => $areaAssignments,
            'divisions' => Division::with('districts.areas.branches')->get(),
        ]);

        //         return Inertia::render('Navigation/Index', [

        //     // 👇 add these
        //     'districts'       => District::with(['areas', 'engineer'])->get(),
        //     'engineers'       => User::whereHas('designation', fn($q) => $q->where('name', 'Field Engineer'))->get(),
        //     'areaAssignments' => AreaAssignment::all(),
        // ]);
    }

    private function getParentName(string $type, ?int $parentId): ?string
    {
        if (!$parentId) return null;

        return match ($type) {
            'district' => Division::where('id', $parentId)->value('name'),
            'area'     => District::where('id', $parentId)->value('name'),
            'branch'   => Area::where('id', $parentId)->value('name'),
            default    => null,
        };
    }

    // Working MOve 
    // public function move(Request $request)
    // {
    //     $request->validate([
    //         'type'      => 'required|in:district,area,branch',
    //         'id'        => 'required|integer',
    //         'parent_id' => 'required|integer',
    //     ]);

    //     match ($request->type) {
    //         'district' => District::findOrFail($request->id)
    //             ->update(['division_id' => $request->parent_id]),
    //         'area'     => Area::findOrFail($request->id)
    //             ->update(['district_id' => $request->parent_id]),
    //         'branch'   => Branch::findOrFail($request->id)
    //             ->update(['area_id' => $request->parent_id]),
    //     };

    //     return back()->with('success', 'Location moved successfully.');
    // }

    // MOVE 
    public function move(Request $request)
    {
        DB::transaction(function () use ($request) {

            $type = $request->type;
            $id = $request->id;
            $newParentId = $request->parent_id;

            $model = null;
            $oldParentId = null;
            $fromName = null;
            $toName = null;

            switch ($type) {

                case 'district':
                    $model = District::findOrFail($id);
                    $oldParentId = $model->division_id;

                    // resolve BEFORE update
                    $fromName = Division::where('id', $oldParentId)->value('name');
                    $toName   = Division::where('id', $newParentId)->value('name');

                    $model->division_id = $newParentId;
                    break;

                case 'area':
                    $model = Area::findOrFail($id);
                    $oldParentId = $model->district_id;

                    $fromName = District::where('id', $oldParentId)->value('name');
                    $toName   = District::where('id', $newParentId)->value('name');

                    $model->district_id = $newParentId;
                    break;

                case 'branch':
                    $model = Branch::findOrFail($id);
                    $oldParentId = $model->area_id;

                    $fromName = Area::where('id', $oldParentId)->value('name');
                    $toName   = Area::where('id', $newParentId)->value('name');

                    $model->area_id = $newParentId;
                    break;

                default:
                    throw new \Exception("Invalid type");
            }

            $model->save();

            // ✅ FINAL SAFETY FALLBACK (THIS FIXES YOUR ISSUE)
            $fromName = $fromName ?? "Unknown";
            $toName   = $toName ?? "Unknown";

            LocationTransferLog::create([
                'type' => $type,
                'location_id' => $id,
                'location_name' => $model->name ?? "Unknown",

                'from_parent_id' => $oldParentId,
                'from_parent_name' => $fromName,

                'to_parent_id' => $newParentId,
                'to_parent_name' => $toName,

                'effectivity_date' => $request->effectivity_date ?? now(),
                'moved_by' => Auth::id(),
            ]);
        });

        return back()->with('success', 'Location moved successfully');
    }
    // Full Paths
    private function getFullPath($type, $id)
    {
        if ($type === 'branch') {
            $branch = Branch::with('area.district.division')->find($id);

            return $branch
                ? "{$branch->area->district->division->name} > {$branch->area->district->name} > {$branch->area->name}"
                : null;
        }

        return null;
    }

    private function resolveModel(string $type)
    {
        return match ($type) {
            'division' => \App\Models\Division::class,
            'district' => \App\Models\District::class,
            'area' => \App\Models\Area::class,
            'branch' => \App\Models\Branch::class,
            default => throw new \Exception("Invalid type"),
        };
    }


    // Store
    public function store(Request $request)
    {
        DB::transaction(function () use ($request) {

            // 🔥 SAVE BASE ENGINEER
            if ($request->base_engineer) {
                DistrictEngineer::updateOrCreate(
                    ['district_id' => $request->district_id],
                    ['user_id' => $request->base_engineer]
                );
            } else {
                DistrictEngineer::where('district_id', $request->district_id)->delete();
            }

            // 🔥 SAVE AREA OVERRIDES
            foreach ($request->overrides as $area_id => $user_id) {

                if ($user_id) {
                    AreaEngineer::updateOrCreate(
                        ['area_id' => $area_id],
                        ['user_id' => $user_id]
                    );
                } else {
                    AreaEngineer::where('area_id', $area_id)->delete();
                }
            }
        });

        return back()->with('success', 'Assignment saved!');
    }

    //logs
    public function logs(Request $request)
    {
        $logs = LocationTransferLog::with('user')
            ->latest()
            ->limit(100)
            ->get();

        return Inertia::render('ConfigFiles/Navigation/Logs', [
            'logs' => $logs
        ]);
    }
}
