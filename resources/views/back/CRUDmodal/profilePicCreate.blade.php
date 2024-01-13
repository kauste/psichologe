<form>
    <div class="form --form">
        <div class="add-img add--img">
            <div class="is--right--radios">
                <div>Veidas dešinėje:</div>
                <div>
                    <input type="radio" id="true" name="is_right" value="1" checked>
                    <label for="true">Taip</label>
                </div>
                <div>
                    <input type="radio" id="false" name="is_right" value="0">
                    <label for="false">Ne</label>
                </div>
            </div>
            <div class="img-input-box">
                <div class="file-input-box file--input--box">
                    <input id="profile-pic" type="file" name="picture" accept="image/*" />
                    <span class='button'>Pasirinkite</span>
                    <span class="label" for="brand-pic" data-js-label>Nuotrauka nepasirinkta</span>
                </div>
                <div class="img-box create--profilePic--img">
                    <img id="output" style="object-position:0 0" alt="image" />
                    <span class="line --line"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="store-actions store--actions">
        <button class="cancel-btn --cancel" type="button">Atšaukti</button>
        <button class="update-btn --store" type="button">Sukurti</button>
    </div>
</form>
