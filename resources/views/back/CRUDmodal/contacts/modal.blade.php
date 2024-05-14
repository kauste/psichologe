<div class="modal-box contact--modal--box">
    <div class="modal --modal">
        <div class="heading-box">
            <div class="first-line">
                <h2>Kontaktai</h2>
            </div>
            <div class="message --message"></div>
        </div>
        <div class="modal-ul-box ul--box">
            <ul class="contact-ul --contact">
                <li class="--var" data-name="adress" contenteditable="true" placeholder="Adresas">{{$contacts->adress ?? ''}}</li>
                <li class="--var" data-name="city" contenteditable="true" placeholder="Miestas">{{$contacts->city ?? ''}}</li>
                <li class="--var" data-name="telephone_number" contenteditable="true"  placeholder="Telefono numeris">{{$contacts->telephone_number ?? ''}}</li>
                <li class="--var" data-name="city" contenteditable="true" placeholder="Elektroninis paštas">{{$contacts->email ?? ''}}</li>
                <li class="link --var" data-name="linkedin" contenteditable="true" placeholder="Asmeninio linkedin puslapio nuoroda">{{$contacts->linkedin ?? ''}}</li>
                <li class="link --var" data-name="facebook" contenteditable="true" placeholder="Asmeninio facebook puslapio nuoroda">{{$contacts->facebook ?? ''}}</li>
            </ul>
            <div class="update-actions update--actions" style="display:flex">
                <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                <button class="update-btn --update" type="button">Redaguoti</button>
            </div>
        </div>
    </div>
</div>
