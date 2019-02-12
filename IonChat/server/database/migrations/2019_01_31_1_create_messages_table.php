<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('messages', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('type',10)->nullable($value = true);
          $table->string('content',255)->nullable($value = true);
          $table->unsignedInteger('idUser')->nullable($value = true);
          $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
          $table->unsignedInteger('idFriend')->nullable($value = true);;
          $table->foreign('idFriend')->references('id')->on('users')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('messages');
    }
}