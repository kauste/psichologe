<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ArticleTag;


class Article extends Model
{
    use HasFactory;
    
    protected $fillable = ['title', 'article', 'youtube', 'link', 'img_1', 'img_2', 'img_3', 'extra_data'];

    protected $casts = ['article' => 'array',
                        'link' => 'array', 
                        'img_1' => 'array', 
                        'img_2' => 'array', 
                        'img_3' => 'array'];
    public function tags()
    {
        return $this->belongsToMany(ArticleTag::class);
    }
}
