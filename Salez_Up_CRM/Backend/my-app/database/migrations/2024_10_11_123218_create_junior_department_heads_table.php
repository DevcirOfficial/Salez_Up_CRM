<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJuniorDepartmentHeadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
 
     public function up()
{
    Schema::create('junior_department_heads', function (Blueprint $table) {
        $table->id();
        $table->string('first_name');
        $table->string('last_name');
        $table->date('start_date');
        $table->string('image_path');
        $table->foreignId('manager_id')->constrained('managers'); // Assuming there's a managers table
        $table->integer('commission')->nullable(); // Default to null
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('junior_department_heads');
}


  
}
