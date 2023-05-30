<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CardController;
use App\Http\Controllers\AuthController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/login',  [AuthController::class, 'login']);


Route::get('/cards', [CardController::class, 'index']);
Route::post('/cards', [CardController::class, 'store']);
Route::put('/cards/{id}', [CardController::class, 'update']);
Route::delete('/cards/{id}', [CardController::class, 'destroy']);



Route::middleware('auth.jwt')->group(function () {
    // Route::get('/cards', 'CardController@index');
    // Route::post('/cards', 'CardController@store');
    // Route::put('/cards/{id}', 'CardController@update');
    // Route::delete('/cards/{id}', 'CardController@destroy');
});