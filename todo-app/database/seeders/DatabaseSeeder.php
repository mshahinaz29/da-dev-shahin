<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $data = [
            ['name' => 'Breakfast'],
            ['name' => 'Lunch'],
            ['name' => 'Dinner'],
            ['name' => 'Midnight Snack']
        ];

        DB::table('todos')->insert($data);
    }
}
