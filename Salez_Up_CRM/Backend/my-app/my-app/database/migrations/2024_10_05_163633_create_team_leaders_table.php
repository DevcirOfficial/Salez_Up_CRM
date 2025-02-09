<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamLeadersTable extends Migration
{
    public function up()
    {
        Schema::create('team_leaders', function (Blueprint $table) {
            $table->id(); // Primary key (auto-incrementing ID)
            $table->string('first_name');
            $table->string('last_name');
            $table->date('start_date');
            $table->string('email')->unique();
            $table->unsignedBigInteger('manager_id'); // Foreign key to manager table
            $table->timestamps();

            // Set up foreign key constraint
            $table->foreign('manager_id')->references('id')->on('managers')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('team_leaders');
    }
}
