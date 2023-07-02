<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FirstPageController;
use App\Http\Controllers\FrontController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [FrontController::class, 'firstPage'])->name('first-page');

Auth::routes(['register' => false]);

Route::prefix('admin')->name('back-')->middleware('auth')->group(function(){
    Route::get('first-pg', [FirstPageController::class, 'index'])->name('first-pg');
    Route::post('update-about', [FirstPageController::class, 'updateAbout'])->name('update-about');
    Route::post('update-education', [FirstPageController::class, 'updateEducation'])->name('update-education');
    Route::post('update-work', [FirstPageController::class, 'updatework'])->name('update-work');




});
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
