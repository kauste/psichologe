<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Education;
use App\Models\Work;
use App\Models\User;

class FirstPage extends Model
{
    public function educations(){
        return $this->hasMany(Education::class, 'first_page_id', 'id');
    }
    public function works(){
        return $this->hasMany(Work::class, 'first_page_id', 'id');
    }
    public function user()
    {
        return $this->hasOne(User::class);
    }
    use HasFactory;
}
