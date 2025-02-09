<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class CreateKpiInfoTable extends Migration
{
    public function up()
    {
        Schema::create('kpi_info', function (Blueprint $table) {
            $table->id();
            $table->string('kpi_name');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('kpi_info');
    }
}

