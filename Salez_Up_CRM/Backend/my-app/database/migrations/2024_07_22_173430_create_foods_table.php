<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFoodsTable extends Migration
{
    public function up()
    {
        Schema::create('foods', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('food_image');
            $table->string('status')->default('on');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('foods');
    }
}
