import ItemInUse from "../../CRUD/parts/itemInUse";

class NavigateModal{
    constructor(selector) {
        this.selector = selector;
        this.modalDOM;
        this.addBtnDOM;
        this.backBtnDOM;
        this.itemInUse = ItemInUse;
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
        const itemInUseDOM = this.itemInUse.getItem()
        if(itemInUseDOM){
            itemInUseDOM.classList.add('border--warning');
        }
        else{
            this.toggleNexBackStyles();
        }
    }
    backModalHandler = () => {
        this.toggleNexBackStyles();        
    }
    setModalListeners(){
        this.addBtnDOM.addEventListener('click', this.nextModalHandler)
        this.backBtnDOM.addEventListener('click', this.backModalHandler)
    }
}
export default NavigateModal;