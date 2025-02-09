<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeniorOpsManagersTable extends Migration
{
    public function up()
    {
        Schema::create('senior_ops_managers', function (Blueprint $table) {
            $table->id();
            $table->string('ops_manager_name');
            $table->integer('commission')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->integer('ops_manager_secret_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('senior_ops_managers');
    }
}

