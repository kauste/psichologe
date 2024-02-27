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
            'articles.*' => 'integer|exists:articles,id'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $tag->update([
            'tag' => $data['tag'],
            'priority' => $data['priority']
        ]);
        $tag->articles()->sync($data['articles']);
        return response()->json(['message' => 'Article tag is edited.']);
    }
    public function storeArticlesTag(Request $request)
    {
        $data = $request->data;
        $data['priority'] = (int) $data['priority'] ? (int) $data['priority'] : null;
        $validator = Validator::make($data, [
            'tag' => 'required|min:2|max:100',
            'priority' => 'nullable|integer|min:1|max:255',
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $tag = ArticleTag::create([
            'tag' => $data['tag'],
            'priority' => $data['priority']
        ]);
        $articles = Article::all();
        $modalHTML = view('back.CRUDmodal.tags-nav.newTagModal', ['tag' => $tag,
                                                                  'articles' => $articles]
                                                                  )->render();
        $sectionHTML = view('back.CRUDmodal.tags-nav.newTagInSec', ['tag' => $tag])->render();

        return response()->json(['message' => 'Article tag is edited.',
                                'modalHTML' => $modalHTML,
                                'sectionHTML' => $sectionHTML]);
    }
    public function deleteArticlesTag($id)
    {
        ArticleTag::destroy((int) $id);
        return response()->json(['message' => 'Kursai/mokymai yra ištrinti.']);
    }
}
