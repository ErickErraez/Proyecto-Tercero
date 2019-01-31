<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commentary extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'content','date',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Publication()
    {
       return $this->belongsTo('App\Publication');
    }

}