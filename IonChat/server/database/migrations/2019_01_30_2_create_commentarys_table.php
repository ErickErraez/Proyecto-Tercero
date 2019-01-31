<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentarysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('commentarys', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('content',255)->nullable($value = true);
          $table->dateTime('date')->nullable($value = true);
          $table->unsignedInteger('idPublication');
          $table->foreign('idPublication')->references('id')->on('publications')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('commentarys');
    }
}