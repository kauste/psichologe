<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ServiceType;

class Service extends Model
{
    use HasFactory;
    protected $fillable = ['service_title', 'priority'];
    protected $casts = ['services' => 'array'];

    public function serviceTypes(){
        return $this->hasMany(ServiceType::class);
    }
}
