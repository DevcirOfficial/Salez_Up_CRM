<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddManagerRoleToManagerDetailsTable extends Migration
{
    public function up()
    {
        Schema::table('manager_details', function (Blueprint $table) {
            $table->string('manager_role')->nullable(); // Add the manager_role column
        });
    }

    public function down()
    {
        Schema::table('manager_details', function (Blueprint $table) {
            $table->dropColumn('manager_role');
        });
    }
}
