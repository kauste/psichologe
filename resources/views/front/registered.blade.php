@extends('layouts.app')
@section('content')

<section class="registered-page registered--page">
    <div class="container">
        <div class="card-header">
            <h2>Užregistruota</h2>
        </div>
        <div>
            <p><span class="bold">{{$client['name']}} {{$client['surname']}}</span>, lauksiu tavęs adresu <span class="bold">{{$contacts->adress}}, {{$contacts->city}}</span>. Mūsų susitikimas įvyks <span class="bold">{{$eventStart}}</span>.</p>
            <p>Artimiausi metu su Tavimi susisieksiu kontaktuose nurodytu <span>telefono numeriu</span> ar <span>elektroniniu paštu</span>.</p>
            <p>Laikykis!</p>
        </div>
    </div>
</section>
@endsection
