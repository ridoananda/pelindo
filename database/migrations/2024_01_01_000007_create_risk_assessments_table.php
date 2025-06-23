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
        Schema::create('risk_assessments', function (Blueprint $table) {
            $table->id();
            $table->string('respondent_name');
            $table->enum('respondent_job', ['Manajer Bistek Operasional', 'Petugas Lapangan Operasional']);
            $table->string('risk_code');
            $table->string('risk_description');
            $table->integer('severity'); // 1-10
            $table->integer('occurrence'); // 1-10
            $table->integer('detection'); // 1-10
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('risk_assessments');
    }
};
