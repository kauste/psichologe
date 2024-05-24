import ItemInUse from "../parts/itemInUse";
import CRUD from "../CRUD";
import { ListsIManager } from "../parts/listsManagers";

class ItemActivationManager {
    constructor(selector, parentDOM, itemDOM, actionsSelectors, swiper){
        this.parentDOM = parentDOM;
        this.selector = selector;
        this.itemDOM = itemDOM;
        this.actionsSelectors = actionsSelectors;
        this.swiper = swiper;
        this.openBtnDOM = this.itemDOM.querySelector(this.actionsSelectors.openBtnSelector);
        this.cancelBtnDOM = this.itemDOM.querySelector(this.actionsSelectors.cancelBtnSelector);
        this.actionBtnDOM = this.itemDOM.querySelector(this.actionsSelectors.actionBtnSelector);
    }

    addItemInUse(){
        const itemInUse = ItemInUse.getItem();
        if (itemInUse){
            itemInUse.classList.add('border--warning');
            return false;
        } 
        ItemInUse.updateItem(this.itemDOM);
        return true;
    }
    openStyles () {
        this.itemDOM.classList.add(`let--${this.action}`);
    }
    removeItemInUse(){
        if (ItemInUse.getItem()) ItemInUse.updateItem(null);
    }
    closeStyles(){
        this.itemDOM.classList.remove(`let--${this.action}`, 'border--warning');
    }
    setVariables(){
        this.dataDOM = this.itemDOM.querySelector('.--data');
        this.varDOMS = this.dataDOM.querySelectorAll('.--var')
        this.listsDOMS = this.dataDOM.querySelectorAll('.list--box ul')
        this.initialHTML = this.dataDOM.innerHTML;
    }
    enableEditing = () =>  this.varDOMS.forEach(variable =>  variable.contentEditable = 'true')

    disableEditing = () => this.varDOMS.forEach(variable =>  variable.contentEditable = 'false')
    
    restoreHTML(){
        this.dataDOM.innerHTML = this.initialHTML;
        this.setVariables();
        if(this.listsDOMS.length > 0) new ListsIManager(this.itemDOM).activate();
    }
    getData(){
        const data = {};
        this.varDOMS.forEach(varDOM => data[varDOM.dataset.name] = varDOM.innerText)
        if(this.listsDOMS.length > 0){
            this.listsDOMS.forEach(listDOM => {
                const name = listDOM.dataset.name;
                let items = [];
                const itemsValuesDOMS = listDOM.querySelectorAll('li .--value');
                itemsValuesDOMS.forEach(valueDOM => items.push(valueDOM.innerText))
                data[name] = items;

            })
        }
        return data;

    }
    modify = () => new CRUD(this.parentDOM, this.selector, this.swiper)[this.action](...this.getArgs());
}

export default ItemActivationManager;