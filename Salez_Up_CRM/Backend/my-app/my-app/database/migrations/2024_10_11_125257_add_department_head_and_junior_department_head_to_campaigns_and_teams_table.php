<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDepartmentHeadAndJuniorDepartmentHeadToCampaignsAndTeamsTable extends Migration
{
    public function up()
    {
        Schema::table('campaigns_and_teams', function (Blueprint $table) {
            // Adding new columns
            $table->foreignId('department_head_id')
                ->nullable() // Make it nullable if it's not mandatory
                ->constrained('department_heads') // Assuming the table name is department_heads
                ->onDelete('cascade'); // Deletes related campaigns_and_teams when a department head is deleted

            $table->foreignId('junior_department_head_id')
                ->nullable() // Make it nullable if it's not mandatory
                ->constrained('junior_department_heads') // Assuming the table name is junior_department_heads
                ->onDelete('cascade'); // Deletes related campaigns_and_teams when a junior department head is deleted
        });
    }

    public function down()
    {
        Schema::table('campaigns_and_teams', function (Blueprint $table) {
            // Dropping the columns
            $table->dropForeign(['department_head_id']); // Drop foreign key constraint
            $table->dropColumn('department_head_id'); // Drop the column

            $table->dropForeign(['junior_department_head_id']); // Drop foreign key constraint
            $table->dropColumn('junior_department_head_id'); // Drop the column
        });
    }
}
