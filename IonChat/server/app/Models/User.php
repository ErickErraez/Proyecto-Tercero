<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'name','lastName','birthdate','gender','email','password','api_token',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Publications()
    {
       return $this->hasMany('App\Publication');
    }

    function Interests()
    {
       return $this->hasMany('App\Interest');
    }

    function Image()
    {
       return $this->belongsTo('App\Image');
    }

    function Friends()
    {
       return $this->hasMany('App\Friend');
    }

    function Messages()
    {
       return $this->hasMany('App\Message');
    }

}