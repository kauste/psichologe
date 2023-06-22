<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FirstPgImages;
use App\Models\Education;
use App\Models\Work;



class FirstPage extends Model
{
    public function images(){
        return $this->hasMany(FirstPgImages::class, 'first_page_id', 'id');
    }
    public function educations(){
        return $this->hasMany(Education::class, 'first_page_id', 'id');
    }
    public function works(){
        return $this->hasMany(Work::class, 'first_page_id', 'id');
    }
    use HasFactory;
}
