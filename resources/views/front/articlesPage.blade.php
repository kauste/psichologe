@extends('layouts.app')
@section('content')
@inject('tags', 'App\Services\ArticlesTags')
<div class="articles--page articles-page">
<img class="decor-img"src="{{asset('images/articlesBg2.png')}}" alt="decor">
    <div class="tags-nav tags--nav">
        <a href="#" class="active">All</a>
        @foreach ($tags->tags as $tag)
        <a href="#">{{$tag->tag}}</a>
        @endforeach
    </div>
    <section class="articles-box">
        @foreach ($articles as $article)
        <div class="article-border">
        <div class="article-box">
            <div class="title-box">
                <span class="title">{{$article->title}}</span>
                <svg>
                    <use xlink:href="#arrow"></use>
                </svg>
            </div>
            <div class="article">{{$article->article[0]}}</div>
        </div>
        </div>
        @endforeach
        @include('parts.paginator')
    </section>
</div>
@endsection
