<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FirstPage;
use App\Models\Article;

class FrontController extends Controller
{
    public function firstPage()
    {
        $data = FirstPage::with(['images' => function($query){
                                    $query->orderByRaw('priority IS NULL, priority');
                                },
                                'educations'=> function($query){
                                    $query->orderByRaw('priority IS NULL, priority');
                                },
                                'works' => function($query){
                                    $query->orderByRaw('priority IS NULL, priority');
                                },])->first();
        return view('front.firstPage', ['pageName' => 'firstPage', 'data' => $data]);
    }
    public function articlesPage(Request $request)
    {
        $perPage = 6;
        $page = $request->page ?? 1;
        $articles = Article::offset($perPage * ($page - 1))
                            ->limit($perPage)
                            ->get();
        $pages = ceil(Article::count() / $perPage);

        return view('front.articlesPage', ['pageName' => 'articlesPage',
                                           'articles' => $articles,
                                            'pages' => $pages,
                                            'currentPage' => $page]);
    }
}
