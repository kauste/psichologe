import Positioner from "./Positioner";

class FileInputsActivator{
    constructor(){
      this.inputsBoxesDOMS;
      this.init()
    }
    init(){
      this.setDOMS()
      this.listenToInputs()
    }
    setDOMS(){
      this.inputsBoxesDOMS = document.querySelectorAll('.file--input--box:not(.--chosen)');
    }
    listenToInputs(){
      this.inputsBoxesDOMS.forEach(inputBoxDOM => {
          new FileInputActivator(inputBoxDOM)
      })
    } 
  }
  class FileInputActivator{
    constructor(inputBoxDOM, ){
          this.inputBoxDOM = inputBoxDOM;
          this.inputDOM;
          this.imgBoxDOM;
          this.imgDOM;
          this.labelDOM;
          this.file;
          this.positioner;
          this.setDOMS();
          this.activateInput()
    }
    setDOMS(){
      this.imgBoxDOM = document.querySelector('.create--profilePic--img');
      this.imgDOM = this.imgBoxDOM.querySelector('img');
      this.labelDOM = this.inputBoxDOM.querySelector('[data-js-label]')
    }
    activateInput(){
      this.inputDOM = this.inputBoxDOM.querySelector('[type="file"]')
      console.log(this.inputDOM)
      this.inputDOM.addEventListener('change', this.fileInputHandler);
    }

    fileInputHandler = (e) => {
        if (!this.inputDOM.value) return
        this.file = e.target.files[0];
        this.imgDOM.src = URL.createObjectURL(this.file);
        this.imgBoxDOM.style.display = 'block';
        this.labelDOM.innerText = '';
        this.positioner = new Positioner('.create--profilePic--img', this.imgBoxDOM, null)
        this.positioner.setBoxesSize()
        this.positioner.init()
    }
    clearInput(){
      this.file = '';
      this.imgDOM.src = '#';
      this.imgBoxDOM.style.display = 'none';
      this.labelDOM.innerText = 'Nuotrauka nepasirinkta';
    }
    getObjectPosition(){
      return this.positioner.returnObjectPosition();
    }
    getFile(){
      return this.file;
    }

  }
  
  export { FileInputsActivator, FileInputActivator };