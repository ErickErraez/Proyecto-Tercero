<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInterestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('interests', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('type',100)->nullable($value = true);
          $table->string('content',255)->nullable($value = true);
          $table->unsignedInteger('idUser');
          $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('interests');
    }
}