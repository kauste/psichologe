import DOMmodifier from "./DOMmodifier";

class ListsIManager{
    constructor(parentDOM){
        this.parentDOM = parentDOM;
    }
    activate() {
        if(this.parentDOM.querySelector(`.list--box:has(.input--box)`)) this.activateInputLists()        
        if(this.parentDOM.querySelector(`.list--box:has(.select--box)`)) this.activateSelectLists()
    }
    activateInputLists(){
        const listsDOMS = this.parentDOM.querySelectorAll(`.list--box:has(.input--box)`);
        listsDOMS.forEach(boxDOM => new InputListManager(boxDOM).letRemoveItems());
    }
    activateSelectLists(){
        const listsDOMS = this.parentDOM.querySelectorAll(`.list--box:has(.select--box)`);
        listsDOMS.forEach(boxDOM => new SelectListManager(boxDOM).letRemoveItems());

    }
}
class ListIManager {
    constructor(boxDOM){
        this.boxDOM = boxDOM;
        this.listDOM;
        this.addBtnDOM;
        this.newId = 0;
        this.domModifierClass;
        this.init();
        this.addBtnLIstener();

    }
    init(){
        this.domModifierClass = new DOMmodifier;
        this.listDOM = this.boxDOM.querySelector('ul');
        this.addBtnDOM = this.boxDOM.querySelector('.--button')

    }
    addBtnLIstener(){
        this.addBtnDOM.addEventListener('click', () => this.appendItemHandler());
    }
    letRemoveItems(){
        const removeBtnsDOMS = this.listDOM.querySelectorAll('li .delete--item')
        removeBtnsDOMS.forEach(btnDOM => this.removeBtnListener(btnDOM));
    }
    removeBtnListener(removeBtnDOM){
        const itemDOM = removeBtnDOM.closest('li')
        removeBtnDOM.addEventListener('click', () => this.removeItemHandler(itemDOM))
    }

}
class InputListManager extends ListIManager{
    constructor(boxDOM){
        super(boxDOM)
    }
    init(){
        console.log('ce')

        super.init()
        this.inputDOM = this.boxDOM.querySelector('input')
    }
    appendItemHandler(){
        const html =   `<div class="svg-box delete-svg delete--item">
                            <svg class="delete-svg">
                                <use xlink:href="#delete"></use>
                            </svg>
                        </div>
                        <div class="--value">${this.inputDOM.value}</div>`;
        const element = this.domModifierClass.appendElement(this.listDOM, 'li', html, {itemId:`new-${this.newId++}`})
        this.removeBtnListener(element.querySelector('.delete--item'))

        this.inputDOM.value = '';

    }
    removeItemHandler (itemDOM) {
        this.listDOM.removeChild(itemDOM)
    }


}
class SelectListManager extends ListIManager{
    constructor(boxDOM){
        super(boxDOM)
        this.selectBoxDOM;
        this.selectDOM
    }
    init(){
        super.init()
        this.selectBoxDOM = this.boxDOM.querySelector('.select--box')
        this.selectDOM = this.boxDOM.querySelector('select')
        this.findOptions()
    }
    findOptions(){
        this.optionsDOMS = this.selectDOM.querySelectorAll('option');

    }
    appendItemHandler(){
        const optionDOM = Array.from(this.optionsDOMS).find(option => option.value === this.selectDOM.value);

        const html =   `<div class="svg-box  delete--item">
                            <svg class="delete-svg">
                                <use xlink:href="#delete"></use>
                            </svg>
                        </div>
                        <div class="--value" style="display:none">${optionDOM.value}</div>
                        <div class="inner--text">${optionDOM.innerText}</div>`;
        const element = this.domModifierClass.appendElement(this.listDOM, 'li', html, {itemId:this.selectDOM.value})
        this.removeBtnListener(element.querySelector('.delete--item'))

        this.selectDOM.removeChild(optionDOM);
        if(this.selectDOM.childElementCount === 0) this.selectBoxDOM.style.display = 'none';

        this.findOptions()
    }
    removeItemHandler (itemDOM) {
        this.listDOM.removeChild(itemDOM)
        this.domModifierClass.prependElement(this.selectDOM, 
                                             'option', 
                                              itemDOM.querySelector('.inner--text').innerText, 
                                              null, 
                                              itemDOM.dataset.id)
        if(this.selectDOM.childElementCount === 1) this.selectBoxDOM.style.display = 'flex';
        this.findOptions()
    }

}
export { SelectListManager, InputListManager, ListsIManager};