<div class="modal-box contact--modal--box">
    <div class="modal --modal">
        <div class="heading-box">
            <div class="first-line">
                <h2>Kontaktai</h2>
            </div>
            <div class="message --message"></div>
        </div>
        <div class="items--parent">
            <div class="one-item one-contact one--item">
                <div class=" data --data">
                    <div class="--var var" data-name="adress" contenteditable="true" placeholder="Adresas">{{$contacts->adress ?? ''}}</div>
                    <div class="--var var" data-name="city" contenteditable="true" placeholder="Miestas">{{$contacts->city ?? ''}}</div>
                    <div class="--var var" data-name="telephone_number" contenteditable="true" placeholder="Telefono numeris">{{$contacts->telephone_number ?? ''}}</div>
                    <div class="--var var" data-name="city" contenteditable="true" placeholder="Elektroninis paštas">{{$contacts->email ?? ''}}</div>
                    <div class="link --var var" data-name="linkedin" contenteditable="true" placeholder="Asmeninio linkedin puslapio nuoroda">{{$contacts->linkedin ?? ''}}</div>
                    <div class="link --var var" data-name="facebook" contenteditable="true" placeholder="Asmeninio facebook puslapio nuoroda">{{$contacts->facebook ?? ''}}</div>
                </div>
                <div class="update-actions update--actions" style="display:flex">
                    <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                    <button class="update-btn --update" type="button">Redaguoti</button>
                </div>
            </div>
        </div>
    </div>
</div>
