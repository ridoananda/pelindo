<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cargo_activities', function (Blueprint $table) {
            $table->id();
            $table->string('ship_name');
            $table->string('type'); // Bongkar, Muat
            $table->string('cargo_type'); // Kontainer, Curah Kering, etc.
            $table->string('quantity');
            $table->string('unit')->default('Ton'); // Ton, TEUs, Unit, etc.
            $table->string('operator');
            $table->time('time');
            $table->enum('status', ['Dalam Proses', 'Selesai', 'Tertunda', 'Dibatalkan'])->default('Dalam Proses');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargo_activities');
    }
};
