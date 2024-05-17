import CRUD from "./CRUD";
import ItemInUse from "./itemInUse";
import { ListsIManager } from "./listItemManager ";

class ItemsActivator{
    constructor(action, parentDOM, actionsSelector, listTypes, route){
        this.action = action;
        this.parentDOM = parentDOM
        this.actionsSelector = actionsSelector;
        this.route = route;
        this.listTypes = listTypes;
        this.itemInUse = ItemInUse;
        this.activateItems();
    }
    
    activateItems(){
        const actionsBoxDOMS = this.parentDOM.querySelectorAll(this.actionsSelector.actionsParentSelector);
        actionsBoxDOMS.forEach(actionBoxDOM => this.activateItem(actionBoxDOM))
    }
    activateItem(actionBoxDOM){
        const openBtnDOM = actionBoxDOM.querySelector(this.actionsSelector.openBtnSelector);
        const cancelBtnDOm = actionBoxDOM.querySelector(this.actionsSelector.cancelBtnSelector);
        const actionBtnDOM = actionBoxDOM.querySelector(this.actionsSelector.actionBtnSelector);
        const itemDOM =  cancelBtnDOm.closest('.one--item') || cancelBtnDOm.closest('.--form') ;

        const cssClassTogglerOBJ = (this.parentDOM !== document && this.action !== 'create') ? new CssClassToggler(itemDOM, this.action) : null;
        const contentEditorOBJ = (this.action === 'create' || this.action === 'edit') ? new ContentEditor(itemDOM, this.listTypes) : null;
        // if(this.parentDOM !== document && (this.action === 'edit' || this.action === 'delete')) new CssClassToggler(openBtnDOM,  cancelBtnDOm, itemDOM, this.action)
        // if(this.action === 'create' || this.action === 'edit') new ContentEditor(openBtnDOM,  cancelBtnDOm, itemDOM, this.listTypes)
        // new LetModifyItem(this.parentDOM, itemDOM, actionBtnDOM, this.action, this.route)
        actionBtnDOM.addEventListener('click', () => this.modify(itemDOM))
        
        if(openBtnDOM) openBtnDOM.addEventListener('click', this.open(itemDOM, cssClassTogglerOBJ, contentEditorOBJ))
        if(cancelBtnDOm)cancelBtnDOm.addEventListener('click', this.close(cssClassTogglerOBJ, contentEditorOBJ))


    }
    open = (itemDOM, cssClassTogglerOBJ, contentEditorOBJ) => () => {
        const openItemDOM = this.itemInUse.getItem()
        if(openItemDOM || ( this.action === 'create'  && contentEditorOBJ.isFilled())) return openItemDOM.classList.add('border--warning')
            
        this.itemInUse.updateItem(itemDOM)
        if(cssClassTogglerOBJ) cssClassTogglerOBJ.open();
        if(contentEditorOBJ) contentEditorOBJ.open()
    }

    close = ( cssClassTogglerOBJ, contentEditorOBJ) => () =>{
        const openItemDOM = this.itemInUse.getItem()
        openItemDOM.classList.remove('border--warning')
            
        this.itemInUse.updateItem(null)
        if(cssClassTogglerOBJ) cssClassTogglerOBJ.close();
        if(contentEditorOBJ) contentEditorOBJ.close()
    }
    modify = (itemDOM) => new CRUD(this.parentDOM, itemDOM, route)[this.action];


}
class CssClassToggler{
    constructor(itemDOM, action){
        this.itemDOM = itemDOM;
        this.action = action;
    }
    close = () => this.itemDOM.classList.remove(`let--${this.action}`)
    open = () => this.itemDOM.classList.add(`let--${this.action}`)
    
}
class ContentEditor{
    constructor(itemDOM, listTypes){
        this.itemDOM = itemDOM;
        this.listTypes = listTypes;
        this.initialData;
        this.variablesDOMS;
        this.dataDOM;
        this.setDOMS()
    }
    setDOMS(){
        this.dataDOM = this.itemDOM.querySelector('.--data');
        this.initialData = this.dataDOM.innerHTML;
        this.variablesDOMS = this.dataDOM.querySelectorAll('.--var, .--priority')
    }
    open = () => {
        this.variablesDOMS.forEach(variable =>  variable.contentEditable = 'true')
    }
    close = () => {
        this.dataDOM.innerHTML = this.initialData;
        this.setDOMS();
        if(this.listTypes) new ListsIManager(this.itemDOM, this.listTypes).activate()
    }
    isFilled = () => {
        let filled = false;
        this.variablesDOMS.forEach(varDOM => {
            varDOM.addEventListener('input', () => {
                if(varDOM.innerText.trim() !== ''){
                    filled = true;
                    return;
                } 
            })

        })
        return filled;
    }

}

export { ItemsActivator };
