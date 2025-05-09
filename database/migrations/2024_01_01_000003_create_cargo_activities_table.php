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
            $table->string('type');
            $table->string('quantity');
            $table->string('operator');
            $table->time('time');
            $table->enum('status', ['Selesai', 'Dalam proses', 'Tertunda atau bermasalah']);
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
