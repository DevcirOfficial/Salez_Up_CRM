<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesAgentsTable extends Migration
{
    public function up()
    {
        Schema::create('sales_agents', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->foreignId('team_id')->constrained('teams')->onDelete('cascade'); // Foreign Key to Teams Table
            $table->string('first_name'); // VARCHAR for First Name
            $table->string('last_name'); // VARCHAR for Last Name
            $table->date('start_date'); // Date for Start Date
            $table->string('email')->unique(); // Email field
            $table->foreignId('manager_id')->constrained('managers')->onDelete('cascade'); // Foreign Key to Managers Table
            $table->timestamps(); // Created at and Updated at fields
        });
    }

    public function down()
    {
        Schema::dropIfExists('sales_agents');
    }
}
