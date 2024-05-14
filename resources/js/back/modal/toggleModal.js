class ToggleModal{
    constructor(selector){
        this.selector = selector;
        this.modalBoxDOM;
        this.modalDOM;
        this.editSectionBtnDOM;
        this.init();
    }

    init(){
        this.setDOMS()
        this.editSectionBtnDOM.addEventListener('click', this.showModalHandler)
        this.modalBoxDOM.addEventListener('click', this.closeModalHandler)

    }
    setDOMS(){
        this.modalBoxDOM = document.querySelector(`.${this.selector}--modal--box`);
        this.modalDOM = this.modalBoxDOM.querySelector('.--modal');
        this.sectionDOM = document.querySelector(`#${this.selector}`);
        this.editSectionBtnDOM = this.sectionDOM.querySelector('.--edit');
    }

    showModalHandler = () => {
        this.modalBoxDOM.classList.add('show');
        this.modalBoxDOM.style.animation = 'open-modal-box 0.5s ease forwards';
        this.modalDOM.style.animation = 'open-modal 0.5s ease forwards';
    }

    closeModalHandler = (e) => {
        if(e.target === this.modalBoxDOM){
            // if(this.openItemDOM){
            //     this.borderWarningCSS();
            // }
            // else  if(this.createInputsDOMS 
            //     && (Array.from(this.createInputsDOMS).some(contentDOM => (contentDOM && contentDOM.value !== undefined && contentDOM.value?.trim() !== ''))
            //     || Array.from(this.createInputsDOMS).some(contentDOM => (contentDOM && contentDOM.innerText.trim() !== '')))
            // ){
            //     this.addBoxForm.style.border = this.warningBorderCSS;
            // }
            // else{
                this.modalDOM.style.animation = 'close-modal 0.5s ease forwards';
                this.modalBoxDOM.style.animation = 'close-modal-box 0.5s ease forwards';
                setTimeout(() => {
                    this.modalBoxDOM.classList.remove('show');
                }, 100)
            // }
        }
    }
    
}
export default ToggleModal;
