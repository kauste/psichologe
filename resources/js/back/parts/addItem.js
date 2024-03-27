class AddItem{
    constructor(listDOM){
        this.listDOM = listDOM;
        this.inputBoxDOM;
        this.inputDOM;
        this.parentDOM;
        this.buttonDOM;
        this.newId = 0;
        //edit
        this.deleteItemDOMS;
        this.itemsDOMS;

        this.init()
    }
    init(){
        this.parentDOM = this.listDOM.closest('.list--box');
        this.inputBoxDOM = this.parentDOM.querySelector('.input--box');
        this.inputDOM = this.parentDOM.querySelector('input');
        this.buttonDOM = this.parentDOM.querySelector('.--button');
        this.buttonDOM.addEventListener('click', this.addItemHandler);

    }
    addItemHandler = () => {
        let li = document.createElement('li');
        li.dataset.itemId = `new-${++this.newId}`;
        li.style.paddingBottom = '5px';
        li.innerHTML = `<div class="svg-box delete-svg-box delete--item" style="display:flex">
                            <svg class="delete-svg">
                                <use xlink:href="#delete"></use>
                            </svg>
                        </div>
                        <div class="--value">${this.inputDOM.value}</div>`;
        this.listDOM.appendChild(li);
        this.inputDOM.value = '';
        const newDeleteBtnDOM = li.querySelector('.delete--item');
        // //add listeners
        newDeleteBtnDOM.addEventListener('click', this.deleteItemHandler(newDeleteBtnDOM))
    }

    toggleEditStyle(){
        this.deleteItemDOMS = this.listDOM.querySelectorAll('.delete--item');
        this.inputBoxDOM.style.display = this.inputBoxDOM.style.display === 'none' ? 'flex' : 'none';
        this.deleteItemDOMS.forEach(deleteDOM => {
            deleteDOM.style.display = deleteDOM.style.display === 'flex' ? 'none' : 'flex';
            const item = deleteDOM.closest('li');
            item.style.paddingBottom = item.style.paddingBottom === '0px' ? '5px' : '0px';
        });
        this.listDOM.style.padding = this.listDOM.style.padding === '0px' ? '5px' : '0px';
    }
    letDeleteItems(){
        this.deleteItemDOMS.forEach(deleteDOM => {
            this.letDeleteItem(deleteDOM.closest('li'));
        })

    }
    letDeleteItem(li){
        const newDeleteSvgDOM = li.querySelector('.delete--item');
        newDeleteSvgDOM.addEventListener('click', this.deleteItemHandler(newDeleteSvgDOM), {once:true})      
    }
    deleteItemHandler =  (deleteBtnDOM) => () => {
        // const id = deleteBtnDOM.closest('li').dataset.itemId;
        // this.usedServiceTypes = this.usedServiceTypes.filter((serviceTypeId) => serviceTypeId != id)
        // Object.keys(this.newServiceTypes).forEach(key => {
        //     if(id === key){
        //         delete this.newServiceTypes[key]
        //         return;
        //     }
        // })
        const item = deleteBtnDOM.closest('li');
        this.listDOM.removeChild(item)
    }
}
export default AddItem;