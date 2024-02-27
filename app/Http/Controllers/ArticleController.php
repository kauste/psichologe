<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

use App\Models\Article;

class ArticleController extends Controller
{
    public function articlesList(Request $request){
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

        return view('back.articlesList', ['pageName' => 'articlesList',
                                           'articles' => $articles,
                                            'pages' => $pages,
                                            'currentPage' => $page]);
    }
    public function articlePage(Request $request, Article $article){
        dd($article);
        return view('back.articlePage', ['pageName' => 'articlesList',
                                            'article' => $article]);
    }
    public function articleCreate(){
        return view('back.CRUD.createArticle', ['pageName' => 'articlesList',
                                                ]);
    }
    public function articleStore(Request $request)
    {
        $article = explode("\r\n", trim($request->article));
        $article = collect($article)->map(function($paragraph){
            return trim($paragraph);
        });
        $data = collect($request->all())->map(function($item, $key){
            if(str_starts_with($key, 'img_position_')){
                return (int) $item ?? null;
            }
            return $item;
        })->toArray();
        $imgs = collect($data)->filter(function($item, $key){
            return str_starts_with($key, 'img_') && strlen($key) === 5;

        });
        $imgsValidator = [];
        $imgsErrors = [];

        $imgs->each(function($img, $key) use (&$imgsValidator, &$imgsErrors, $article){
            $index = substr($key, -1);
            $imgsValidator = [...$imgsValidator,             
                            'img_' . $index => 'nullable|file|mimes:jpg,png,webp,mbp',
                            'img_position_' . $index => 'required|integer|min:1|max:'.count($article),
                            'img_author_' . $index => 'nullable|string|max:100',
                            'extra_data_' . $index => 'nullable|string|max:300'];
            $imgsErrors = [...$imgsErrors,
                            'img_position_'. $index .'.max' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi neviršyti straipsnio pastraipų skaičiaus.', 
                            'img_position_'. $index .'.min' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi būti nustatyta bent jau prieš pirmą paragrfą.', 
                            'img_position_'. $index .'.integer' => 'Nuotraukos ('. $index .') pozicija po paragrafo turi būti skaičius.',
                            'img_author_'. $index .'.string' => 'Nuotraukos ('. $index .') autorius turi buti string tipo',
                            'img_author_'. $index .'.max' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi neviršyti 100 simbolių.', 
                            'extra_data_'. $index .'.max' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi neviršyti 300 simbolių.', 
                            ];
        });
        $validator = Validator::make($data, ['title' => 'required|min:3|max:200',
                                            'youtube' => 'nullable|regex:^(?:https?://)?(?:www\\.)?youtube\\.com/watch\\?v=([a-zA-Z0-9_]+)(?:&.*)?$^',
                                            'article' => 'nullable|string|max:100000',
                                            ...$imgsValidator,
                                            'link' => 'nullable|string|max:300',
                                            'link_title' => 'nullable|string|max:300',
                                            'extra_data' => 'nullable|string|max:300'
                                            ],
                                            [
                                                'title.required' => 'Straipsnio pavadinimas yra privalomas',
                                                'title.min' => 'Straipsnio pavadinimas turi būti bent 3 simboliai',
                                                'title.required' => 'Straipsnio pavadinimas turi neviršyti 300 simbolių',
                                                'youtube.regex' => 'Nuoroda turi būti iš youtube kanalo',
                                                'article.string' => 'Straipsnis turi būti string tipo',
                                                'article.max' => 'Straipsnis neturi viršyti 1000 000 simbolių. Prašau susisiekti, jei norite ilgesnio straipsnio.',
                                                ...$imgsErrors,
                                                'link.string' => 'Nuoroda į šaltinį turi būti string tipo',
                                                'link.max' => 'Straipsnis neturi viršyti 300 simbolių',
                                                'link_title.string' => 'Šaltinio pavadinimas turi būti string tipo',
                                                'link_title.max' => 'Straipsnis neturi viršyti 300 simbolių.',
                                                'extra_data.string' => 'Papildoma informacija turi būti string tipo',
                                                'extra_data.max' => 'Papildoma informacija neturi viršyti 300 simbolių.',
                                            ]);

        if($validator->fails()){
            dd($validator->errors()->all());
            return back()->withErrors($validator)->withInput();
        };
        $article = Article::create([
            'title' => $data['title'],
            'article' => $article ?? null,
            'youtube' => $data['youtube'] ? Str::after($data['youtube'], 'watch?v=') : null,
            'link' => $data['link'] ? ['title' => $data['link_title'], 'link'=> $data['link']] : null,
            'extra_data' => $data['extra_data'] ?? null
        ]);
        foreach($imgs as $key => $image){
            $extention = $image->getClientOriginalExtension();
            $name = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
            $imgName = $name. '-' . rand(100000, 999999). '.' . $extention;
            $image->move(public_path().'/images/articlesImgs', $imgName);
            $isMain = $key === 0 ? true : false;
            $index = substr($key, -1);

            $article->update([ 'img_'. $index => ['path' => $imgName, 
                                                  'paragraph_before' => $data['img_position_'. $index], 
                                                  'img_author_'. $index => $data['extra_data_'. $index], 
                                                  'extra_data' => $data['extra_data_'. $index]],
                            ]);
            
        }
        return view('back.articlePage', ['pageName' => 'articlesList',
                                        'article' => $article]);
    }
}
