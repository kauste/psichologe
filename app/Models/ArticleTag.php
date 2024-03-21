<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Article;

class ArticleTag extends Model
{
    use HasFactory;
    protected $fillable = ['tag', 'priority'];
    public function articles()
    {
        return $this->belongsToMany(Article::class);
    }
    public function notUsedArticles()
    {
        $articles = Article::whereDoesntHave('tags', function ($query) {
            $query->where('id', $this->id);
        })->get();
        return $articles;
    }
}
