@extends('layouts.app')

@section('content')
<div class="page--1">
    <div class="section-1-box">
        <section class="section-1 section--1">
            <div class="ul-box ul--box">
                <ul class="profile-pic-ul">
                    @forelse ($data->images as $key => $image)
                    <li class="one-profile-pic {{$image->is_right ? 'right' : 'left'}}" style="opacity:{{$key === 0 ? 1 : 0}}">
                        <img src="{{asset('images/'. $image->picture_path)}}" alt="psichologe Alytuje Romalda Stasioniene" />
                    </li>
                    @empty
                    <li class="one-profile-pic">
                        <img class="right" style="opacity:1" src="./images/bg2.webp" alt="psichologe Alytuje Romalda Stasioniene" />
                    </li>
                    @endforelse
                </ul>
            </div>
            <h1>Psichologė Alytuje <div>Romalda Stasionienė</div>
            </h1>
        </section>
    </div>
    <section class="section-2 section--2">
        <div class="in-sec-2">
            <div class="heading-box --heading">
                <h2>Apie mane</h2>
            </div>
            <div class="--paragraph paragraph">
                <p>{{$data->about_me}}</p>
            </div>
            <svg class="bamboo --bamboo">
                <use xlink:href="#bamboo"></use>
            </svg>
        </div>
    </section>
    <section class="section-3 section--3">
        <div class="education-box">
            <div class="heading-box">
                <h2>Išsilavinimas/Kursai</h2>
            </div>
            <div class="education-swiper-box">
                <div class="swiper --swiper">
                    <ul class="swiper-wrapper swiper--wrapper">
                        @forelse ($data->educations as $edu)
                        <li class="one-education swiper-slide">
                            <div class="date">{{$edu->date}}</div>
                            <div class="about-edu">{{$edu->about_education}}</div>
                        </li>
                        @empty
                        <li>Šiuo metu duomenys neprieinami</li>
                        @endforelse
                    </ul>
                </div>
                <div class="swiper-button-prev swiper--button--prev disabled">
                    <svg class="chevron chevron-up">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
                <div class="swiper-button-next swiper--button--next">
                    <svg class="chevron chevron-down">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
            </div>
        </div>
    </section>
    <section class="section-4 section--4">
        <div class="work-box">
            <div class="heading-box">
                <h2>Darbo patirtis</h2>
            </div>
            <div class="work-swiper-box">
                <div class="swiper --swiper">
                    <ul class="swiper-wrapper swiper--wrapper">
                        @forelse ($data->works as $key => $work)
                        <li class="one-work swiper-slide">
                            <div class="date">{{$work->date}}</div>
                            <div class="about-work">{{$work->about_work}}</div>
                        </li>
                        @empty
                        <div>Šiuo metu duomenys neprieinami</div>
                        @endforelse
                    </ul>

                </div>
                <div class="swiper-button-prev swiper--button--prev disabled">
                    <svg class="chevron chevron-up">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
                <div class="swiper-button-next swiper--button--next">
                    <svg class="chevron chevron-down">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection
