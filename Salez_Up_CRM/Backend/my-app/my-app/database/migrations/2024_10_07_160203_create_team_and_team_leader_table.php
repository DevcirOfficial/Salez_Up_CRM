<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamAndTeamLeaderTable extends Migration
{
    public function up()
    {
        Schema::create('team_and_team_leader', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained('teams')->onDelete('cascade');  // Foreign key from teams table
            $table->foreignId('team_leader_id')->constrained('team_leaders')->onDelete('cascade');  // Foreign key from team_leaders table
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('team_and_team_leader');
    }
}
