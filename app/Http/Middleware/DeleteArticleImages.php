<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DeleteArticleImages
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        foreach(range(1,3) as $img){
            if(session()->has('img_'.$img.'_data')){
                $imgPath = session()->get('img_'.$img.'_data')['path'];
                Storage::delete($imgPath);
            }
        }
        if()
        return $next($request);
    }
}
