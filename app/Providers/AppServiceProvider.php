<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Contacts;
use App\Services\ArticlesTags;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(Contact::class, function($app){
            return new Contact;
        });
        $this->app->bind(ArticlesTags::class, function($app){
            return new ArticlesTags;
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
