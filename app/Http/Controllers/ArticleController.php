<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

use App\Models\Article;
use App\Models\ArticleTag;

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
        return view('back.articlePage', ['pageName' => 'articlesList',
                                            'article' => $article]);
    }
    public function articleCreate(){
        return view('back.CRUD.createArticle', ['pageName' => 'articlesList',
                                                'tags' => ArticleTag::all()]);
    }
    public function articleStore(Request $request)
    {
        dd(storage_path('/app/'));

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
        $oldImgs = collect($data)->filter(function($item, $key){
            return str_starts_with($key, 'old_img_') && strlen($key) === 5;
        });
        $imgsValidator = [];
        $imgsErrors = [];
        $allImgs = $imgs->merge($oldImgs->toArray());
        $allImgs->each(function($img, $key) use (&$imgsValidator, &$imgsErrors, $article){
            $index = substr($key, -1);
            $imgsValidator = [...$imgsValidator,             
                            'img_' . $index => 'nullable|file|mimes:jpg,png,webp,mbp',
                            'object_position'. $index => 'required|numeric',
                            'img_position_' . $index => 'nullable|integer|min:1|max:'.count($article),
                            'img_author_' . $index => 'nullable|string|max:100',
                            'extra_data_' . $index => 'nullable|string|max:300',
                            'extra_data_' . $index => 'nullable|string|max:300',
                            'tags' => 'required|array',
                            'tags.*' => 'numeric',
                            ];
            $imgsErrors = [...$imgsErrors,
                            'img_' . $index .'.file' => 'Nuotrauka turi būti file tipo',
                            'img_' . $index .'.mimes:jpg,png,webp,mbp'  => 'Nuotrauka turi būti jpg, jpeg, png, webp arba mbp formato.',
                            'object_position'. $index . 'numeric' => 'Nuotraukos pozicija turi būti skaičius.',
                            'img_position_'. $index .'.max' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi neviršyti straipsnio pastraipų skaičiaus.', 
                            'img_position_'. $index .'.min' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi būti nustatyta bent jau prieš pirmą paragrfą.', 
                            'img_position_'. $index .'.integer' => 'Nuotraukos ('. $index .') pozicija po paragrafo turi būti skaičius.',
                            'img_author_'. $index .'.string' => 'Nuotraukos ('. $index .') autorius turi buti string tipo',
                            'img_author_'. $index .'.max' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi neviršyti 100 simbolių.', 
                            'extra_data_'. $index .'.max' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi neviršyti 300 simbolių.', 
                            'tags.array' => 'Tagai turi būti masyve.',
                            'tags.*.numeric' => 'Tagai turi būti skaičių tipo.',
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
                                                'title.required' => 'Straipsnio pavadinimas yra privalomas.',
                                                'title.min' => 'Straipsnio pavadinimas turi būti bent 3 simboliai.',
                                                'title.max' => 'Straipsnio pavadinimas turi neviršyti 300 simbolių.',
                                                'youtube.regex' => 'Nuoroda turi būti iš youtube kanalo.',
                                                'article.string' => 'Straipsnis turi būti string tipo.',
                                                'article.max' => 'Straipsnis neturi viršyti 1000 000 simbolių. Prašau susisiekti, jei norite ilgesnio straipsnio.',
                                                ...$imgsErrors,
                                                'link.string' => 'Nuoroda į šaltinį turi būti string tipo.',
                                                'link.max' => 'Straipsnis neturi viršyti 300 simbolių.',
                                                'link_title.string' => 'Šaltinio pavadinimas turi būti string tipo.',
                                                'link_title.max' => 'Straipsnis neturi viršyti 300 simbolių.',
                                                'extra_data.string' => 'Papildoma informacija turi būti string tipo.',
                                                'extra_data.max' => 'Papildoma informacija neturi viršyti 300 simbolių.',
                                            ]);

        if ($validator->fails()) {
            $imgs->each(function($img, $key) use ($request){
                $imgPath = $request->file($key)->store('uploads');
                $asset = asset('storage/app/' .$imgPath);
                $asset = str_replace('/public', '', $imgPath);
                session()->put( $key . '_data', ['path' => $imgPath, 'asset' => $asset]);
            });
            $oldImgs->each(function($img, $key) use ($request){
                $imgPath = $request->$key->store('uploads');
                $imgPath = asset('storage/app/' .$imgPath);
                $imgPath = str_replace('/public', '', $imgPath);
                session()->put( $key . '_path', $imgPath);
            });

            
            return back()->withErrors($validator)->withInput();
        }
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
            $index = substr($key, -1);

            $article->update([ 'img_'. $index => ['path' => $imgName,
                                                  'object_position' => $data['object_position_'. $index],
                                                  'paragraph_before' => $data['img_position_'. $index], 
                                                  'author' => $data['img_author_'. $index], 
                                                  'extra_data' => $data['extra_data_'. $index]],
                            ]);
        }
        if($oldImgs->count() > 0){
            $oldImgsDestinationDIR = public_path('images/articlesImgs');
            if(file_exists($oldImgsDestinationDIR)){
                foreach($oldImgs as $key => $image){
                    $imgPath = storage_path($image);
                    $destinationPatn = oldImgsDestinationDIR . '/' .$image;
                    if(file_exists($imgPath)){
                        rename($imgPath, $destinationPatn);
                        $index = substr($key, -1);
                        $article->update([ 'img_'. $index => ['path' => $image,
                                                            'object_position' => $data['object_position_'. $index],
                                                            'paragraph_before' => $data['img_position_'. $index], 
                                                            'author' => $data['img_author_'. $index], 
                                                            'extra_data' => $data['extra_data_'. $index]],
                                         ]);
                    }
                }
            }


        }
        if(isset($data['tags']) && is_array($data['tags'])){
            $article->tags()->attach($data['tags']);
        }

        return redirect()->route('back-article-page', $article);
    }
    public function articledelete($id)
    {
        Article::destroy((int) $id);
        return response()->json(['message' => 'Kursai/mokymai yra ištrinti.']);
    }
}
