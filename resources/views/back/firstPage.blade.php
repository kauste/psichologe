@extends('layouts.appBack')
@section('content')
@inject('contacts', 'App\Services\Contacts')

<div class="about--me--page back--office back-ofice">
    @include('back.CRUDmodal.citations.modal')
    @include('back.CRUDmodal.education.modal')
    @include('back.CRUDmodal.work.modal')
    <section id="hero" class="section-1">
        <div class="img-box">
            <img src="{{asset('images/psichologe_alytuje_11.webp')}}">
        </div>
        <div class="services">
            <ul>
                <li>Konsultavimas</li>
                <li>Psichologinis įvertinimas</li>
                <li>Mokymai</li>
            </ul>
        </div>
        <div id="citation"  class="citations-box">
            <div class="edit-svg-box --edit">
                <svg>
                    <use xlink:href="#edit"></use>
                </svg>
            </div>
            <img src="{{asset('images/bg3.webp')}}">
            <div class="citations">
                <div class="swiper citations--swiper ul--box">
                    <ul class="swiper-wrapper">
                        @foreach ($citations ?? [] as $citation)
                        <li class="swiper-slide" id="citation-{{$citation->id}}">
                            <div class="--citation">{{$citation->citation}}</div>
                            <small class="--author">{{$citation->author ?? ''}}</small>
                        </li>
                        @endforeach
                    </ul>
                </div>
                <div class="swiper-button-next">
                    <div class="round-button pink">
                        <svg class="chevron chevron-right">
                            <use xlink:href="#chevron"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <h1>
            <div class="duties">Psichologė Alytuje</div>
            <div class="full-name">Romalda Stasionienė</div>
        </h1>
        <div class="contacts">
            <div style="display:block" class="tel-num tel-desktop">&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</div>
            <a style="display:none" class=" tel-num tel-mobile" href="tel:+370{{str_replace([' ', '-'], '', $contacts->telephone_number)}}" target="_blank">&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</a>
            <a class="email" href="mailto:{{$contacts->email}}?subject=Mail from site">{{$contacts->email}}</a>
            <div class="media">
                @if($contacts->facebook)
                <a class="round-button pink" href="{{$contacts->facebook}}" target="_blank">
                    <svg>
                        <use xlink:href="#fb"></use>
                    </svg>
                </a>
                @endif
                @if($contacts->linkedin)
                <a class="round-button pink" href="{{$contacts->linkedin}}" target="_blank">
                    <svg>
                        <use xlink:href="#linkedin"></use>
                    </svg>
                </a>
                @endif
            </div>
        </div>
    </section>
    <section id="about" class="section-2">
        <div class="in-sec-2">
            <div class="edit-svg-box --edit">
                <svg>
                    <use xlink:href="#edit"></use>
                </svg>
            </div>
            <div class="heading-box --heading">
                <h2>Apie mane</h2>
            </div>
            <div class="--paragraph paragraph">
                <p>{{$data->about_me}}</p>
                <div class="update-actions update--actions" style="display:none">
                    <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                    <button class="update-btn --update" type="button">Redaguoti</button>
                </div>
            </div>

            <svg class="bamboo --bamboo">
                <use xlink:href="#bamboo"></use>
            </svg>
        </div>
    </section>
    <section id="education" class="section-3">
        <div class="education-box">
            <div class="edit-svg-box --edit">
                <svg>
                    <use xlink:href="#edit"></use>
                </svg>
            </div>
            <div class="heading-box">
                <h2>Išsilavinimas/Kursai</h2>
            </div>
            <div class="education-swiper-box">
                <div class="swiper --swiper ul--box">
                    <ul class="swiper-wrapper swiper--wrapper">
                        @forelse ($data->educations as $edu)
                        <li class="one-education swiper-slide" id="education-{{$edu->id}}" data-priority={{$edu->priority ?? null}}>
                            <div class="date">{{$edu->date}}</div>
                            <div class="about-edu">{{$edu->about}}</div>
                        </li>
                        @empty
                        <div>Šiuo metu duomenys neprieinami</div>
                        @endforelse
                    </ul>
                </div>
                <div class="swiper-button-prev round-button electric lardge swiper--button--prev disabled">
                    <svg class="chevron chevron-up">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
                <div class="swiper-button-next round-button electric lardge swiper--button--next">
                    <svg class="chevron chevron-down">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
            </div>
        </div>
    </section>
    <section id="work" class="section-4">
        <div class="work-box">
            <div class="edit-svg-box --edit">
                <svg>
                    <use xlink:href="#edit"></use>
                </svg>
            </div>
            <div class="heading-box">
                <h2>Darbo patirtis</h2>
            </div>
            <div class="work-swiper-box">
                <div class="swiper --swiper ul--box">
                    <ul class="swiper-wrapper swiper--wrapper">
                        @forelse ($data->works as $key => $work)
                        <li class="one-work swiper-slide" id="work-{{$work->id}}" data-priority={{$work->priority ?? null}}>
                            <div class="date">{{$work->date}}</div>
                            <div class="about-work">{{$work->about}}</div>
                        </li>
                        @empty
                        <div>Šiuo metu duomenys neprieinami</div>
                        @endforelse
                    </ul>
                </div>
                <div class="swiper-button-prev round-button pink lardge swiper--button--prev disabled">
                    <svg class="chevron chevron-up">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
                <div class="swiper-button-next round-button pink lardge swiper--button--next">
                    <svg class="chevron chevron-down">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection
