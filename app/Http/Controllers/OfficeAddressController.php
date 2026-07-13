<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OfficeAddressController extends Controller
{
    public function mapData(): JsonResponse
    {
        $offices = collect();

        // ── field_division ──────────────────────────────────────────────
        $offices = $offices->concat(
            DB::table('field_division')
                ->where('active_yn', true)
                ->whereNotNull('latitude')
                ->whereNotNull('longitude')
                ->select(['field_division_id', 'field_division_name', 'field_division_code', 'address', 'description', 'latitude', 'longitude'])
                ->get()
                ->map(fn ($row) => [
                    'id'       => 'field_division-' . $row->field_division_id,
                    'db_id'    => $row->field_division_id,
                    'setup_id' => null,
                    'level'    => 'division',
                    'name'     => $row->field_division_name,
                    'code'     => $row->field_division_code,
                    'parent_id'=> null,
                    'address'  => $row->address ?? $row->description ?? '',
                    'lat'      => (float) $row->latitude,
                    'lon'      => (float) $row->longitude,
                ])
        );

        // ── field_district ──────────────────────────────────────────────
        $offices = $offices->concat(
            DB::table('field_district')
                ->where('active_yn', true)
                ->whereNotNull('latitude')
                ->whereNotNull('longitude')
                ->select(['field_district_id', 'field_district_name', 'field_district_code', 'field_division_id', 'address', 'description', 'latitude', 'longitude'])
                ->get()
                ->map(fn ($row) => [
                    'id'       => 'field_district-' . $row->field_district_id,
                    'db_id'    => $row->field_district_id,
                    'setup_id' => null,
                    'level'    => 'district',
                    'name'     => $row->field_district_name,
                    'code'     => $row->field_district_code,
                    'parent_id'=> $row->field_division_id,
                    'address'  => $row->address ?? $row->description ?? '',
                    'lat'      => (float) $row->latitude,
                    'lon'      => (float) $row->longitude,
                ])
        );

        // ── field_area ───────────────────────────────────────────────────
        $offices = $offices->concat(
            DB::table('field_area')
                ->where('active_yn', true)
                ->whereNotNull('latitude')
                ->whereNotNull('longitude')
                ->select(['field_area_id', 'field_area_name', 'field_area_code', 'field_district_id', 'address', 'description', 'latitude', 'longitude'])
                ->get()
                ->map(fn ($row) => [
                    'id'       => 'field_area-' . $row->field_area_id,
                    'db_id'    => $row->field_area_id,
                    'setup_id' => null,
                    'level'    => 'area',
                    'name'     => $row->field_area_name,
                    'code'     => $row->field_area_code,
                    'parent_id'=> $row->field_district_id,
                    'address'  => $row->address ?? $row->description ?? '',
                    'lat'      => (float) $row->latitude,
                    'lon'      => (float) $row->longitude,
                ])
        );

        // ── field_branch ─────────────────────────────────────────────────
        $offices = $offices->concat(
            DB::table('field_branch')
                ->where('active_yn', true)
                ->whereNotNull('latitude')
                ->whereNotNull('longitude')
                ->select(['field_branch_id', 'field_branch_name', 'field_branch_code', 'field_area_id', 'address', 'description', 'latitude', 'longitude'])
                ->get()
                ->map(fn ($row) => [
                    'id'       => 'field_branch-' . $row->field_branch_id,
                    'db_id'    => $row->field_branch_id,
                    'setup_id' => null,
                    'level'    => 'branch',
                    'name'     => $row->field_branch_name,
                    'code'     => $row->field_branch_code,
                    'parent_id'=> $row->field_area_id,
                    'address'  => $row->address ?? $row->description ?? '',
                    'lat'      => (float) $row->latitude,
                    'lon'      => (float) $row->longitude,
                ])
        );

        return response()->json($offices->values());
    }

    public function store(Request $request, string $level): JsonResponse
    {
        $levelConfig = [
            'division' => ['table' => 'field_division', 'pk' => 'field_division_id', 'name_col' => 'field_division_name', 'code_col' => 'field_division_code', 'parent_col' => null,                  'label' => 'Division'],
            'district' => ['table' => 'field_district', 'pk' => 'field_district_id', 'name_col' => 'field_district_name', 'code_col' => 'field_district_code', 'parent_col' => 'field_division_id', 'label' => 'District'],
            'area'     => ['table' => 'field_area',     'pk' => 'field_area_id',     'name_col' => 'field_area_name',     'code_col' => 'field_area_code',     'parent_col' => 'field_district_id', 'label' => 'Area'],
            'branch'   => ['table' => 'field_branch',   'pk' => 'field_branch_id',   'name_col' => 'field_branch_name',   'code_col' => 'field_branch_code',   'parent_col' => 'field_area_id',     'label' => 'Branch'],
        ];

        if (! array_key_exists($level, $levelConfig)) {
            return response()->json(['error' => 'Invalid level: ' . $level], 422);
        }

        ['table' => $table, 'pk' => $pk, 'name_col' => $nameCol, 'code_col' => $codeCol, 'parent_col' => $parentCol, 'label' => $label] = $levelConfig[$level];

        $rules = [
            'name'      => 'required|string|max:50',
            'address'   => 'nullable|string|max:255',
            'latitude'  => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ];
        if ($parentCol) {
            $rules['parent_id'] = 'required|string';
        }
        $data = $request->validate($rules);

        // Verify the parent actually exists and is active, when applicable
        if ($parentCol) {
            // parent_col maps 1:1 to a known table's primary key
            $parentTableMap = [
                'field_division_id' => 'field_division',
                'field_district_id' => 'field_district',
                'field_area_id'     => 'field_area',
            ];
            $parentTableName = $parentTableMap[$parentCol];
            $parentExists = DB::table($parentTableName)
                ->where($parentCol, $data['parent_id'])
                ->where('active_yn', true)
                ->exists();

            if (! $parentExists) {
                return response()->json(['error' => 'Selected parent office was not found or is inactive'], 422);
            }
        }

        // Generate next numeric ID (stored as plain string, matching existing rows e.g. "34")
        $maxId = DB::table($table)->max(DB::raw("CAST($pk AS UNSIGNED)"));
        $newId = (string) (($maxId ?? 0) + 1);

        $code = $label . ' ' . $newId;

        $insert = [
            $pk       => $newId,
            $nameCol  => $data['name'],
            $codeCol  => $code,
            'address' => $data['address'] ?? null,
            'latitude'  => $data['latitude'],
            'longitude' => $data['longitude'],
            'active_yn' => true,
        ];
        if ($parentCol) {
            $insert[$parentCol] = $data['parent_id'];
        }

        DB::table($table)->insert($insert);

        return response()->json([
            'id'        => 'field_' . $level . '-' . $newId,
            'db_id'     => $newId,
            'setup_id'  => null,
            'level'     => $level,
            'name'      => $data['name'],
            'code'      => $code,
            'parent_id' => $parentCol ? $data['parent_id'] : null,
            'address'   => $data['address'] ?? '',
            'lat'       => (float) $data['latitude'],
            'lon'       => (float) $data['longitude'],
        ], 201);
    }

    public function movePin(Request $request, string $level, string $id): JsonResponse
    {
        $data = $request->validate([
            'latitude'  => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        $levelConfig = [
            'division' => ['table' => 'field_division', 'pk' => 'field_division_id', 'name_col' => 'field_division_name', 'code_col' => 'field_division_code'],
            'district' => ['table' => 'field_district', 'pk' => 'field_district_id', 'name_col' => 'field_district_name', 'code_col' => 'field_district_code'],
            'area'     => ['table' => 'field_area',     'pk' => 'field_area_id',     'name_col' => 'field_area_name',     'code_col' => 'field_area_code'],
            'branch'   => ['table' => 'field_branch',   'pk' => 'field_branch_id',   'name_col' => 'field_branch_name',   'code_col' => 'field_branch_code'],
        ];

        if (! array_key_exists($level, $levelConfig)) {
            return response()->json(['error' => 'Invalid level: ' . $level], 422);
        }

        ['table' => $table, 'pk' => $pk, 'name_col' => $nameCol, 'code_col' => $codeCol] = $levelConfig[$level];

        $updated = DB::table($table)
            ->where($pk, $id)
            ->where('active_yn', true)
            ->update([
                'latitude'       => $data['latitude'],
                'longitude'      => $data['longitude'],
                'record_updated' => now(),
            ]);

        if (! $updated) {
            return response()->json(['error' => ucfirst($level) . ' record not found or inactive'], 404);
        }

        $row = DB::table($table)->where($pk, $id)->first();

        return response()->json([
            'id'      => 'field_' . $level . '-' . $id,
            'db_id'   => $id,
            'level'   => $level,
            'name'    => $row?->{$nameCol},
            'code'    => $row?->{$codeCol},
            'address' => $row?->address ?? $row?->description ?? '',
            'lat'     => (float) $data['latitude'],
            'lon'     => (float) $data['longitude'],
        ]);
    }
}