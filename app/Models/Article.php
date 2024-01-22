<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ArticleTag;


class Article extends Model
{
    use HasFactory;
    
    protected $fillable = ['article', 'img_1_path', 'img_2_path', 'img_3_path'];

    protected $casts = ['article' => 'array'];
    public function tags()
    {
        return $this->belongsToMany(Role::class);
    }
}
