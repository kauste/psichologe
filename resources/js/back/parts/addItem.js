class AddItem{
    constructor(parentSelector, buttonSelector, selectSelector, listSelector){
        this.parentSelector = parentSelector;
        this.buttonSelector = buttonSelector;
        this.selectSelector = selectSelector;
        this.listSelector = listSelector;

        this.parentDOM;
        this.listDOM;
        this.addBtnDOM;
        this.selectTagDOM;
        this.tagOptionsDOMS;

        this.setDOMS();
        this.listenToClick()
    }
    setDOMS(){
        this.parentDOM = document.querySelector('.tags--box');
        this.listDOM = this.parentDOM.querySelector('.added--tags');
        this.addBtnDOM = this.parentDOM.querySelector('.add--btn')
        this.selectTagDOM = this.parentDOM.querySelector('select');
        this.tagOptionsDOMS = this.selectTagDOM.querySelectorAll('option')

    }
    addItemHandler = () => {
        let li = document.createElement('li');
        const option = Array.from(this.tagOptionsDOMS).find(option => option.value === this.selectTagDOM.value);
        //create option in list
        const newTagHTML = `<div class="svg-box --delete">
                                <svg class="delete-svg">
                                    <use xlink:href="#delete"></use>
                                </svg>
                            </div>
                            <div>${option.innerText}</div>
                            <input type="hidden" name="tags[]" value="${this.selectTagDOM.value}">`
        li.innerHTML = newTagHTML;
        this.listDOM.appendChild(li);
        //delete option from select
        this.selectTagDOM.removeChild(option);
        if(this.selectTagDOM.childElementCount === 0){
            this.selectTagDOM.style.display = 'none';
            this.addBtnDOM.style.display = 'none';
        }
        //listen to click
        const deleteDOM = li.querySelector('.--delete');
        deleteDOM.addEventListener('click', this.deleteItemHandler(option, li))
    }
    deleteItemHandler = (option, deleteItem) => () => {
        this.selectTagDOM.appendChild(option);
        this.listDOM.removeChild(deleteItem);
        console.log(this.selectTagDOM.childElementCount)
        if(this.selectTagDOM.style.display === 'none'){
            console.log('yo')
            this.selectTagDOM.style.display = 'flex';
            this.addBtnDOM.style.display = 'flex';

        }
    }

    listenToClick(){
        this.addBtnDOM.addEventListener('click', this.addItemHandler)
    }
}
export default AddItem;