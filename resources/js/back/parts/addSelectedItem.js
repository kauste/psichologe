class AddSelectedItem {
    constructor(listDOM){
        this.listDOM = listDOM;
        this.parentDOM;
        this.selectBoxDOM
        this.optionsHTML;
        this.selectDOM;
        this.optionsDOMS;
        this.buttonDOM;
        this.selectedItemsDOMS;
        this.selectedItems = [];
        //edit
        this.deleteItemDOMS;
        this.itemsDOMS;
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
    letDeleteItems(){
        this.deleteItemDOMS.forEach(deleteDOM => {
            this.letDeleteItem(deleteDOM.closest('li'));
        })

    }
    toggleEditStyle(){
        this.deleteItemDOMS = this.listDOM.querySelectorAll('.delete--item');
        console.log()
        this.selectBoxDOM.style.display = this.selectBoxDOM.style.display === 'none' ? 'flex' : 'none';
        this.deleteItemDOMS.forEach(deleteDOM => {
            deleteDOM.style.display = deleteDOM.style.display === 'flex' ? 'none' : 'flex';
            const item = deleteDOM.closest('li');
            item.style.paddingBottom = item.style.paddingBottom === '0px' ? '5px' : '0px';
        });
        this.listDOM.style.padding = this.listDOM.style.padding === '0px' ? '5px' : '0px';
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
        li.style.paddingBottom = '5px';
        const itemHTML = `<div class="svg-box delete-svg-box delete--item" style="display:flex">
                                <svg class="delete-svg">
                                    <use xlink:href="#delete"></use>
                                </svg>
                            </div>
                            <div class="--value" style="display:none">${this.selectDOM.value}</div>
                            <div class="inner--text">${optionDOM.innerText}</div>`;
        li.innerHTML = itemHTML;
        console.log( this.listDOM)
        this.listDOM.appendChild(li);
        this.letDeleteItem(li)
        //change DOM

    }
    letDeleteItem(li){
        const newDeleteSvgDOM = li.querySelector('svg');
        newDeleteSvgDOM.addEventListener('click', this.deleteItem(newDeleteSvgDOM), {once:true})      
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