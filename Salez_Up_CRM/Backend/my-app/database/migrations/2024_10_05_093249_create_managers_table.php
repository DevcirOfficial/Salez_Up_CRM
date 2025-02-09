<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateManagersTable extends Migration
{
    public function up()
    {
        Schema::create('managers', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->string('manager_name'); 
            $table->integer('commission'); 
            $table->string('email')->unique(); 
            $table->string('password');
            $table->integer('manager_secret_id'); 
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('managers');
    }
}
