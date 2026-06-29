<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgOfficeAddressSetup extends Model
{
    protected $table = 'org_office_address_setup';

    protected $primaryKey =
        'org_office_address_setup_id';

    public $incrementing = false;

    protected $keyType = 'string';

    public const CREATED_AT = 'record_created';
    public const UPDATED_AT = 'record_updated';

    protected $fillable = [
        'org_office_address_setup_id',
        'org_office_segment',
        'org_office_code',
        'org_office_id',

        'org_office_address_1',
        'org_office_address_2',

        'org_office_region',
        'org_office_province',
        'org_office_municipality',
        'org_office_city',
        'org_office_barangay',
        'org_office_postal_code',

        'region_psgc_code',
        'province_psgc_code',
        'city_municipality_psgc_code',
        'barangay_psgc_code',

        'latitude',
        'longitude',
        'google_place_id',
        'address_source',

        'effective_date',
        'effective_to',
        'active_yn',
    ];

    protected $casts = [
        'effective_date' => 'date',
        'effective_to' => 'date',
        'active_yn' => 'boolean',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];

    public function region()
    {
        return $this->belongsTo(
            GeoRegion::class,
            'region_psgc_code',
            'psgc_code'
        );
    }

    public function province()
    {
        return $this->belongsTo(
            GeoProvince::class,
            'province_psgc_code',
            'psgc_code'
        );
    }

    public function cityMunicipality()
    {
        return $this->belongsTo(
            GeoCityMunicipality::class,
            'city_municipality_psgc_code',
            'psgc_code'
        );
    }

    public function barangay()
    {
        return $this->belongsTo(
            GeoBarangay::class,
            'barangay_psgc_code',
            'psgc_code'
        );
    }
}
