import ItemInUse from "../itemInUse";

class ToggleModal{
    constructor(selector){
        this.selector = selector;
        this.modalBoxDOM;
        this.modalDOM;
        this.editSectionBtnDOM;
        this.itemInUse = ItemInUse;
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
            // const itemInUse = this.itemInUse.getItem();
            // if((this.modalDOM.classList.contains('--add') && this.itemInUse.checkFilled(this.modalDOM)
            // || this.itemInUse.getItem())
            // ){
            //     this.itemInUse.getItem().classList.add('border--warning');
            // }
            // else {
            //     if(itemInUse) itemInUse.classList.remove('border--warning');
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
