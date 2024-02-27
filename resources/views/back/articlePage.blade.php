@extends('layouts.appBack')
@section('content')
@inject('tags', 'App\Services\ArticlesTags')
<div class="article--page article-page">
    <div class="tags-nav tags--nav">
        <a href="{{route('back-articles-list')}}" class="active">All</a>
        @foreach ($tags->tags as $tag)
        <a href="{{route('back-articles-list') . '?filter='. $tag->id}}">{{$tag->tag}}</a>
        @endforeach
    </div>
    <section class="article-box article--box">
        <div class="title-box">
            <h2>{{$article->title}}</h2>
            <div class="edit--actions edit-actions" style="display:flex">
                <div class="svg-box --edit">
                    <svg class="edit-svg">
                        <use xlink:href="#edit"></use>
                    </svg>
                </div>
                <div class="svg-box --delete">
                    <svg class="delete-svg">
                        <use xlink:href="#delete"></use>
                    </svg>
                </div>
            </div>
        </div>
        @if($article->youtube)
        <div class="youtube-box">
            <iframe src={{"https://www.youtube.com/embed/" . $article->youtube}} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        @endif
        <div class="article">
            @foreach ($article->article ?? [] as $key => $paragraph)
            @if( $article->img_1 && $key + 1 === $article->img_1['paragraph_before'])
            <div class="img-box">
                <img src="{{asset('images/articlesImgs') . '/' . $article->img_1['path']}}">
                @if(isset($article->img_1['extra_data']) && $article->img_1['extra_data'])
                <div class="extra-data">{{$article->img_1['extra_data']}}</div>
                @endif
                @if(isset($article->img_1['author']) && $article->img_1['author'])
                <div class="author">&#169; {{$article->img_1['author']}} nuotrauka</div>
                @endif
            </div>
            @endif
            @if( $article->img_2 && $key + 1 === $article->img_2['paragraph_before'])
            <div class="img-box">
                <img src="{{asset('images/articlesImgs') . '/' . $article->img_2['path']}}">
                @if(isset($article->img_2['extra_data']) && $article->img_2['extra_data'])
                <div class="extra-data">{{$article->img_2['extra_data']}}</div>
                @endif
                @if(isset($article->img_2['author']) && $article->img_2['author'])
                <div class="author">&#169; {{$article->img_2['author']}} nuotrauka</div>
                @endif
            </div>
            @endif
            @if( $article->img_3 && $key + 1 === $article->img_3['paragraph_before'])
            <div class="img-box">
                <img src="{{asset('images/articlesImgs') . '/' . $article->img_3['path']}}">
                @if(isset($article->img_3['extra_data']) && $article->img_3['extra_data'])
                <div class="extra-data">{{$article->img_3['extra_data']}}</div>
                @endif
                @if(isset($article->img_3['author']) && $article->img_3['author'])
                <div class="author">&#169; {{$article->img_3['author']}} nuotrauka</div>
                @endif
            </div>
            @endif
            <p>{{$paragraph}}</p>
            @endforeach
        </div>
        @if(isset($article->link) && $article->link && isset($article->link['link']) && $article->link['link'])
        <div class="media-link-box">
            <a href="{{$article->link['link']}}" target="_blank">{{$article->link['title'] ?? $article->link['link']}}</a>
        </div>
        @endif
    </section>
</div>
@endsection