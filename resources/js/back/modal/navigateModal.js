class NavigateModal{
    constructor(selector) {
        this.selector = selector;
        this.modalDOM;
        this.addBtnDOM;
        this.backBtnDOM;
        this.setModalVariables();
        this.setModalListeners();
    }
    setModalVariables(){
        this.modalDOM = document.querySelector( `.${this.selector}--modal--box .--modal` );
        this.addBtnDOM = this.modalDOM.querySelector('.add--btn');
        this.backBtnDOM = this.modalDOM.querySelector('.back--btn');

    }
    toggleNexBackStyles(){
        this.modalDOM.classList.contains('--add') ? this.modalDOM.classList.remove('--add') : this.modalDOM.classList.add('--add');
    }
    nextModalHandler = () => {
        // if(this.openItemDOM){
        //     this.ulBoxDOM.scrollTop = this.openItemDOM.offsetTop - this.openItemDOM.oo - 10;
        //     this.borderWarningCSS()
        // }
        // else{
            this.toggleNexBackStyles();
        // }
    }
    backModalHandler = () => {
        // if(this.createInputsDOMS 
        // && (Array.from(this.createInputsDOMS).some(contentDOM => (contentDOM && contentDOM.value !== undefined && contentDOM.value?.trim() !== ''))
        //     || Array.from(this.createInputsDOMS).some(contentDOM => (contentDOM && contentDOM.innerText.trim() !== '')))
        // ){
        //     this.addBoxForm.style.border = this.warningBorderCSS;
        // }
        // else{    
        //     this.addBoxForm.style.border = 'none';
            this.toggleNexBackStyles();        
        // }
    }
    setModalListeners(){
        this.addBtnDOM.addEventListener('click', this.nextModalHandler)
        this.backBtnDOM.addEventListener('click', this.backModalHandler)
    }
}
export default NavigateModal;