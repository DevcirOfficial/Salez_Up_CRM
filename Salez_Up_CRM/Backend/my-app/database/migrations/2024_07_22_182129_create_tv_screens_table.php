<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTvScreensTable extends Migration
{
    public function up()
    {
        Schema::create('tv_screens', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('image');
            $table->string('status')->default('on');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tv_screens');
    }
}

