<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Article;

class ArticleTag extends Model
{
    use HasFactory;
    protected $fillable = ['tag'];
    public function articles()
    {
        return $this->belongsToMany(Role::class);
    }
}
