<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Division;
use App\Models\UserGroup;
use Inertia\Inertia;

class AreaBrowseController extends Controller
{
    public function index()
    {
        return Inertia::render('/Browse', [
            'userGroups' => UserGroup::orderBy('name')->get(['id', 'name']),
            'areas' => Area::with('userGroup')->orderBy('name')->get(['id', 'user_group_id', 'name']),
            'selectedArea' => null,
            'divisions' => [],
            'selectedDivision' => null,
            'districts' => [],
        ]);
    }

    public function showArea(Area $area)
    {
        $area->load('userGroup');

        return Inertia::render('/Browse', [
            'userGroups' => UserGroup::orderBy('name')->get(['id', 'name']),
            'areas' => Area::with('userGroup')->orderBy('name')->get(['id', 'user_group_id', 'name']),
            'selectedArea' => $area->only(['id', 'name', 'user_group_id']),
            'divisions' => Division::where('area_id', $area->id)->orderBy('name')->get(['id', 'area_id', 'name']),
            'selectedDivision' => null,
            'districts' => [],
        ]);
    }

    public function showDivision(Area $area, Division $division)
    {
        // Safety: division must belong to area
        abort_unless($division->area_id === $area->id, 404);

        return Inertia::render('/Browse', [
            'userGroups' => UserGroup::orderBy('name')->get(['id', 'name']),
            'areas' => Area::with('userGroup')->orderBy('name')->get(['id', 'user_group_id', 'name']),
            'selectedArea' => $area->only(['id', 'name', 'user_group_id']),
            'divisions' => Division::where('area_id', $area->id)->orderBy('name')->get(['id', 'area_id', 'name']),
            'selectedDivision' => $division->only(['id', 'name', 'area_id']),
            'districts' => $division->districts()->orderBy('name')->get(['id', 'division_id', 'name']),
        ]);
    }
}
