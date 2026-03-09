<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Area;
use App\Models\District;
use App\Models\Branch;

class AreaController extends Controller
{

    public function index()
    {
        return Inertia::render('Areas/Index', [
            'areas' => Area::with('userGroup')->get(),
            'selectedArea' => null,
            'divisions' => [],
            'selectedDivision' => null,
            'districts' => [],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_group_id' => ['required', 'exists:user_groups,id'],
            'name' => ['required', 'string', 'max:255'],
        ]);

        $exists = Area::where('user_group_id', $data['user_group_id'])
            ->where('name', $data['name'])
            ->exists();

        if ($exists) {
            // ✅ return error under "name" so TSX can show it without "any"
            return back()->withErrors([
                'name' => 'Area already exists in this User Group.',
            ]);
        }

        Area::create($data);

        return back()->with('success', 'Area added.');
    }

    public function destroy(Area $area)
    {
        $area->delete();

        return back()->with('success', 'Area deleted.');
    }
}
