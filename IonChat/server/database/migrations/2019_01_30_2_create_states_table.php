<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('states', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->text('description')->nullable($value = true);
          $table->unsignedInteger('idFriend');
          $table->foreign('idFriend')->references('id')->on('friends')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('states');
    }
}