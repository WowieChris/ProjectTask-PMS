<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Branch;
use App\Models\District;
use App\Models\Division;
use App\Models\Employee;
use App\Models\UserGroup;

class OrgChartController extends Controller
{
    public function index()
{
    $userGroup = UserGroup::first();

    if (! $userGroup) {
        return response()->json(['error' => 'No user group found'], 404);
    }

    $orgChartData = $this->buildOrgChart($userGroup);

    return inertia('orgchart/index', [
        'orgChartData' => $orgChartData
    ]);
}

    public function update($id)
    {
        $validated = request()->validate([
            'name' => 'nullable|string|max:255',
            'type' => 'nullable|in:user-group,division,district,area,branch',
        ]);

        // Determine model based on type
        $type = request()->input('type');

        if ($type === 'division') {
            $model = Division::findOrFail($id);
        } elseif ($type === 'district') {
            $model = District::findOrFail($id);
        } elseif ($type === 'area') {
            $model = Area::findOrFail($id);
        } elseif ($type === 'branch') {
            $model = Branch::findOrFail($id);
        } else {
            return response()->json(['error' => 'Invalid type'], 400);
        }

        $model->update($validated);

        return response()->json(['success' => true, 'data' => $model]);
    }

    private function buildOrgChart(UserGroup $userGroup)
    {
        $headcount = Employee::where('user_group_id', null)->count();

        return [
            'id' => $userGroup->id,
            'name' => $userGroup->name ?? 'Executive Leadership',
            'type' => 'user-group',
            'role' => 'Leadership',
            'details' => [
                'manager' => 'Chief Executive Officer',
                'headcount' => $headcount,
                'performance' => 'On Track',
            ],
            'children' => $userGroup->divisions()->with('districts')->get()->map(function (Division $division) {
                return $this->buildDivision($division);
            })->toArray(),
        ];
    }

    private function buildDivision(Division $division)
    {
        $headcount = Employee::where('division_id', $division->id)->count();

        return [
            'id' => $division->id,
            'name' => $division->name,
            'type' => 'division',
            'role' => 'Division',
            'details' => [
                'manager' => 'VP '.$division->name,
                'headcount' => $headcount,
                'performance' => 'On Track',
            ],
            'children' => $division->districts()->with('areas')->get()->map(function (District $district) {
                return $this->buildDistrict($district);
            })->toArray(),
        ];
    }

    private function buildDistrict(District $district)
    {
        $headcount = Employee::where('district_id', $district->id)->count();

        return [
            'id' => $district->id,
            'name' => $district->name,
            'type' => 'district',
            'role' => 'District',
            'details' => [
                'manager' => 'District Manager',
                'headcount' => $headcount,
                'performance' => 'On Track',
            ],
            'children' => $district->areas()->with('branches')->get()->map(function (Area $area) {
                return $this->buildArea($area);
            })->toArray(),
        ];
    }

    private function buildArea(Area $area)
    {
        $headcount = Employee::where('area_id', $area->id)->count();

        return [
            'id' => $area->id,
            'name' => $area->name,
            'type' => 'area',
            'role' => 'Area',
            'details' => [
                'manager' => 'Area Lead',
                'headcount' => $headcount,
                'performance' => 'On Track',
            ],
            'children' => $area->branches()->get()->map(function (Branch $branch) {
                return $this->buildBranch($branch);
            })->toArray(),
        ];
    }

    private function buildBranch(Branch $branch)
    {
        $headcount = Employee::where('branch_id', $branch->id)->count();

        return [
            'id' => $branch->id,
            'name' => $branch->name,
            'type' => 'branch',
            'role' => 'Branch',
            'details' => [
                'manager' => 'Branch Manager',
                'headcount' => $headcount,
            ],
            'children' => [],
        ];
    }
}
