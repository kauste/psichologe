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
    constructor(inputBoxDOM){
          this.inputBoxDOM = inputBoxDOM;
          this.inputDOM;
          this.activateInput()
    }
    activateInput(){
      this.inputDOM = this.inputBoxDOM.querySelector('[type="file"]')
      console.log(this.inputDOM)
      this.inputDOM.addEventListener('change', this.fileInputHandler);
    }
    fileInputHandler = (e) => {
        if (!this.inputDOM.value) return
        const imgBoxDOM = this.inputBoxDOM.querySelector('.create--profilePic--img');
        const image = imgBoxDOM.querySelector('.img');
        image.src = URL.createObjectURL(e.target.files[0]);
        const labelDOM = this.inputBoxDOM.querySelector('[data-js-label]')

        // this.inputBoxDOM.className += ' --chosen';
        imgBoxDOM.style.display = 'flex';
        labelDOM.innerText = '';
      }
  }
  
  export { FileInputsActivator, FileInputActivator };