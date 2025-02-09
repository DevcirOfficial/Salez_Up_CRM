<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateManagerDetailsTable extends Migration
{
    public function up()
    {
        Schema::create('manager_details', function (Blueprint $table) {
            $table->id();
            $table->string('manager_name');
            $table->string('manager_image_path');
            $table->decimal('manager_commision', 8, 2)->nullable();
            $table->string('manager_email')->unique();
            $table->string('manager_password');
            $table->integer('manager_secret_id');
            $table->unsignedBigInteger('senior_ops_manager_id')->nullable();
            $table->unsignedBigInteger('head_of_sales_id')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('manager_details');
    }
}
