<div class="slots--box slots-box">
    <div class="card-header">
        <div>{{$activeDay}}</div>
    </div>
    <div class="slots radio--box">
        @foreach ($daySlots as $event)
        <div>
            <input type="radio" id="time-{{$event['start']}}-{{$event['end']}}" data-name="event_id" value="{{$event['event_id']}}">
            <label for="time-{{$event['start']}}-{{$event['end']}}">{{$event['start']}} - {{$event['end']}}</label>
        </div>
        @endforeach
    </div>
</div>
