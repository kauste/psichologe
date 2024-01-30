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
        return view('front.firstPage', ['pageName' => 'firstPage', 
                                        'data' => $data, 
                                        'citations' => $citations]);
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
    public function articlePage(Request $request, Article $article){
        // dd($article);
        return view('front.articlePage', ['pageName' => 'articlesPage',
                                            'article' => $article]);
    }

}
