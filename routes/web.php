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
    Route::put('update-about', [FirstPageController::class, 'updateAbout'])->name('update-about');
    Route::put('update-education/{eduId?}', [FirstPageController::class, 'updateEducation'])->name('update-education');
    Route::put('update-work/{workId?}', [FirstPageController::class, 'updatework'])->name('update-work');
    Route::post('store-education', [FirstPageController::class, 'storeEducation'])->name('store-education');
    Route::post('store-work', [FirstPageController::class, 'storeWork'])->name('store-work');
    Route::delete('delete-education/{id?}', [FirstPageController::class, 'deleteEducation'])->name('delete-education');
    Route::delete('delete-work/{id?}', [FirstPageController::class, 'deleteWork'])->name('delete-work');

});
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
