<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FirstPageController;
use App\Http\Controllers\FrontController;
use App\Models\FirstPage;


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
Route::get('/articles', [FrontController::class, 'articlesPage'])->name('articles-page');
Route::get('/article/{article}', [FrontController::class, 'articlePage'])->name('article-page');



Auth::routes(['register' => false]);

Route::prefix('admin')->name('back-')->middleware('auth')->group(function(){
    Route::get('first-pg', [FirstPageController::class, 'index'])->name('first-pg');
    //citations
    Route::put('update-citation/{id?}', [FirstPageController::class, 'updateCitation'])->name('update-citation');
    Route::post('store-citation', [FirstPageController::class, 'storeCitation'])->name('store-citation');
    Route::delete('delete-citation/{id?}', [FirstPageController::class, 'deleteCitation'])->name('delete-citation');
    // work
    //about
    Route::put('update-about', [FirstPageController::class, 'updateAbout'])->name('update-about');
    // education
    Route::put('update-education/{id?}', [FirstPageController::class, 'updateEducation'])->name('update-education');
    Route::post('store-education', [FirstPageController::class, 'storeEducation'])->name('store-education');
    Route::delete('delete-education/{id?}', [FirstPageController::class, 'deleteEducation'])->name('delete-education');
    // work
    Route::put('update-work/{id?}', [FirstPageController::class, 'updatework'])->name('update-work');
    Route::post('store-work', [FirstPageController::class, 'storeWork'])->name('store-work');
    Route::delete('delete-work/{id?}', [FirstPageController::class, 'deleteWork'])->name('delete-work');
});
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
