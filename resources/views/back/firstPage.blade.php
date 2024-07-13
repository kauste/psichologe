@extends('layouts.appBack')
@section('content')
@inject('contacts', 'App\Services\Contacts')

<div class="about--me--page back--office">
    @include('back.CRUDmodal.citation.modal')
    @include('back.CRUDmodal.education.modal')
    @include('back.CRUDmodal.work.modal')
    <section id="hero" class="section-1">
        <div class="box">
            <div class="services">
                <ul>
                    @foreach ($services as $service)
                    <li class="service-item">{{$service->service_title}}</li>
                    @endforeach
                </ul>
            </div>
            <div class="img-box">
                <img src="{{asset('images/psichologe-alytuje-1.webp')}}">
            </div>
            <div id="citation" class="citations-box">
                <div class="edit-svg-box --edit">
                    <svg>
                        <use xlink:href="#edit"></use>
                    </svg>
                </div>
                <img src="{{asset('images/bg3.webp')}}">
                <div class="citations" id="citation">
                    <div class="swiper citations--swiper">
                        <ul class="swiper-wrapper items--parent">
                            @foreach ($citations ?? [] as $citation)
                            <li class="swiper-slide one-citation one--item" data-id="{{$citation->id}}">
                                <div class="--var" data-name="citation">{{$citation->citation}}</div>
                                <small class="--var" data-name="author">{{$citation->author ?? ''}}</small>
                            </li>
                            @endforeach
                        </ul>
                    </div>
                    <div class="swiper-button-next">
                        <div class="button round pink bg-electric">
                            <svg class="chevron chevron-right">
                                <use xlink:href="#chevron"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contacts">
                <div style="display:block" class="tel-num tel-desktop">&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</div>
                <a style="display:none" class=" tel-num tel-mobile" href="tel:+370{{str_replace([' ', '-'], '', $contacts->telephone_number)}}" target="_blank">&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</a>
                <a class="email" href="mailto:{{$contacts->email}}?subject=Mail from site">{{$contacts->email}}</a>
                <div class="media">
                    @if($contacts->facebook)
                    <a class="button round pink bg-light-electric" href="{{$contacts->facebook}}" target="_blank">
                        <svg>
                            <use xlink:href="#fb"></use>
                        </svg>
                    </a>
                    @endif
                    @if($contacts->linkedin)
                    <a class="button round pink bg-light-electric" href="{{$contacts->linkedin}}" target="_blank">
                        <svg>
                            <use xlink:href="#linkedin"></use>
                        </svg>
                    </a>
                    @endif
                </div>
            </div>
            <h1>
                <div class="duties">Psichologė Alytuje</div>
                <div class="full-name">Romalda Stasionienė</div>
            </h1>
        </div>
    </section>
    <section id="about" class="section-2">
        <div class="in-sec-2 --item one-item">
            <div class="edit-actions edit--actions">
                <div class="edit-svg-box --edit">
                    <svg>
                        <use xlink:href="#edit"></use>
                    </svg>
                </div>
            </div>
            <div class="heading-box --heading">
                <h2>Apie mane</h2>
            </div>
            <div class="paragraph-box">
                <div class="data --data">
                    <p class="var last --var" data-name="about_me">{{$data->about_me}}</p>
                </div>
                <div class="update-actions update--actions">
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
                <div class="swiper --swiper">
                    <ul class="swiper-wrapper items--parent">
                        @forelse ($data->educations as $edu)
                        <li class="swiper-slide one-education one--item" data-id="{{$edu->id}}" data-priority={{$edu->priority ?? null}}>
                            <div class="date --var" data-name="date">{{$edu->date}}</div>
                            <div class="about-edu --var" data-name="about">{{$edu->about}}</div>
                        </li>
                        @empty
                        <div>Šiuo metu duomenys neprieinami</div>
                        @endforelse
                    </ul>
                </div>
                <div class="swiper-button-prev button round electric bg-light-sand lardge swiper--button--prev ">
                    <svg class="chevron chevron-up">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
                <div class="swiper-button-next button round electric bg-light-sand lardge swiper--button--next">
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
                <div class="swiper --swiper">
                    <ul class="swiper-wrapper items--parent">
                        @forelse ($data->works as $key => $work)
                        <li class="swiper-slide one-work one--item" data-id="{{$work->id}}" data-priority={{$work->priority ?? null}}>
                            <div class="date --var" data-name="date">{{$work->date}}</div>
                            <div class="about-work --var" data-name="about">{{$work->about}}</div>
                        </li>
                        @empty
                        <div>Šiuo metu duomenys neprieinami</div>
                        @endforelse
                    </ul>
                </div>
                <div class="swiper-button-prev button round pink bg-electric lardge swiper--button--prev ">
                    <svg class="chevron chevron-up">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
                <div class="swiper-button-next button round pink bg-electric lardge swiper--button--next">
                    <svg class="chevron chevron-down">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection
