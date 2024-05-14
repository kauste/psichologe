import DOMmodifier from "./DOMmodifier";
class ListItemsManager{
    constructor(itemDOM, selector){
        this.itemDOM = itemDOM;
        this.selector = selector;
        this.activate();
    }
    activate() {
        const boxDOMS = this.itemDOM.querySelectorAll(`.list--box:has(${this.selector})`);
        if(this.selector === '.input--box')  boxDOMS.forEach(boxDOM => new InputItemManager(boxDOM).letRemoveItems());
        if(this.selector === '.select--box')  boxDOMS.forEach(boxDOM => new SelectItemManager(boxDOM).letRemoveItems());
    }
}
class ListItemManager {
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
    removeItemHandler (itemDOM) {
        this.listDOM.removeChild(itemDOM)
    }
}
class InputItemManager extends ListItemManager{
    constructor(boxDOM){
        super(boxDOM)
    }
    init(){
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

}
class SelectItemManager extends ListItemManager{
    constructor(boxDOM){
        super(boxDOM)
        this.selectBoxDOM;
        this.selectDOM
        this.init();

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
        super.removeItemHandler(itemDOM)
        this.domModifierClass.prependElement(this.selectDOM, 
                                             'option', 
                                              itemDOM.querySelector('.inner--text').innerText, 
                                              null, 
                                              itemDOM.dataset.id)
        if(this.selectDOM.childElementCount === 1) this.selectBoxDOM.style.display = 'flex';
        this.findOptions()
    }

}
export { InputItemManager, SelectItemManager, ListItemsManager};