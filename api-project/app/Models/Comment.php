<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = ['id','post_id', 'body', 'user_id'];
    use HasFactory;
    public function posts(){
        return $this->belongsTo(Post::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
