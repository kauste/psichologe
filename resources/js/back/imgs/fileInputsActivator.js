import Positioner from "./positioner";

class FileInputsActivator{
    constructor(imgRatio){
      this.imgRatio = imgRatio;
  
      this.fileInputBoxesDOMS;
      this.activators = [];
      this.init()
    }
    init(){
      this.setDOMS()
      this.listenToInputs()
    }
    setDOMS(){
      this.fileInputBoxesDOMS = document.querySelectorAll('.input--delete--box');
      this.deleteDOMS = document.querySelectorAll('.input--delete--box > .--delete');
    }
    listenToInputs(){
      this.fileInputBoxesDOMS.forEach(fileInputBoxDOM => new FileInputActivator(fileInputBoxDOM, this.imgRatio))

    }
  }
  class FileInputActivator{
    constructor(fileInputBoxDOM, imgRatio){
          this.fileInputBoxDOM = fileInputBoxDOM;
          this.imgRatio = imgRatio;
          this.inputBoxDOM;
          this.inputDOM;
          this.inputClearDOM;
          this.imgDataDOM;
          this.imgBoxDOM;
          this.deteteDOM;

          this.imgDOM;
          this.labelDOM;
          this.file;
          this.positioner;
          this.setDOMS();
          this.activate();
    }
    setDOMS(){
      this.inputBoxDOM = this.fileInputBoxDOM.querySelector('.file--input--box');
      this.inputDOM = this.inputBoxDOM.querySelector('[type="file"]')
      this.inputClearDOM = this.inputBoxDOM.querySelector('.--delete');
      this.labelDOM = this.inputBoxDOM.querySelector('[data-js-label]')
      this.imgDataDOM = this.fileInputBoxDOM.querySelector('.img--data--box');
      this.imgBoxDOM = this.fileInputBoxDOM.querySelector('.img--box');
      this.imgDOM = this.imgDataDOM.querySelector('img');
      this.deteteDOM = this.fileInputBoxDOM.querySelector('.--delete')
    }

    activate(){
      this.inputDOM.addEventListener('change', this.fileInputHandler);

      this.deteteDOM.addEventListener('click', this.clearInput.bind(this))
      if(this.imgDOM.src && window.location.href !== this.imgDOM.src) this.setPositioner()
      }


    fileInputHandler = (e) => {
        if (!this.inputDOM.value) return
        this.file = e.target.files[0];
        this.imgDOM.src = URL.createObjectURL(this.file);
        this.imgDataDOM.style.display = 'block';
        this.inputBoxDOM.style.display = 'none';
        this.setPositioner();
    }
    setPositioner(){
      this.positioner = new Positioner(this.imgBoxDOM, this.imgDOM, this.inputBoxDOM, null, this.imgRatio )

    }

    clearInput(){
      this.file = '';
      this.inputDOM.value = null;
      this.imgDOM.src = '#';
      this.imgDataDOM.style.display = 'none';
      this.inputBoxDOM.style.display = 'flex';
      this.labelDOM.innerText = 'Nuotrauka nepasirinkta.';
      if(this.inputBoxDOM.querySelector('.--old')) this.inputBoxDOM.querySelector('.--old').value = 0;

    }

  }
  
  export { FileInputsActivator, FileInputActivator };