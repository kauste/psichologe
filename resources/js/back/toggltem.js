import { ListItemsManager } from "./listItemManager ";

class ToggleItems{
    constructor(parentSelector, openSelector, closeSelector, selectorToAdd){
        this.parentSelector = parentSelector;
        this.openSelector = openSelector;
        this.closeSelector = closeSelector;
        this.selectorToAdd = selectorToAdd;
        this.activateItemsToggler();
    }
    
    activateItemsToggler(){
        const parentDOM = document.querySelector(this.parentSelector);
        const actionsBoxDOMS = parentDOM.querySelectorAll('.--actions');
        actionsBoxDOMS.forEach(actionBoxDOM => new ToggleItem(this.openSelector,  this.closeSelector, this.selectorToAdd, actionBoxDOM))
    }


    // borderWarningCSS(){
    //     this.ulBoxDOM.scrollTop = this.parentDOM.offsetTop - this.parentDOM.offsetHeight - 30;
    //     this.childerDOMS.forEach((child, i) => {
    //         child.style.border = this.warningBorderCSS;
    //         if ( i !== this.childerDOMS.length -1) child.style.borderRight = 'none';            
    //     })
    // }


}
class ToggleItem{
    constructor(openSelector, closeSelector, selectorToAdd, actionBoxDOM){
        this.openSelector = openSelector;
        this.closeSelector = closeSelector;
        this.selectorToAdd = selectorToAdd;
        this.actionBoxDOM = actionBoxDOM;
        this.openBtnDOM;
        this.cancelBtnDOM;
        this.itemDOM;
        this.initialData;
        this.variablesDOMS;
        this.dataDOM;
        this.setDOMS();
        this.letToggleItem();
    }
    setDOMS(){
        this.openBtnDOM = this.actionBoxDOM.querySelector(`${this.openSelector}`);
        this.closeBtnDOM = this.actionBoxDOM.querySelector(`${this.closeSelector} .--cancel`);
        this.itemDOM =  this.closeBtnDOM.closest('.one--item');
    }
    setEditableDOMS(){
        this.dataDOM = this.itemDOM.querySelector('.--data');
        this.initialData = this.dataDOM.innerHTML;
        this.variablesDOMS = this.dataDOM.querySelectorAll('.--var, .--priority')
    }

    letToggleItem(){
        if(this.selectorToAdd === 'let--edit' || this.selectorToAdd === 'let--delete') this.letToggleStyle();
        if(this.selectorToAdd === 'let--edit') this.letToggleEditable();
    }
    letToggleStyle(){
        this.openBtnDOM.addEventListener('click', () => this.itemDOM.classList.add(this.selectorToAdd))
        this.closeBtnDOM.addEventListener('click', () => this.itemDOM.classList.remove(this.selectorToAdd))
    }
    letToggleEditable(){
        this.activateEditable();
        this.openBtnDOM.addEventListener('click', () => this.variablesDOMS.forEach(variable =>  variable.contentEditable = 'true'))
        this.closeBtnDOM.addEventListener('click', () => {
            this.dataDOM.innerHTML = this.initialData;
            this.letToggleEditable();
        })
    }
    activateEditable(){
        this.setEditableDOMS();
        if(this.itemDOM.querySelector('.input--box')) new ListItemsManager(this.itemDOM, '.input--box')
        if(this.itemDOM.querySelector('.select--box')) new ListItemsManager(this.itemDOM, '.select--box')
    }
    // activateInputManager(){
    //     const boxDOMS = this.itemDOM.querySelectorAll('.list--box:has(.input--box)');
    //     boxDOMS.forEach(boxDOM => new InputItemManager(boxDOM).letRemoveItems());
    // }
    // activateSelectManager(){
    //     const boxDOMS = this.itemDOM.querySelectorAll('.list--box:has(.select--box)');
    //     boxDOMS.forEach(boxDOM => new SelectItemManager(boxDOM).letRemoveItems());
    // }
}

export { ToggleItems };
