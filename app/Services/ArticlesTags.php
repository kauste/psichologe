<?php 
namespace App\Services;
use App\Models\Contact;
use App\Models\ArticleTag;

class ArticlesTags {
    public $tags;
    public function __construct() {
        $this->tags = ArticleTag::all();
    }
}