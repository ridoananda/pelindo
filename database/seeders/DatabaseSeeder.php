<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ShipSeeder::class,
            LogisticSeeder::class,
            CargoActivitySeeder::class,
            RiskSeeder::class,
            RiskReportSeeder::class,
            ProductionSeeder::class,
        ]);
    }
}
