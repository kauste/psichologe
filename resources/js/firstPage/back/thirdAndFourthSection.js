import axios from "axios";

class thirdAndFourthSectionUpdate{
    constructor(selector){
        this.selector = selector;
        this.sectionDOM;
        this.modalBoxDOM;
        this.ulBoxDOM;
        this.liDOMS;
        this.editSectionBtnDOM;
        this.editItemBtnDOMS;
        this.prevEditableData = [];
        this.openLi = false;
        this.deleteItemBtnDOMS;
        this.init();
    }
    init(){
        this.setVariables();
        this.showModal();
        this.letEditItem();

    }
    setVariables(){
        this.sectionDOM = document.querySelector(this.selector)
        this.modalBoxDOM = document.querySelector(`.--${this.sectionDOM.id}`)
        this.ulBoxDOM = this.modalBoxDOM.querySelector('.ul--box');
        this.liDOMS = this.modalBoxDOM.querySelectorAll('ul > li');
        this.editItemBtnDOMS = this.modalBoxDOM.querySelectorAll('ul li .--edit')
        this.deleteItemBtnDOMS = this.modalBoxDOM.querySelectorAll('ul li .--delete')
        this.editSectionBtnDOM = this.sectionDOM.querySelector('.--edit')

    }
    showModal(){
        this.editSectionBtnDOM.addEventListener('click', () => {
            this.modalBoxDOM.classList.add('show');
            this.closeModal();
        })
    }
    closeModal(){
        const display = (e) => {
            if(e.target === this.modalBoxDOM){
             this.modalBoxDOM.classList.remove('show');
             this.modalBoxDOM.removeEventListener('click', display)
            }
        }
        this.modalBoxDOM.addEventListener('click', display)
    }
    letEditItem(){
        this.editItemBtnDOMS.forEach(editItemBtn => {
            editItemBtn.addEventListener('click', () => {
                console.log('atidare')

                if(this.openLi){
                    this.ulBoxDOM.scrollTop = this.openLi.offsetTop - this.openLi.offsetHeight;
                    const liChildernDOMS = this.openLi.querySelectorAll(':scope > div:not(.edit--actions, .update--actions)');
                    liChildernDOMS.forEach(child => child.style.cssText = 'border-width: 2px; border-color:#ba2f47')
                }
                else{
                    this.openLi = editItemBtn.closest('li');
                    const liChildernDOMS = this.openLi.querySelectorAll(':scope > div:not(.edit--actions, .update--actions)');
                    liChildernDOMS.forEach(element => {
                            element.style.cssText = 'border-width: 1px; border-color:#333'
                            element.setAttribute('contenteditable', true);
                            this.prevEditableData.push(element.innerText);
                    })
                    const editActionsDOM = this.openLi.querySelector('.edit--actions');
                    editActionsDOM.style.display = 'none';

                    const updateActionsDOM = this.openLi.querySelector('.update--actions');
                    updateActionsDOM.style.display = 'flex'
                    console.log(this.openLi)

                    this.updateItem();
                }
            })
        }, {once:true});
    }
    updateItem(){
        const cancelBtnDOM = this.openLi.querySelector('.--cancel');
        const updateBtnDOM = this.openLi.querySelector('.--update');

        const cancel = () => {
            updateBtnDOM.removeEventListener('click', update)
            console.log(this.openLi)

            this.closeItem()
        }

        const update = () => {
                const updateRoute = eval(`${this.sectionDOM.id}UpdateRoute`);
                const liChildernDOMS = this.openLi.querySelectorAll(':scope > div:not(.edit--actions, .update--actions)');
                this.prevEditableData = []
                liChildernDOMS.forEach(element => this.prevEditableData.push(element.innerText))
                this.prevEditableData.push(this.openLi.id);
    
                axios.post(updateRoute, this.prevEditableData)
                .then(res => {
                    console.log(res.data.msg)
                    updateBtnDOM.addEventListener('click', update)
                    this.closeItem()
                })
        }

        cancelBtnDOM.addEventListener('click', cancel, {once:true})
        updateBtnDOM.addEventListener('click', update, {once:true})
    }


    closeItem(){
        let i = 0;
        console.log(this.openLi)
        for (let element of this.openLi.children) {
            if(element.classList.contains('edit--actions')){
                element.style.display = 'flex'
            }
            else if(element.classList.contains('update--actions')){
                element.style.display = 'none'
            }
            else{                  
                element.innerText = this.prevEditableData[i];
                element.setAttribute('contenteditable', false);
            }
            ++i;
         }
         this.openLi = false;
    }
}

export { thirdAndFourthSectionUpdate };