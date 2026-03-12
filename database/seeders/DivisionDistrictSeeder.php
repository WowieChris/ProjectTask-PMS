<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DivisionDistrictSeeder extends Seeder
{
    public function run()
    {

        $divisions = [

            'Division 1' => [1, 2, 3],
            'Division 2' => [5, 4, 6, 18, 24],
            'Division 3' => [9, 10, 26, 27],
            'Division 4' => [11, 12, 22, 25, 28],
            'Division 5' => [13, 14, 20, 29],
            'Division 6' => [15, 16, 21, 30, 19],
            'Division 7' => [17, 23, 31],
            'Division 8' => [7, 8, 32],

        ];

        foreach ($divisions as $divisionName => $districts) {

            $divisionId = DB::table('divisions')->insertGetId([
                'name' => $divisionName,
            ]);

            foreach ($districts as $district) {

                DB::table('districts')->insert([
                    'division_id' => $divisionId,
                    'name' => 'District '.$district,
                ]);

            }

        }

    }
}
