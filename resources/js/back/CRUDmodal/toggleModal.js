class ToggleModal{
    constructor(selector){
        this.selector = selector;
        this.modalBoxDOM;
        this.modalDOM;
        this.editSectionBtnDOM;
        this.parentCloseModalHandler = this.closeModalHandler;
    }

    init(){
        this.modalBoxDOM = document.querySelector(`.${this.selector}--modal--box`);
        this.modalDOM = this.modalBoxDOM.querySelector('.--modal');
        this.sectionDOM = document.querySelector(`#${this.selector}`);
        this.editSectionBtnDOM = this.sectionDOM.querySelector('.--edit');
        this.editSectionBtnDOM.addEventListener('click', this.showModalHandler)
    }

    showModalHandler = () => {
        this.modalBoxDOM.classList.add('show');
        this.modalBoxDOM.style.animation = 'open-modal-box 0.5s ease forwards';
        this.modalDOM.style.animation = 'open-modal 0.5s ease forwards';
        this.modalBoxDOM.addEventListener('click', this.closeModalHandler)
    }

    closeModalHandler = (e) => {
        if(e.target === this.modalBoxDOM){
            this.modalDOM.style.animation = 'close-modal 0.5s ease forwards';
            this.modalBoxDOM.style.animation = 'close-modal-box 0.5s ease forwards';
            setTimeout(() => {
                this.modalBoxDOM.classList.remove('show');
            }, 100)
            this.modalBoxDOM.removeEventListener('click', this.closeModalHandler)
        }
    }

    
}
export default ToggleModal;
