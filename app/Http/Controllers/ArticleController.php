<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Session;
use App\Http\Middleware\DeleteArticleImages;
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
        $allArticles = Article::all();
        return view('back.articlesList', ['pageName' => 'articles',
                                           'articles' => $articles,
                                           'allArticles' => $allArticles,
                                            'pages' => $pages,
                                            'currentPage' => $page]);
    }
    public function articlePage(Request $request){
        $article = Article::where('id', $request->id)->first();
        return view('back.articlePage', ['pageName' => 'articles',
                                            'article' => $article]);
    }
    public function articleEdit(Article $article){
        $currenTags = $article->tags()->pluck('id')->toArray();
        $tagsForSelect = ArticleTag::whereNotIn('id', $currenTags)->get();
        return view('back.CRUD.editArticle', ['pageName' => 'articles',
                                              'article' => $article,
                                              'tagsForSelect' => $tagsForSelect,
                                             ]);
    }
    public function articleCreate(){
        return view('back.CRUD.CreateArticle', ['pageName' => 'articles',
                                                'tags' => ArticleTag::all()]);
    }
    public function articleStore(Request $request)
    {
        $articleText = explode("\r\n", trim($request->article));
        $articleText = collect($articleText)->map(function($paragraph){
            return trim($paragraph);
        });
        $data = collect($request->all())->map(function($item, $key){
            if(str_starts_with($key, 'img_position_')){
                return (int) $item ?? null;
            }
            if($key === 'extra_data'){
                return trim(str_replace("\r\n", " ", trim($item)));

            }
            return $item;
        })->toArray();
        $imgs = collect($data)->filter(function($item, $key){
            return str_starts_with($key, 'img_') && strlen($key) === 5;
        });

        $imgsValidator = [];
        $imgsErrors = [];
        $imgs->each(function($img, $key) use (&$imgsValidator, &$imgsErrors, $articleText){
            $index = substr($key, -1);
            $imgsValidator = [...$imgsValidator,             
                            'img_' . $index => 'nullable|file|mimes:jpg,png,webp,mbp',
                            'object_position_'. $index => 'nullable|numeric',
                            'img_position_' . $index => 'required|integer|min:1|max:'.count($articleText),
                            'img_author_' . $index => 'nullable|string|max:100',
                            'extra_data_' . $index => 'nullable|string|max:300',
                            'extra_data_' . $index => 'nullable|string|max:300',
                            ];
            $imgsErrors = [...$imgsErrors,
                            'img_' . $index .'.file' => 'Nuotrauka turi būti file tipo',
                            'img_' . $index .'.mimes:jpg,png,webp,mbp'  => 'Nuotrauka turi būti jpg, jpeg, png, webp arba mbp formato.',
                            'object_position_'. $index . '.numeric' => 'Nuotraukos pozicija turi būti skaičius.',
                            'img_position_'. $index .'.required' => 'Nuotraukos ('. $index .') pozicija straipsnyje yra privaloma.', 
                            'img_position_'. $index .'.max' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi neviršyti straipsnio pastraipų skaičiaus.', 
                            'img_position_'. $index .'.min' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi būti nustatyta bent jau prieš pirmą paragrfą.', 
                            'img_position_'. $index .'.integer' => 'Nuotraukos ('. $index .') pozicija po paragrafo turi būti skaičius.',
                            'img_author_'. $index .'.string' => 'Nuotraukos ('. $index .') autorius turi buti string tipo',
                            'img_author_'. $index .'.max' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi neviršyti 100 simbolių.', 
                            'extra_data_'. $index .'.max' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi neviršyti 300 simbolių.', 

                            ];
        });
        $validator = Validator::make($data, [
                                                'title' => 'required|min:3|max:200',
                                                'youtube' => 'nullable|regex:^(?:https?://)?(?:www\\.)?youtube\\.com/watch\\?v=([a-zA-Z0-9_]+)(?:&.*)?$^',
                                                'article' => 'nullable|string|max:100000',
                                                ...$imgsValidator,
                                                'link' => 'nullable|string|max:300',
                                                'link_title' => 'nullable|required_unless:link,null|string|max:300',
                                                'extra_data' => 'nullable|string|max:300',
                                                'tags' => 'nullable|array',
                                                'tags.*' => 'numeric|exists:article_tags,id',
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
                                                'link_title.required_unless' => 'Spaudos pavadinimas privalomas, jei yra pareikta spaudos nuoroda.',
                                                'link_title.string' => 'Šaltinio pavadinimas turi būti string tipo.',
                                                'link_title.max' => 'Straipsnis neturi viršyti 300 simbolių.',
                                                'extra_data.string' => 'Papildoma informacija turi būti string tipo.',
                                                'extra_data.max' => 'Papildoma informacija neturi viršyti 300 simbolių.',
                                                'tags.array' => 'Tagai turi būti masyve.',
                                                'tags.*.numeric' => 'Tagai turi būti skaičių tipo.',
                                                'tags.*.exists' => 'Tagai turi egzistuoti sąraše.'
                                            ]);

        if ($validator->fails()) {
            $formatedErrors = $validator->errors();
            $formatedErrors = collect($formatedErrors)->map(function($error) {
                return $error[0];
            })->toArray();
            return response()->json(['errors' => $formatedErrors]);
        }

        $article = Article::create([
            'title' => $data['title'],
            'article' => $articleText,
            'youtube' => isset($data['youtube']) ? Str::after($data['youtube'], 'watch?v=') : null,
            'link' => isset($data['link']) ? ['title' => $data['link_title'], 'link'=> $data['link']] : null,
            'extra_data' => isset($data['extra_data']) ? data['extra_data'] : null
        ]);
        if($imgs){
            foreach($imgs as $key => $image){
                $extention = $image->getClientOriginalExtension();
                $name = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
                $imgName = $name. '-' . rand(100000, 999999). '.' . $extention;
                $image->move(public_path().'/images/articlesImgs', $imgName);
                $index = substr($key, -1);
                $article->update([ 'img_'. $index => ['path' => $imgName,
                                                      'object_position' => isset($data['object_position_'. $index]) ? $data['object_position_'. $index] : 0,
                                                      'paragraph_before' => $data['img_position_'. $index], 
                                                      'author' => isset($data['img_author_'. $index]) ? $data['img_author_'. $index] : null, 
                                                      'extra_data' => isset($data['extra_data_'. $index]) ? $data['extra_data_'. $index] : null
                                                    ],
                                ]);
            }
        }

        if(isset($data['tags']) && is_array($data['tags'])){
            $article->tags()->attach($data['tags']);
        }

        return response()->json(['message' => 'Naujas straipsnis sukurtas',
                                'id' => $article->id]);
    }
    public function articleUpdate(Request $request)
    {

        $articleText = explode("\r\n", trim($request->article));
        $articleText = collect($articleText)->map(function($paragraph){
            return trim($paragraph);
        });
        $data = collect($request->all())->map(function($item, $key){
            if(str_starts_with($key, 'img_position_')){
                return (int) $item ?? null;
            }
            if($key === 'extra_data'){
                return trim(str_replace("\r\n", " ", trim($item)));
            }
            if(str_starts_with($key, 'img_old_')){
                return (bool) $item;
            }
            return $item;
        })->toArray();
        $imgs = collect($data)->filter(function($item, $key){
            return str_starts_with($key, 'img_') && strlen($key) === 5;
        });

        $imgsValidator = [];
        $imgsErrors = [];
        $imgs->each(function($img, $key) use (&$imgsValidator, &$imgsErrors, $articleText){
            $index = substr($key, -1);
            $imgsValidator = [...$imgsValidator,             
                            'img_' . $index => 'nullable|file|mimes:jpg,png,webp,mbp',
                            'object_position_'. $index => 'nullable|numeric',
                            'img_position_' . $index => 'required|integer|min:1|max:'.count($articleText),
                            'img_author_' . $index => 'nullable|string|max:100',
                            'extra_data_' . $index => 'nullable|string|max:300',
                            'extra_data_' . $index => 'nullable|string|max:300',
                            ];
            $imgsErrors = [...$imgsErrors,
                            'img_' . $index .'.file' => 'Nuotrauka turi būti file tipo',
                            'img_' . $index .'.mimes:jpg,png,webp,mbp'  => 'Nuotrauka turi būti jpg, jpeg, png, webp arba mbp formato.',
                            'object_position_'. $index . '.numeric' => 'Nuotraukos pozicija turi būti skaičius.',
                            'img_position_'. $index .'.required' => 'Nuotraukos ('. $index .') pozicija straipsnyje yra privaloma.', 
                            'img_position_'. $index .'.max' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi neviršyti straipsnio pastraipų skaičiaus.', 
                            'img_position_'. $index .'.min' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi būti nustatyta bent jau prieš pirmą paragrfą.', 
                            'img_position_'. $index .'.integer' => 'Nuotraukos ('. $index .') pozicija po paragrafo turi būti skaičius.',
                            'img_author_'. $index .'.string' => 'Nuotraukos ('. $index .') autorius turi buti string tipo',
                            'img_author_'. $index .'.max' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi neviršyti 100 simbolių.', 
                            'extra_data_'. $index .'.max' => 'Nuotraukos ('. $index .') pozicija straipsnyje turi neviršyti 300 simbolių.', 

                            ];
        });
        $oldImgs = collect($data)->filter(function($item, $key){
            return str_starts_with($key, 'img_old_');
        });
        $oldImgsValidator = [];
        $oldImgsErrors = [];
        $oldImgs->each(function($oldImg, $key) use (&$oldImgsValidator, &$oldImgsErrors, $articleText){
            $index = substr($key, -1);
            $oldImgsValidator = [...$oldImgsValidator,             
                            'img_old_' . $index => 'nullable|boolean',

                            ];
            $oldImgsErrors = [...$oldImgsErrors,
                            'img_old_' . $index .'.boolean' => 'Turi būti pažymėta, ar naudojama sena nuotrauka "boolean" kintamuoju.',
                            ];
        });
        $validator = Validator::make($data, [
                                                'id' => 'required|exists:articles,id',
                                                'title' => 'required|min:3|max:200',
                                                'youtube' => 'nullable|regex:^(?:https?://)?(?:www\\.)?youtube\\.com/watch\\?v=([a-zA-Z0-9_]+)(?:&.*)?$^',
                                                'article' => 'nullable|string|max:100000',
                                                ...$imgsValidator,
                                                ...$oldImgsValidator,
                                                'link' => 'nullable|string|max:300',
                                                'link_title' => 'nullable|required_unless:link,null|string|max:300',
                                                'extra_data' => 'nullable|string|max:300',
                                                'tags' => 'nullable|array',
                                                'tags.*' => 'numeric|exists:article_tags,id',
                                            ],
                                            [
                                                'id.required' => 'Nenurodytas norimas redaguoti straipsnis',
                                                'id.exists' => 'Redaguojamas straipsnis turi egzistuoti',
                                                'title.required' => 'Straipsnio pavadinimas yra privalomas.',
                                                'title.min' => 'Straipsnio pavadinimas turi būti bent 3 simboliai.',
                                                'title.max' => 'Straipsnio pavadinimas turi neviršyti 300 simbolių.',
                                                'youtube.regex' => 'Nuoroda turi būti iš youtube kanalo.',
                                                'article.string' => 'Straipsnis turi būti string tipo.',
                                                'article.max' => 'Straipsnis neturi viršyti 1000 000 simbolių. Prašau susisiekti, jei norite ilgesnio straipsnio.',
                                                ...$imgsErrors,
                                                ...$oldImgsErrors,
                                                'link.string' => 'Nuoroda į šaltinį turi būti string tipo.',
                                                'link.max' => 'Straipsnis neturi viršyti 300 simbolių.',
                                                'link_title.required_unless' => 'Spaudos pavadinimas privalomas, jei yra pareikta spaudos nuoroda.',
                                                'link_title.string' => 'Šaltinio pavadinimas turi būti string tipo.',
                                                'link_title.max' => 'Straipsnis neturi viršyti 300 simbolių.',
                                                'extra_data.string' => 'Papildoma informacija turi būti string tipo.',
                                                'extra_data.max' => 'Papildoma informacija neturi viršyti 300 simbolių.',
                                                'tags.array' => 'Tagai turi būti masyve.',
                                                'tags.*.numeric' => 'Tagai turi būti skaičių tipo.',
                                                'tags.*.exists' => 'Tagai turi egzistuoti sąraše.'
                                            ]);

        if ($validator->fails()) {
            $formatedErrors = $validator->errors();
            $formatedErrors = collect($formatedErrors)->map(function($error) {
                return $error[0];
            })->toArray();
            return response()->json(['errors' => $formatedErrors]);
        }
        $article = Article::find($request->id);

        $article->update([
            'title' => $data['title'],
            'article' => $articleText,
            'youtube' => isset($data['youtube']) ? Str::after($data['youtube'], 'watch?v=') : null,
            'link' => isset($data['link']) ? ['title' => $data['link_title'], 'link'=> $data['link']] : null,
            'extra_data' => isset($data['extra_data']) ? data['extra_data'] : null
        ]);
        if($oldImgs){
            $oldImgs->each(function($oldImg, $key) use ($article, $data){
                $index = substr($key, -1);
                $img = $article->{'img_'.$index};
                if(!$oldImg){
                    $pic_asset = $img['path'];
                    $name = pathinfo($pic_asset, PATHINFO_FILENAME);
                    $ext = pathinfo($pic_asset, PATHINFO_EXTENSION);
                    $pic_path = public_path() . '/images/articlesImgs/'. $name . '.' .$ext;
                    if (file_exists($pic_path)) {
                        unlink($pic_path);
                    }
                    $article->update(['img_'.$index => null]);
                }
                else{
                    $img = [...$img,
                            'object_position' => isset($data['object_position_'. $index]) ? $data['object_position_'. $index] : 0,
                            'paragraph_before' => $data['img_position_'. $index], 
                            'author' => isset($data['img_author_'. $index]) ? $data['img_author_'. $index] : null, 
                            'extra_data' => isset($data['extra_data_'. $index]) ? $data['extra_data_'. $index] : null
                            ];
                    $article->update([ 'img_'. $index => $img ]);
                }

            });
        }
        if($imgs){
            foreach($imgs as $key => $image){
                $extention = $image->getClientOriginalExtension();
                $name = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
                $imgName = $name. '-' . rand(100000, 999999). '.' . $extention;
                $image->move(public_path().'/images/articlesImgs', $imgName);
                $index = substr($key, -1);
                $article->update([ 'img_'. $index => ['path' => $imgName,
                                                      'object_position' => isset($data['object_position_'. $index]) ? $data['object_position_'. $index] : 0,
                                                      'paragraph_before' => $data['img_position_'. $index], 
                                                      'author' => isset($data['img_author_'. $index]) ? $data['img_author_'. $index] : null, 
                                                      'extra_data' => isset($data['extra_data_'. $index]) ? $data['extra_data_'. $index] : null
                                                    ],
                                ]);
            }
        }
        $article->tags()->detach();
        if(isset($data['tags']) && is_array($data['tags'])){
            $article->tags()->attach($data['tags']);
        }

        return response()->json(['message' => 'Straipsnio informacija pakeista',
                                'id' => $article->id]);
    }
    public function articledelete($id)
    {
        // nuotraukas istrint
        $article = Article::find((int) $id);
        foreach(range(1,3) as $index){
            if($article->{'img_'. $index}){
                $img = $article->{'img_'.$index};
                $pic_asset = $img['path'];
                $name = pathinfo($pic_asset, PATHINFO_FILENAME);
                $ext = pathinfo($pic_asset, PATHINFO_EXTENSION);
                $pic_path = public_path() . '/images/articlesImgs/'. $name . '.' .$ext;
                if (file_exists($pic_path)) {
                    unlink($pic_path);
                }
            }
        }
        $article->delete();
        return redirect()->route('back-articles-list')->with('message', 'Kursai/mokymai yra ištrinti.');
    }
}
