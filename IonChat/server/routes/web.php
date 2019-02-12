<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
   return  date("Y") . "/" . date("m") . "/" . date("d") ;
   ;
});

$router->group(['middleware' => []], function () use ($router) {
   $router->post('/login', ['uses' => 'AuthController@login']);
   $router->post('/register', ['uses' => 'AuthController@register']);
   $router->post('/password_recovery_request', ['uses' => 'AuthController@passwordRecoveryRequest']);
   $router->get('/password_recovery', ['uses' => 'AuthController@passwordRecovery']);
});

$router->group(['middleware' => ['auth']], function () use ($router) {
   $router->post('/user/password_change', ['uses' => 'AuthController@passwordChange']);

   //CRUD User
   $router->post('/user', ['uses' => 'UserController@post']);
   $router->get('/user', ['uses' => 'UserController@get']);
   $router->get('/user/paginate', ['uses' => 'UserController@paginate']);
   $router->put('/user', ['uses' => 'UserController@put']);
   $router->delete('/user', ['uses' => 'UserController@delete']);

   //CRUD Publication
   $router->post('/publication', ['uses' => 'PublicationController@post']);
   $router->get('/publication', ['uses' => 'PublicationController@get']);
   $router->get('/publication/paginate', ['uses' => 'PublicationController@paginate']);
   $router->put('/publication', ['uses' => 'PublicationController@put']);
   $router->delete('/publication', ['uses' => 'PublicationController@delete']);

   //CRUD Commentary
   $router->post('/commentary', ['uses' => 'CommentaryController@post']);
   $router->get('/commentary', ['uses' => 'CommentaryController@get']);
   $router->get('/commentary/paginate', ['uses' => 'CommentaryController@paginate']);
   $router->put('/commentary', ['uses' => 'CommentaryController@put']);
   $router->delete('/commentary', ['uses' => 'CommentaryController@delete']);

   //CRUD Interest
   $router->post('/interest', ['uses' => 'InterestController@post']);
   $router->get('/interest', ['uses' => 'InterestController@get']);
   $router->get('/interest/paginate', ['uses' => 'InterestController@paginate']);
   $router->put('/interest', ['uses' => 'InterestController@put']);
   $router->delete('/interest', ['uses' => 'InterestController@delete']);

   //CRUD Group
   $router->post('/group', ['uses' => 'GroupController@post']);
   $router->get('/group', ['uses' => 'GroupController@get']);
   $router->get('/group/paginate', ['uses' => 'GroupController@paginate']);
   $router->put('/group', ['uses' => 'GroupController@put']);
   $router->delete('/group', ['uses' => 'GroupController@delete']);

   //CRUD Album
   $router->post('/album', ['uses' => 'AlbumController@post']);
   $router->get('/album', ['uses' => 'AlbumController@get']);
   $router->get('/album/paginate', ['uses' => 'AlbumController@paginate']);
   $router->put('/album', ['uses' => 'AlbumController@put']);
   $router->delete('/album', ['uses' => 'AlbumController@delete']);

   //CRUD Image
   $router->post('/image', ['uses' => 'ImageController@post']);
   $router->get('/image/publicate', ['uses' => 'ImageController@getPublicate']);
   $router->get('/image/portada', ['uses' => 'ImageController@getPortada']);
   $router->get('/image', ['uses' => 'ImageController@get']);
   $router->get('/image/paginate', ['uses' => 'ImageController@paginate']);
   $router->put('/image', ['uses' => 'ImageController@put']);
   $router->delete('/image', ['uses' => 'ImageController@delete']);

   //CRUD State
   $router->post('/state', ['uses' => 'StateController@post']);
   $router->get('/state', ['uses' => 'StateController@get']);
   $router->get('/state/paginate', ['uses' => 'StateController@paginate']);
   $router->put('/state', ['uses' => 'StateController@put']);
   $router->delete('/state', ['uses' => 'StateController@delete']);

   //CRUD Friend
   $router->post('/friend', ['uses' => 'FriendController@post']);
   $router->get('/friend', ['uses' => 'FriendController@get']);
   $router->get('/friend/paginate', ['uses' => 'FriendController@paginate']);
   $router->put('/friend', ['uses' => 'FriendController@put']);
   $router->delete('/friend', ['uses' => 'FriendController@delete']);

   //CRUD TypePublication
   $router->post('/typepublication', ['uses' => 'TypePublicationController@post']);
   $router->get('/typepublication', ['uses' => 'TypePublicationController@get']);
   $router->get('/typepublication/paginate', ['uses' => 'TypePublicationController@paginate']);
   $router->put('/typepublication', ['uses' => 'TypePublicationController@put']);
   $router->delete('/typepublication', ['uses' => 'TypePublicationController@delete']);

   //CRUD Message
   $router->post('/message', ['uses' => 'MessageController@post']);
   $router->get('/message', ['uses' => 'MessageController@get']);
   $router->get('/message/paginate', ['uses' => 'MessageController@paginate']);
   $router->put('/message', ['uses' => 'MessageController@put']);
   $router->delete('/message', ['uses' => 'MessageController@delete']);
});
