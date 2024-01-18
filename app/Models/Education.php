<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FirstPage;

class Education extends Model
{
    use HasFactory;
    
    protected $fillable = ['date', 'about_education', 'priority', 'first_page_id'];
    public function page(){
        return $this->balongsTo(FirstPage::class);
    }
}
