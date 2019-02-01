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
       'name','lastName','birthday','gender','email','password','api_token',
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

    function Albums()
    {
       return $this->hasMany('App\Album');
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