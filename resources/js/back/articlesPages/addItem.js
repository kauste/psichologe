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
        this.selectBoxDOM = this.parentDOM.querySelector('.add--article--tag')
        this.addBtnDOM = this.selectBoxDOM.querySelector('.add--btn')
        this.selectTagDOM = this.selectBoxDOM.querySelector('select');
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
            this.selectBoxDOM.style.display = 'none';
        }
        //listen to click
        const deleteDOM = li.querySelector('.--delete');
        deleteDOM.addEventListener('click', this.deleteItemHandler(option, li))
    }
    letExistingTagsDelete(){
        const liDOMS = this.listDOM.querySelectorAll('li')
        liDOMS.forEach(li => {
            let option = document.createElement('option');
            option.value = li.querySelector('input').value;
            option.innerText = li.querySelector('.--tag').innerText;
            const deleteDOM = li.querySelector('.--delete');
            deleteDOM.addEventListener('click', this.deleteItemHandler(option, li))
            deleteDOM.addEventListener('click', this.refinfOptions)


        })
    }
    deleteItemHandler = (option, deleteItem) => () => {
        this.selectTagDOM.appendChild(option);
        this.listDOM.removeChild(deleteItem);
        if(this.selectBoxDOM.style.display === 'none'){
            this.selectBoxDOM.style.display = 'flex';
        }
    }

    listenToClick(){
        this.addBtnDOM.addEventListener('click', this.addItemHandler)
    }
    refinfOptions = () => {
        this.tagOptionsDOMS = this.selectTagDOM.querySelectorAll('option');

    }
}
export default AddItem;