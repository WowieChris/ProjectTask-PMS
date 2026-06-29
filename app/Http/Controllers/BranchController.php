<?php
 
namespace App\Http\Controllers;
 
use App\Models\Area;
use App\Models\Branch;
use App\Services\NominatimGeocodingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\District;
use App\Models\Division;
 
class BranchController extends Controller
{
    public function __construct(protected NominatimGeocodingService $geocoder) {}
 
    public function index()
    {
        $branches = Branch::with(['district', 'area'])->get();
 
        return Inertia::render('Branches/Index', [
            'branches'  => $branches,
            'areas'     => Area::all(),
            'districts' => District::all(),
            'divisions' => Division::all(),
        ]);
    }
 
    public function store(Request $request)
    {
        $request->validate([
            'area_id' => 'required|exists:areas,id',
            'name'    => 'required|string|max:255',
            'address' => 'nullable|string|max:500',
        ]);
 
        $area   = Area::findOrFail($request->area_id);
        $branch = Branch::create([
            'name'        => $request->name,
            'area_id'     => $area->id,
            'district_id' => $area->district_id,
            'address'     => $request->address,
        ]);
 
        $this->geocodeBranch($branch);
 
        return redirect()->back();
    }
 
    public function update(Request $request, $id)
    {
        $request->validate([
            'area_id' => 'required|exists:areas,id',
            'name'    => 'required|string|max:255',
            'address' => 'nullable|string|max:500',
        ]);
 
        $area   = Area::findOrFail($request->area_id);
        $branch = Branch::findOrFail($id);
 
        $addressChanged = $branch->address !== $request->address;
 
        $branch->update([
            'name'        => $request->name,
            'area_id'     => $area->id,
            'district_id' => $area->district_id,
            'address'     => $request->address,
        ]);
 
        // Only re-geocode if the address actually changed — avoids unnecessary API calls
        if ($addressChanged && $request->filled('address')) {
            $this->geocodeBranch($branch->fresh());
        }
 
        return redirect()->back();
    }
 
    public function destroy($id)
    {
        Branch::findOrFail($id)->delete();
 
        return redirect()->back();
    }
 
    protected function geocodeBranch(Branch $branch): void
    {
        if (! $branch->address) {
            return;
        }
 
        $result = $this->geocoder->geocode($branch->address);
 
        $branch->update(
            $result
                ? [
                    'latitude'       => $result['lat'],
                    'longitude'      => $result['lon'],
                    'geocode_status' => 'success',
                    'geocoded_at'    => now(),
                ]
                : [
                    'geocode_status' => 'failed',
                    'geocoded_at'    => now(),
                ]
        );
    }
}