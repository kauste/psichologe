<div class="paginator-box">
@foreach(range(1, $pages) as $page)
<a class="{{$currentPage == $page ? 'active' : ''}}"href="{{url()->current() . '?page=' . $page}}">{{$page}}</a>
@endforeach
</div>