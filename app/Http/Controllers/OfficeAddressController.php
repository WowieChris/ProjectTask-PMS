<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Models\FieldBranch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Division;
use Illuminate\Support\Facades\DB;

class OfficeAddressController extends Controller
{
// ── Replace the existing mapData() method in OfficeAddressController with this ──

public function mapData(): JsonResponse
{
    // ── Step 1: Collect allowed IDs from org_field_setup ─────────────────────
    // Used to filter the standard org hierarchy (divisions/districts/areas/branches).
    // If the table is empty, those levels simply return nothing.
    $rows = DB::table('org_field_setup')
        ->select([
            'org_field_division_id',
            'org_field_district_id',
            'org_field_area_id',
            'org_field_branch_id',
        ])
        ->get();
 
    $allowedIds = [
        'DIVISION' => $rows->pluck('org_field_division_id')->filter()->unique()->values()->all(),
        'DISTRICT' => $rows->pluck('org_field_district_id')->filter()->unique()->values()->all(),
        'AREA'     => $rows->pluck('org_field_area_id')->filter()->unique()->values()->all(),
        'BRANCH'   => $rows->pluck('org_field_branch_id')->filter()->unique()->values()->all(),
    ];
 
    // ── Step 2: Standard org levels via org_office_address_setups ─────────────
    $segmentMap = [
        'DIVISION' => ['table' => 'divisions', 'level' => 'division'],
        'DISTRICT' => ['table' => 'districts', 'level' => 'district'],
        'AREA'     => ['table' => 'areas',     'level' => 'area'],
        'BRANCH'   => ['table' => 'branches',  'level' => 'branch'],
    ];
 
    $offices = collect();
 
    foreach ($segmentMap as $segment => $config) {
        $ids = $allowedIds[$segment];
 
        // No entries in org_field_setup for this level — skip it
        if (empty($ids)) {
            continue;
        }
 
        // Source 1: structured address from org_office_address_setups
        $fromSetup = DB::table('org_office_address_setup as oa')
            ->join($config['table'] . ' as o', 'o.id', '=', DB::raw('CAST(oa.org_office_id AS UNSIGNED)'))
            ->where('oa.org_office_segment', $segment)
            ->where('oa.active_yn', true)
            ->whereNotNull('oa.latitude')
            ->whereNotNull('oa.longitude')
            ->whereIn('oa.org_office_id', $ids)
            ->select([
                'oa.org_office_address_setup_id', 'oa.org_office_id', 'o.name',
                'oa.org_office_address_1', 'oa.org_office_address_2',
                'oa.org_office_barangay', 'oa.org_office_city',
                'oa.org_office_municipality', 'oa.org_office_province',
                'oa.org_office_region', 'oa.latitude', 'oa.longitude',
            ])
            ->get()
            ->map(fn ($row) => [
                'id'       => $config['level'] . '-' . $row->org_office_id,
                'db_id'    => $row->org_office_id,
                'setup_id' => $row->org_office_address_setup_id,
                'level'    => $config['level'],
                'name'     => $row->name,
                'address'  => $this->buildMapAddress($row),
                'lat'      => (float) $row->latitude,
                'lon'      => (float) $row->longitude,
            ]);
 
        $coveredIds = $fromSetup->pluck('db_id')->map(fn ($id) => (string) $id)->toArray();
 
        // Source 2: coordinates stored directly on the office table (geocoded)
        $fromDirect = DB::table($config['table'])
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->whereIn(DB::raw('CAST(id AS CHAR)'), $ids)
            ->when(! empty($coveredIds), fn ($q) => $q->whereNotIn(DB::raw('CAST(id AS CHAR)'), $coveredIds))
            ->select(['id', 'name', 'address', 'latitude', 'longitude'])
            ->get()
            ->map(fn ($row) => [
                'id'       => $config['level'] . '-' . $row->id,
                'db_id'    => $row->id,
                'setup_id' => null,
                'level'    => $config['level'],
                'name'     => $row->name,
                'address'  => $row->address ?? '',
                'lat'      => (float) $row->latitude,
                'lon'      => (float) $row->longitude,
            ]);
 
        $offices = $offices->concat($fromSetup)->concat($fromDirect);
    }
 
    // ── Step 3: field_branch — always shown, no org_field_setup filter ────────
    // field_branch is the primary source of branch pins and shows independently
    // of whether org_field_setup has any data.
    $fieldBranches = DB::table('field_branch')
        ->where('active_yn', true)
        ->whereNotNull('latitude')
        ->whereNotNull('longitude')
        ->select(['field_branch_id', 'field_branch_name', 'description', 'latitude', 'longitude'])
        ->get()
        ->map(fn ($row) => [
            'id'       => 'field_branch-' . $row->field_branch_id,
            'db_id'    => $row->field_branch_id,
            'setup_id' => null,
            'level'    => 'branch',
            'name'     => $row->field_branch_name,
            'address'  => $row->description ?? '',
            'lat'      => (float) $row->latitude,
            'lon'      => (float) $row->longitude,
        ]);
 
    $offices = $offices->concat($fieldBranches);
 
    return response()->json($offices->values()); 
}
private function buildMapAddress(object $row): string
{
    $parts = array_filter([
        $row->org_office_address_1    ?? null,
        $row->org_office_address_2    ?? null,
        $row->org_office_barangay     ?? null,
        $row->org_office_city         ?? $row->org_office_municipality ?? null,
        $row->org_office_province     ?? null,
        $row->org_office_region       ?? null,
    ]);

    return implode(', ', $parts);
}
public function movePin(Request $request, string $level, string $id): JsonResponse
{
    $data = $request->validate([
        'latitude'  => 'required|numeric|between:-90,90',
        'longitude' => 'required|numeric|between:-180,180',
    ]);
 
    // field_branch records have non-numeric IDs (char(10) like 'FB001').
    // Standard hierarchy records (branch, area, district, division) have numeric IDs.
    $isFieldBranch = $level === 'branch' && ! is_numeric($id);
 
    if ($isFieldBranch) {
        $updated = DB::table('field_branch')
            ->where('field_branch_id', $id)
            ->where('active_yn', true)
            ->update([
                'latitude'       => $data['latitude'],
                'longitude'      => $data['longitude'],
                'record_updated' => now(),
            ]);
 
        if (! $updated) {
            return response()->json(['error' => 'Field branch record not found or inactive'], 404);
        }
 
        $row = DB::table('field_branch')->where('field_branch_id', $id)->first();
 
        return response()->json([
            'id'      => 'field_branch-' . $id,
            'db_id'   => $id,
            'level'   => 'branch',
            'name'    => $row?->field_branch_name,
            'address' => $row?->description ?? '',
            'lat'     => (float) $data['latitude'],
            'lon'     => (float) $data['longitude'],
        ]);
    }
 
    // Standard hierarchy level — map to the correct table
    $levelTableMap = [
        'division' => 'divisions',
        'district' => 'districts',
        'area'     => 'areas',
        'branch'   => 'branches',
    ];
 
    if (! array_key_exists($level, $levelTableMap)) {
        return response()->json(['error' => 'Invalid level: ' . $level], 422);
    }
 
    $table = $levelTableMap[$level];
 
    // Update coordinates directly on the office table (for geocoded records)
    DB::table($table)
        ->where('id', $id)
        ->update([
            'latitude'  => $data['latitude'],
            'longitude' => $data['longitude'],
        ]);
 
    // Also update org_office_address_setups if an active record exists for this office
    DB::table('org_office_address_setup')
        ->where('org_office_segment', strtoupper($level))
        ->where('org_office_id', (string) $id)
        ->where('active_yn', true)
        ->update([
            'latitude'       => $data['latitude'],
            'longitude'      => $data['longitude'],
            'address_source' => 'MANUAL_PIN',
            'record_updated' => now(),
        ]);
 
    $row = DB::table($table)->where('id', $id)->first(['id', 'name', 'address']);
 
    return response()->json([
        'id'      => $level . '-' . $id,
        'db_id'   => $id,
        'level'   => $level,
        'name'    => $row?->name,
        'address' => $row?->address ?? '',
        'lat'     => (float) $data['latitude'],
        'lon'     => (float) $data['longitude'],
    ]);
}
}
