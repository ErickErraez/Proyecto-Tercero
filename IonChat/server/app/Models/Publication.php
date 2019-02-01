<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'content','date','idUser',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function User()
    {
       return $this->belongsTo('App\User');
    }

    function Commentarys()
    {
       return $this->hasMany('App\Commentary');
    }

    function TypePublications()
    {
       return $this->hasMany('App\TypePublication');
    }

}