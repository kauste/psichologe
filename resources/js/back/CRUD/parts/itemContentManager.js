import { ListsIManager } from "./listsManagers";

class ItemContentManager{
    constructor(itemDOM){
        this.itemDOM = itemDOM;
        this.data = {};
        this.dataDOM;
        this.varDOMS;
        this.listsDOMS;
        this.initialHTML;
        // this.initialData;
        this.setVariables();

    }
    setVariables(){
        this.dataDOM = this.itemDOM.querySelector('.--data');
        this.varDOMS = this.dataDOM.querySelectorAll('.--var')
        this.listsDOMS = this.dataDOM.querySelectorAll('.list--box ul')
        this.initialHTML = this.dataDOM.innerHTML;
    }
    enableEditing = () =>  this.varDOMS.forEach(variable =>  variable.contentEditable = 'true')

    disableEditing = () => this.varDOMS.forEach(variable =>  variable.contentEditable = 'false')
    
    cancelChanges  = () => {
        this.dataDOM.innerHTML = this.initialHTML;
        this.setVariables();
        if(this.listsDOMS.length > 0) new ListsIManager(this.itemDOM).activate();
    }

    getData(){
        this.varDOMS.forEach(varDOM => this.data[varDOM.dataset.name] = varDOM.innerText)
        if(this.listsDOMS.length > 0){
            this.listsDOMS.forEach(listDOM => {
                const name = listDOM.dataset.name;
                let items = [];
                const itemsValuesDOMS = listDOM.querySelectorAll('li .--value');
                itemsValuesDOMS.forEach(valueDOM => items.push(valueDOM.innerText))
                this.data[name] = items;

            })
        }
        return this.data;

    }
    changeContent(data){
        this.varDOMS.forEach(vardOM =>  vardOM.innerText = this.initialHTML[vardOM.dataset.name])
        if(this.listsDOMS && listDOMS.length > 0){
            this.listDOMS.forEach(listDOM => {
                const currList = data[listDOM.dataset.name]
                let html = '';
                currList.forEach(item => html += `<li>${item}</li>`)
                listDOM.innerHTML = html;
            })
        }
    }
}
export default ItemContentManager;
