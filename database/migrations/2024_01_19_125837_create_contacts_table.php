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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('email', 50);
            $table->string('telephone_number', 8);
            $table->string('facebook', 100)->nullable();
            $table->string('linkedin', 100)->nullable();
            $table->string('adress', 40)->default('Jotvingių g. 10-1, 7kab.');
            $table->string('city', 20)->default('Alytus');
            $table->string('map', 50)->default('map.png');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
