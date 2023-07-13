  <ul class="education-ul --education">
      @forelse ($data->educations as $edu)
      <li class="one-education" id="education-edit-{{$edu->id}}">
          <div class="date education--date">{{$edu->date}}</div>
          <div class="about education--about">{{$edu->about_education}}</div>
          {{-- butu galima visai paziureti, kad nerasytu man skaiciu nereikalingu --}}
          <div class="position education--priority {{$edu->priority && $edu->priority > 0 ? '' : 'small'}}">{{$edu->priority && $edu->priority > 0 ? $edu->priority : ' nesvarbu'}}</div>
          <div class="edit--actions edit-actions">
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
          <div class="update-actions update--actions">
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
