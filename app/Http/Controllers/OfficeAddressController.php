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
                ->select(['field_division_id', 'field_division_name', 'address', 'description', 'latitude', 'longitude'])
                ->get()
                ->map(fn ($row) => [
                    'id'       => 'field_division-' . $row->field_division_id,
                    'db_id'    => $row->field_division_id,
                    'setup_id' => null,
                    'level'    => 'division',
                    'name'     => $row->field_division_name,
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
                ->select(['field_district_id', 'field_district_name', 'address', 'description', 'latitude', 'longitude'])
                ->get()
                ->map(fn ($row) => [
                    'id'       => 'field_district-' . $row->field_district_id,
                    'db_id'    => $row->field_district_id,
                    'setup_id' => null,
                    'level'    => 'district',
                    'name'     => $row->field_district_name,
                    'address'  => $row->address ?? $row->description ?? '',
                    'lat'      => (float) $row->latitude,
                    'lon'      => (float) $row->longitude,
                ])
        );

        // ── field_area ───────────────────────────────────────────────────
        // NOTE: assumes field_area_id / field_area_name / field_area_code,
        // matching the pattern used by field_district and field_division.
        // Run `DESCRIBE field_area;` to confirm before deploying.
        $offices = $offices->concat(
            DB::table('field_area')
                ->where('active_yn', true)
                ->whereNotNull('latitude')
                ->whereNotNull('longitude')
                ->select(['field_area_id', 'field_area_name', 'description', 'latitude', 'longitude'])
                ->get()
                ->map(fn ($row) => [
                    'id'       => 'field_area-' . $row->field_area_id,
                    'db_id'    => $row->field_area_id,
                    'setup_id' => null,
                    'level'    => 'area',
                    'name'     => $row->field_area_name,
                    'address'  => $row->description ?? '',
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
                ])
        );

        return response()->json($offices->values());
    }

    public function movePin(Request $request, string $level, string $id): JsonResponse
    {
        $data = $request->validate([
            'latitude'  => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        $levelConfig = [
            'division' => ['table' => 'field_division', 'pk' => 'field_division_id', 'name_col' => 'field_division_name'],
            'district' => ['table' => 'field_district', 'pk' => 'field_district_id', 'name_col' => 'field_district_name'],
            'area'     => ['table' => 'field_area',     'pk' => 'field_area_id',     'name_col' => 'field_area_name'],
            'branch'   => ['table' => 'field_branch',   'pk' => 'field_branch_id',   'name_col' => 'field_branch_name'],
        ];

        if (! array_key_exists($level, $levelConfig)) {
            return response()->json(['error' => 'Invalid level: ' . $level], 422);
        }

        ['table' => $table, 'pk' => $pk, 'name_col' => $nameCol] = $levelConfig[$level];

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
            'address' => $row?->address ?? $row?->description ?? '',
            'lat'     => (float) $data['latitude'],
            'lon'     => (float) $data['longitude'],
        ]);
    }
}