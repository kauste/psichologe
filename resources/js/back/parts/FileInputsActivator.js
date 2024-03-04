import Positioner from "./positioner";

class FileInputsActivator{
    constructor(){
      this.inputsBoxesDOMS;
      this.inputClearBoxDOMS;
      this.activators = [];
      this.init()
    }
    init(){
      this.setDOMS()
      this.listenToInputs()
    }
    setDOMS(){
      this.inputClearBoxDOMS = document.querySelectorAll('.input--delete--box');
      this.deleteDOMS = document.querySelectorAll('.input--delete--box > .--delete');
    }
    listenToInputs(){
      this.inputClearBoxDOMS.forEach(inputClearBoxDOM => {
          const activator = new FileInputActivator(inputClearBoxDOM)
          const deteteDOM = inputClearBoxDOM.querySelector('.--delete')

          deteteDOM.addEventListener('click', () => {
            activator.clearInput()
          })
          if(activator.imgDOM.src && window.location.href !== activator.imgDOM.src){
            activator.setPositioner()
          }
      })

    }
  }
  class FileInputActivator{
    constructor(inputClearBoxDOM, ){
          this.inputClearBoxDOM = inputClearBoxDOM;
          this.inputBoxDOM;
          this.inputDOM;
          this.inputClearDOM;
          this.imgDataDOM;
          this.imgBoxDOM;

          this.imgDOM;
          this.labelDOM;
          this.file;
          this.positioner;
          this.setDOMS();
          this.activateInput();
    }
    setDOMS(){
      this.inputBoxDOM = this.inputClearBoxDOM.querySelector('.file--input--box');
      this.inputClearDOM = this.inputBoxDOM.querySelector('.--delete');
      this.labelDOM = this.inputBoxDOM.querySelector('[data-js-label]')
      this.imgDataDOM = this.inputClearBoxDOM.querySelector('.img--data--box');
      this.imgBoxDOM = this.inputClearBoxDOM.querySelector('.img--box');
      this.imgDOM = this.imgDataDOM.querySelector('img');
    }

    activateInput(){
      this.inputDOM = this.inputBoxDOM.querySelector('[type="file"]')
      this.inputDOM.addEventListener('change', this.fileInputHandler);
      // this.inputClearDOM.addEventListener('click')
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
      this.positioner = new Positioner('.img--box', this.imgBoxDOM)

    }

    clearInput(){
      this.file = '';
      this.inputDOM.value = null;
      this.imgDOM.src = '#';
      this.imgDataDOM.style.display = 'none';
      this.inputBoxDOM.style.display = 'flex';
      this.labelDOM.innerText = 'Nuotrauka nepasirinkta.';
      if(this.inputBoxDOM.querySelector('.--old')){
        this.inputBoxDOM.querySelector('.--old').value = 0;
      }

    }
    getObjectPosition(){
      return this.positioner.returnObjectPosition();
    }

  }
  
  export { FileInputsActivator, FileInputActivator };