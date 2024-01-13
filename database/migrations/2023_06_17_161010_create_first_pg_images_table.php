<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\FirstPage;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('first_pg_images', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(FirstPage::class)->default(1);
            $table->boolean('is_right');
            $table->unsignedTinyInteger('priority')->nullable();
            $table->decimal('object_y_pos_percent', 5, 2)->default(0);
            $table->string('picture_path', 150);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('first_pg_images');
    }
};
