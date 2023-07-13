 <ul class="work-ul --work">
     @forelse ($data->works as $work)
     <li class="one-work" id="work-edit-{{$work->id}}">
         <div class="date work--date">{{$work->date}}</div>
         <div class="about work--about">{{$work->about_work}}</div>
         {{-- butu galima visai paziureti, kad nerasytu man skaiciu nereikalingu --}}
         <div class="position work--priority {{$work->priority && $work->priority > 0 ? '' : 'small'}}">{{$work->priority && $work->priority > 0 ? $work->priority : ' nesvarbu'}}</div>
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
