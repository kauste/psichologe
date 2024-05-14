<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\ArticleTag;
use App\Models\Article;


class ArticleTagController extends Controller
{
    public function updateArticlesTag(Request $request, $id)
    {
        $data = $request->data;
        $tag = ArticleTag::find($id);
        $data['articles'] = collect($data['articles'])->map(fn($articleId) => (int) $articleId)->toArray();
        $data['priority'] = (int) $data['priority'] ? (int) $data['priority'] : null;
        $validator = Validator::make($data, [
            'tag' => 'required|min:2|max:100',
            'priority' => 'nullable|integer|min:1|max:255',
            'articles' => 'nullable|array',
            'articles.*' => 'required|integer|exists:articles,id'
        ], [
            'tag.required' => 'Tago pavadinimas yra privalomas.',
            'tag.min' => 'Tago pavadinimas turi būti bent 2 simboliai.',
            'tag.max' => 'Tago pavadinimas neturi vyršyti 100 simbolių.',
            'priority.integer' => 'Prioritetas turi būti sveikasis skaičius.',
            'priority.min' => 'Prioritetas turi būti bent 1.',
            'priority.max' => 'Prioritetas turi neviršyti 255.',
            'articles.array' => 'Pridėti straipsniai turi būti masyve.',
            'articles.*.required' => 'Pridėtas straipsnis yra privalomas.',
            'articles.*.integer' => 'Pridėtas straipsnis turi būti sveikasis skaičius.',
            'articles.*.exists' => 'Pridėtas straipsnis turi egzistuoti straipsnių sąraše'

        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $tag->update([
            'tag' => $data['tag'],
            'priority' => $data['priority']
        ]);
        $tag->articles()->sync($data['articles']);
        return response()->json(['message' => 'Straipsnio tagas yra pakeistas.']);
    }
    public function storeArticlesTag(Request $request)
    {
        $data = $request->data;
        $data['priority'] = (int) $data['priority'] ? (int) $data['priority'] : null;
        $validator = Validator::make($data, [
            'tag' => 'required|min:2|max:100',
            'priority' => 'nullable|integer|min:1|max:255',
            'articles' => 'nullable|array',
            'articles.*' => 'required|integer|exists:articles,id'
        ], [
            'tag.required' => 'Tago pavadinimas yra privalomas.',
            'tag.min' => 'Tago pavadinimas turi būti bent 2 simboliai.',
            'tag.max' => 'Tago pavadinimas neturi vyršyti 100 simbolių.',
            'priority.integer' => 'Prioritetas turi būti sveikasis skaičius.',
            'priority.min' => 'Prioritetas turi būti bent 1.',
            'priority.max' => 'Prioritetas turi neviršyti 255.',
            'articles.array' => 'Pridėti straipsniai turi būti masyve.',
            'articles.*.required' => 'Pridėtas straipsnis yra privalomas.',
            'articles.*.integer' => 'Pridėtas straipsnis turi būti sveikasis skaičius.',
            'articles.*.exists' => 'Pridėtas straipsnis turi egzistuoti straipsnių sąraše'

        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $tag = ArticleTag::create([
            'tag' => $data['tag'],
            'priority' => $data['priority']
        ]);
        $selectedArticles = Article::findMany($data['articles']);

        $tag->articles()->saveMany($selectedArticles);

        $articles = Article::whereNotIn('id', $data['articles'])->get();
        $modalHTML = view('back.CRUDmodal.tags-nav.newTagModal', ['tag' => $tag,
                                                                  'articles' => $articles]
                                                                  )->render();
        $sectionHTML = view('back.CRUDmodal.tags-nav.newTagInSec', ['tag' => $tag])->render();

        return response()->json(['message' => 'Straipsni tagas yra sukurtas.',
                                'itemId' => $tag->id,
                                'modalHTML' => $modalHTML,
                                'sectionHTML' => $sectionHTML]);
    }
    public function deleteArticlesTag($id)
    {
        ArticleTag::destroy((int) $id);
        return response()->json(['message' => 'Kursai/mokymai yra ištrinti.']);
    }
}
