<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FirstPageController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticleTagController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\ServiceController;

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
Route::get('/straipsniai', [FrontController::class, 'articlesList'])->name('articles-list');
Route::get('/straipsnis/{article}', [FrontController::class, 'articlePage'])->name('article-page');
Route::get('/psichologes-paslaugos', [FrontController::class, 'services'])->name('services');
Route::get('/kontaktai', [FrontController::class, 'contacts'])->name('contacts');




Auth::routes(['register' => false]);

Route::prefix('admin')->name('back-')->middleware(['auth'])->group(function(){
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
    Route::put('update-work/{id?}', [FirstPageController::class, 'updateWork'])->name('update-work');
    Route::post('store-work', [FirstPageController::class, 'storeWork'])->name('store-work');
    Route::delete('delete-work/{id?}', [FirstPageController::class, 'deleteWork'])->name('delete-work');
    // articles page
    Route::get('/articles', [ArticleController::class, 'articlesList'])->name('articles-list');
    Route::get('/article/{url?}', [ArticleController::class, 'articlePage'])->name('article-page');
    // article
    Route::get('/article-create', [ArticleController::class, 'articleCreate'])->name('article-create');
    Route::post('/article-store', [ArticleController::class, 'articleStore'])->name('article-store');
    Route::get('/article-edit/{article?}', [ArticleController::class, 'articleEdit'])->name('article-edit');
    Route::put('/article-update', [ArticleController::class, 'articleUpdate'])->name('article-update');
    Route::delete('/article-delete/{id?}', [ArticleController::class, 'articledelete'])->name('article-delete');
    // article tag
    Route::put('update-articles-tag/{id?}', [ArticleTagController::class, 'updateArticlesTag'])->name('update-articles-tag');
    Route::post('store-articles-tag', [ArticleTagController::class, 'storeArticlesTag'])->name('store-articles-tag');
    Route::delete('delete-articles-tag/{id?}', [ArticleTagController::class, 'deleteArticlesTag'])->name('delete-articles-tag');
    // services
    Route::get('/services', [ServiceController::class, 'servicesList'])->name('services-list');
    Route::post('store-service', [ServiceController::class, 'storeService'])->name('store-service');
    Route::put('update-service/{id?}', [ServiceController::class, 'updateService'])->name('update-service');
    Route::delete('delete-service/{id?}', [ServiceController::class, 'deleteService'])->name('delete-service');


});
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
