<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FirstPage;

class Education extends Model
{
    use HasFactory;
    
    public function page(){
        return $this->balongsTo(FirstPage::class);
    }
}
