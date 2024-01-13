<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FirstPage;


class FirstPgImages extends Model
{
    protected $fillable = ['is_right','priority','object_y_pos_percent', 'picture_path'];
    public function page(){
        return $this->balongsTo(FirstPage::class, 'first_page_id', 'id');
    }
    use HasFactory;
}
