<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTypePublicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('typepublications', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->text('description')->nullable($value = true);
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
       Schema::dropIfExists('typepublications');
    }
}