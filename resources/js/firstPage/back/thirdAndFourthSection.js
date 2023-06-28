class thirdAndFourthSectionUpdate{
    constructor(selector){
        this.selector = selector;
        this.sectionDOM;
        this.modalBoxDOM;
        this.editSectionBtnDOM;
        this.editItemBtnDOMS;
        this.deleteItemBtnDOMS;
        this.init();
    }
    init(){
        this.setVariables();
        this.showModal();
        // this.closeModal();
        this. editItem();
    }
    setVariables(){
        this.sectionDOM = document.querySelector(this.selector)
        this.modalBoxDOM = document.querySelector(`.--${this.sectionDOM.id}`)
        this.editItemBtnDOMS = this.modalBoxDOM.querySelectorAll('ul li .--edit')
        this.deleteItemBtnDOMS = this.modalBoxDOM.querySelectorAll('ul li .--delete')

        this.editSectionBtnDOM = this.sectionDOM.querySelector('.--edit')
    }
    showModal(){
        this.editSectionBtnDOM.addEventListener('click', () => {
            this.modalBoxDOM.style.display = 'block';
        })
    }
    closeModal(){
        this.modalBoxDOM.addEventListener('click', () => {
            this.modalBoxDOM.style.display = 'none';
        })
    }
    editItem(){
        this.editItemBtnDOMS.forEach(editItemBtn => {
            editItemBtn.addEventListener('click', () => {
                const liDOM = editItemBtn.closest('li');

                const editActionsDOM = liDOM.querySelector('.edit--actions');
                editActionsDOM.style.display = 'none';

                const updateActionsDOM = liDOM.querySelector('.update--actions');
                updateActionsDOM.style.display = 'flex'
                
                const liChildernDOMS = liDOM.querySelectorAll('div:not(.edit--actions, .update--actions)');
                liChildernDOMS.forEach(element => {
                    element.setAttribute('contenteditable', true);
                })
            })
        });
    }
}

export { thirdAndFourthSectionUpdate };