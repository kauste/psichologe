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
        Schema::create('first_pages', function (Blueprint $table) {
            $table->id();
            $table->string('email', 50);
            $table->string('telephone_number', 8);
            $table->string('facebook', 100)->nullable();
            $table->string('linkedin', 100)->nullable();
            $table->string('about_me', 1000);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('first_pages');
    }
};
