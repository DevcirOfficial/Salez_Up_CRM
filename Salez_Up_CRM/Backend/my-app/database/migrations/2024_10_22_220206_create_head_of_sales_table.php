<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHeadOfSalesTable extends Migration
{
    public function up()
    {
        Schema::create('head_of_sales', function (Blueprint $table) {
            $table->id();
            $table->string('head_of_sales_name');
            $table->integer('commission')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->integer('head_of_sales_secret_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('head_of_sales');
    }
}
