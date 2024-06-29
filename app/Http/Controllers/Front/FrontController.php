<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Models\FirstPage;
use App\Models\Article;
use App\Models\Citation;
use App\Models\Service;
use App\Models\Contact;


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
        $services = Service::where('id', '>', '0')
                            ->select('service_title')
                            ->orderBy('priority')
                            ->get();
        return view('front.firstPage', ['pageName' => 'firstPage', 
                                        'data' => $data, 
                                        'citations' => $citations,
                                        'services' => $services]);
    }
    public function articlesList(Request $request)
    {
        $perPage = 6;
        $filter = $request->filter ?? null;
        $page = $request->page ?? 1;
        $articles = Article::when($filter, function($query, $filter){
                                $query->whereHas('tags', function($query) use ($filter){
                                    $query->where('id', $filter);
                                });
                            })
                            ->orderByDesc('created_at')
                            ->offset($perPage * ($page - 1))
                            ->limit($perPage)
                            ->get();
        $articlesCount = Article::when($filter, function($query, $filter){
                                        $query->whereHas('tags', function($query) use ($filter){
                                            $query->where('id', $filter);
                                        });
                                    })
                                    ->count();
        $pages = ceil($articlesCount / $perPage);

        return view('front.articlesList', ['pageName' => 'articles',
                                           'articles' => $articles,
                                            'pages' => $pages,
                                            'currentPage' => $page]);
    }
    public function articlePage($url){
        $article = Article::where('url', $url)->first();
        return view('front.articlePage', ['pageName' => 'articles',
                                            'article' => $article]);
    }
    public function services()
    {
        $services = Service::where('id', '>', '0')
                            ->orderByRaw('priority IS NULL, priority')
                            ->get();
        return view('front.servicesPage', ['pageName' => 'services', 
                                           'services' => $services]);
    }
    public function contacts()
    {
        $contacts = Contact::first();
        return view('front.contactsPage', ['pageName' => 'contacts', 
                                            'contacts' => $contacts]);
    }


}
