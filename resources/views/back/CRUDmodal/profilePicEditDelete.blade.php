  <ul class="profile-pic-ul --profilePic">
      @forelse ($data->images as $image)
      <li class="one-profile-pic" id="profilePic-edit-{{$image->id}}">
            <div class="img-box profilePic--img">
                <img style="object-position:0 {{$image->object_y_pos_percent}}%" src="{{asset('/images/' .  $image->picture_path) }}" alt="image"/>
                <span class="line --line"></span>
            </div>
            <div class="priority-box">
            @if($image->priority)
                <div class="--priority priority">{{$image->priority}}</div>
            @else
                <div class="--priority priority">nesvarbu</div>
            @endif
                </div>
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
          <div class="update-actions update--actions" style="display:none">
              <button class="cancel-btn --cancel" type="button">Atšaukti</button>
              <button class="update-btn --update" type="button">Redaguoti</button>
          </div>
          <div class="delete-actions delete--actions">
              <button class="cancel-btn --cancel" type="button">Atšaukti</button>
              <button class="delete-btn --delete" type="button">Ištrinti</button>
          </div>
      </li>
      @empty
      <div>Šiuo metu duomenys neprieinami</div>
      @endforelse
  </ul>