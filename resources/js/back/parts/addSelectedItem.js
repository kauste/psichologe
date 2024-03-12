class AddSelectedItem {
    constructor(cssStyles, listDOM){
        this.cssStyles = cssStyles;
        this.listDOM = listDOM;
        this.parentDOM;
        this.selectBoxDOM
        this.optionsHTML;
        this.selectDOM;
        this.optionsDOMS;
        this.buttonDOM;
        this.selectedItemsDOMS;
        this.deleteSvgDOMS;
        this.selectedItems = [];
        this.init()
    }

    init(){
        this.parentDOM = this.listDOM.closest('.list--box');
        this.selectBoxDOM = this.parentDOM.querySelector('.select--box');
        this.selectDOM = this.parentDOM.querySelector('select');
        this.optionsDOMS = this.parentDOM.querySelectorAll('option');
        this.buttonDOM = this.parentDOM.querySelector('.--button');
        this.buttonDOM.addEventListener('click', this.addItemHandler);
    }

    addItemHandler= () => {

            this.selectedItems.push(this.selectDOM.value)
            const optionDOM = Array.from(this.optionsDOMS).find(option => option.value === this.selectDOM.value);
            this.apendElementToList(optionDOM)
            this.removeOption(optionDOM)
            this.setNewVariables()
    }
    removeOption(optionDOM){
        this.selectDOM.removeChild(optionDOM);
        if(this.selectDOM.childElementCount === 0){
            this.selectBoxDOM.style.display = 'none';
        }
    }
    apendElementToList(optionDOM){
        let li = document.createElement('li');
        li.dataset.item = this.selectDOM.value;
        li.style.paddingBottom = '5px';
        const itemHTML = `<div class="svg-box delete-svg-box delete--item--svg" style="display:flex">
                                <svg class="delete-svg">
                                    <use xlink:href="#delete"></use>
                                </svg>
                            </div>
                            <div class="inner--text">${optionDOM.innerText}</div>`;
        li.innerHTML = itemHTML;
        this.listDOM.appendChild(li);
        this.letDeleteNewItem(li)
        //change DOM

    }
    letDeleteNewItem(li){
        const newDeleteSvgDOM = li.querySelector('svg');
        newDeleteSvgDOM.addEventListener('click', this.deleteItem(newDeleteSvgDOM))      
    }
    setNewVariables(){
        this.selectedItemsDOMS = this.parentDOM.querySelectorAll('li[data-item]');
        this.optionsDOMS = this.parentDOM.querySelectorAll('option');
        // this.deleteSvgDOMS = this.parentDOM.querySelectorAll('.delete--item--svg')     
    }
    deleteItem =  (deleteSvgDOM) => () => {
        const item = deleteSvgDOM.closest('li');
        this.apendOption(item);
        this.removeElementFromList(item);
        this.setNewVariables();
    }
    apendOption(item){
        const option = document.createElement('option');
        option.value = item.dataset.id;
        option.innerText = item.querySelector('.inner--text').innerText;
        this.selectDOM.appendChild(option);
        if(this.selectDOM.childElementCount === 1){
            this.selectBoxDOM.style.display = 'flex';
        }
    }
    removeElementFromList(item){
        this.listDOM.removeChild(item);
        this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item.dataset.id)

    }
    saveOptionsHTML(){
        this.optionsHTML = this.selectDOM.innerHTML;
    }
    fullOptions(){
        this.selectDOM.innerHTML = this.optionsHTML;
        this.selectedItems = [];
        this.selectBoxDOM.style.display = 'flex';

    }
}
export default AddSelectedItem;