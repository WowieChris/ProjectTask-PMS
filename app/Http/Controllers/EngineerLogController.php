<?php

namespace App\Http\Controllers;

use App\Models\AreaEngineer;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Area;
use Illuminate\Support\Facades\Auth;
use App\Models\EngineerMovementLog;
use Illuminate\Support\Facades\DB;

class EngineerLogController extends Controller
{
    public function index()
    {
        return Inertia::render('ConfigFiles/Navigation/EngineerLogs', [
            'engineerLogs' => EngineerMovementLog::latest()->get()
        ]);
    }

    public function saveAssignment(Request $request)
    {
        $request->validate([
            'areas' => 'required|array',
            'areas.*.id' => 'required|exists:areas,id',
            'areas.*.engineer_id' => 'nullable|exists:users,id',
        ]);

        // Get all users (id => name)
        $users = User::pluck('name', 'id');

        DB::transaction(function () use ($request, $users) {

            // Fetch all areas in one query
            $areas = Area::with('district.engineer')
                ->whereIn('id', collect($request->areas)->pluck('id'))
                ->get()
                ->keyBy('id');

            foreach ($request->areas as $areaData) {

                $area = $areas[$areaData['id']] ?? null;
                if (!$area) continue;

                $newEngineerId = $areaData['engineer_id'];

                // Get old engineer safely
                $oldEngineerId = $area->engineer_id
                    ?? optional($area->district->engineer)->user_id
                    ?? null;

                // Only log if changed
                if ($oldEngineerId != $newEngineerId) {

                    EngineerMovementLog::create([
                        'area_name' => $area->name,
                        'previous_engineer' => $oldEngineerId && isset($users[$oldEngineerId])
                            ? $users[$oldEngineerId]
                            : 'None',
                        'new_engineer' => $newEngineerId && isset($users[$newEngineerId])
                            ? $users[$newEngineerId]
                            : 'None',
                        'assigned_by' => Auth::user()->name,
                        'effectivity_date' => now()->toDateString(),
                    ]);
                }

                // Update assignment
                $area->update([
                    'engineer_id' => $newEngineerId
                ]);
            }
        });

        return back()->with('success', 'Assignments saved!');
    }
}
