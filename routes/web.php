<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Front\FrontController;
use App\Http\Controllers\Front\RegistrationController;
use App\Http\Controllers\Front\GoogleCalendarController;

use App\Http\Controllers\FirstPageController;
use App\Http\Controllers\CitationController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticleTagController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ContactController;
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
Route::get('/registracija/', [RegistrationController::class, 'registration'])->name('registration');
Route::post('/registruoti', [RegistrationController::class, 'storeRegistration'])->name('registration-store');
Route::get('/uzregistruota', [RegistrationController::class, 'registered'])->name('registered');


Route::prefix('admin')->name('back-')->middleware(['auth'])->group(function(){
    Route::get('first-pg', [FirstPageController::class, 'index'])->name('first-pg');
    //citations
    Route::put('update-citation/{id?}', [CitationController::class, 'update'])->name('update-citation');
    Route::post('store-citation', [CitationController::class, 'store'])->name('store-citation');
    Route::delete('delete-citation/{id?}', [CitationController::class, 'delete'])->name('delete-citation');
    //about
    Route::put('update-about/{id?}', [FirstPageController::class, 'updateAbout'])->name('update-about');
    // education
    Route::put('update-education/{id?}', [EducationController::class, 'update'])->name('update-education');
    Route::post('store-education', [EducationController::class, 'store'])->name('store-education');
    Route::delete('delete-education/{id?}', [EducationController::class, 'delete'])->name('delete-education');
    // work
    Route::put('update-work/{id?}', [WorkController::class, 'update'])->name('update-work');
    Route::post('store-work', [WorkController::class, 'store'])->name('store-work');
    Route::delete('delete-work/{id?}', [WorkController::class, 'delete'])->name('delete-work');
    // articles page
    Route::get('/articles', [ArticleController::class, 'articlesList'])->name('articles-list');
    Route::get('/article/{url?}', [ArticleController::class, 'articlePage'])->name('article-page');
    // article
    Route::get('/article-create', [ArticleController::class, 'articleCreate'])->name('article-create');
    Route::post('/article-store', [ArticleController::class, 'articleStore'])->name('article-store');
    Route::get('/article-edit/{article?}', [ArticleController::class, 'articleEdit'])->name('article-edit');
    Route::put('/article-update/{id?}', [ArticleController::class, 'articleUpdate'])->name('article-update');
    Route::delete('/article-delete/{id?}', [ArticleController::class, 'articledelete'])->name('article-delete');
    // article tag
    Route::put('update-articles-tag/{id?}', [ArticleTagController::class, 'update'])->name('update-articles-tag');
    Route::post('store-articles-tag', [ArticleTagController::class, 'store'])->name('store-articles-tag');
    Route::delete('delete-articles-tag/{id?}', [ArticleTagController::class, 'delete'])->name('delete-articles-tag');
    // services
    Route::get('/services', [ServiceController::class, 'list'])->name('services-list');
    Route::post('store-service', [ServiceController::class, 'store'])->name('store-service');
    Route::put('update-service/{id?}', [ServiceController::class, 'update'])->name('update-service');
    Route::delete('delete-service/{id?}', [ServiceController::class, 'delete'])->name('delete-service');
    // contacts
    Route::get('/contacts', [ContactController::class, 'contactsPage'])->name('contacts');
    Route::put('/update-contacts/{id?}', [ContactController::class, 'update'])->name('update-contacts');
});



Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Auth::routes(['register' => false]);
