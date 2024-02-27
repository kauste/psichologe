<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use App\Models\FirstPage;
use App\Models\Article;
use App\Models\Citation;

class FrontController extends Controller
{
    public function firstPage()
    {
        $data = FirstPage::with(['educations'=> function($query){
                                    $query->orderByRaw('priority IS NULL, priority');
                                },
                                'works' => function($query){
                                    $query->orderByRaw('priority IS NULL, priority');
                                },])->first();
        $citations = Citation::orderBy(DB::raw('RAND()'))
                             ->get();
        return view('back.firstPage', ['pageName' => 'firstPage', 
                                        'data' => $data, 
                                        'citations' => $citations]);
    }
    public function articlesList(Request $request)
    {
        $perPage = 6;
        $page = $request->page ?? 1;
        $articles = Article::offset($perPage * ($page - 1))
                            ->limit($perPage)
                            ->get();
        $pages = ceil(Article::count() / $perPage);

        return view('front.articlesList', ['pageName' => 'articlesList',
                                           'articles' => $articles,
                                            'pages' => $pages,
                                            'currentPage' => $page]);
    }
    public function articlePage(Article $article){
        return view('front.articlePage', ['pageName' => 'articlesList',
                                            'article' => $article]);
    }

}
