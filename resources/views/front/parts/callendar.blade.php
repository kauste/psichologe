<div class="--swiper swiper">
    <div class="swiper-button-prev button round pink bg-light-sand">
        <svg class="chevron chevron-left">
            <use xlink:href="#chevron"></use>
        </svg>
    </div>
    <div class="swiper-button-next button round pink bg-light-sand">
        <svg class="chevron chevron-right">
            <use xlink:href="#chevron"></use>
        </svg>
    </div>
    <div class="swiper-wrapper">
        @foreach($callendar as $key => $month)
        <div class="callendar swiper-slide swiper--slide">
            <div class="card-header">
                <div class="year">{{$month['year']}}</div>
                <div class="month now--month" data-month="{{$month['monthName']}}">{{$month['monthName']}}</div>
            </div>
            <div class="table-box">
                <table>
                    <thead class="header">
                        <tr>
                            <th>Pr</th>
                            <th>A</th>
                            <th>Tr</th>
                            <th>K</th>
                            <th>P</th>
                            <th>Š</th>
                            <th>S</th>
                        </tr>
                    </thead>
                    <thead>
                        @foreach ($month['monthCallendar'] as $key => $week)
                        <tr>
                            @foreach($week as $key => $day)
                            <td class="one-day">
                                <button class="{{$day['is_abailible'] ? 'button round pink small bg-light-sand availible--day' : ''}} {{$day['date'] === $activeDay ? '--active' : ''}} {{$day['monthNum'] !== $month['monthNum'] ? '--disabled' : ''}}"  data-date="{{$day['date']}}">
                                    {{$day['day']}}
                                </button>
                            </td>
                            @endforeach
                        </tr>
                        @endforeach
                    </thead>
                </table>
            </div>
        </div>
        @endforeach
    </div>
</div>
