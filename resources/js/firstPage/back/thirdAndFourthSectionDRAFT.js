import axios from "axios";

class thirdAndFourthSectionUpdate{
    constructor(selector){
        this.selector = selector;
        this.sectionDOM;
        this.sectionUlDOM;
        this.sectionliDOMS;
        this.modalBoxDOM;
        this.modalDOM;
        this.ulBoxDOM;
        this.ulDOM
        this.liDOMS;
        this.editSectionBtnDOM;
        this.editItemBtnDOMS;
        // this.editableData = [];
        this.liChildernDOMS;
        this.editableData = {};
        this.openLi = null;
        this.deleteItemBtnDOMS;
        this.init();
    }
    init(){
        this.setVariables();
        this.showModal();
        this.letEditItem();
        this.letDeleteItem();

    }
    setVariables(){
        this.liID =
        this.sectionDOM = document.querySelector(this.selector)
        this.sectionUlDOM = this.sectionDOM.querySelector('.ul--box ul');
        this.sectionliDOMS = this.sectionUlDOM.querySelectorAll('li');
        this.modalBoxDOM = document.querySelector(`.--${this.sectionDOM.id}`)
        this.modalDOM = this.modalBoxDOM.querySelector(`.--modal`)
        this.ulBoxDOM = this.modalBoxDOM.querySelector('.ul--box');
        this.ulDOM = this.modalBoxDOM.querySelector('ul');
        this.liDOMS = this.ulDOM.querySelectorAll('li');
        this.editItemBtnDOMS = this.modalBoxDOM.querySelectorAll('ul li .--edit')
        this.deleteItemBtnDOMS = this.modalBoxDOM.querySelectorAll('ul li .--delete')
        this.editSectionBtnDOM = this.sectionDOM.querySelector('.--edit')
        this.editableData = {}
        
    }
    showModal(){
        this.editSectionBtnDOM.addEventListener('click', () => {
            this.modalBoxDOM.classList.add('show');
            this.modalDOM.style.animation = 'open-modal 0.5s ease forwards';
            this.modalBoxDOM.style.animation = 'open-modal-box 0.5s ease forwards';
            this.closeModal();
        })
    }

    closeModal(){
        const display = (e) => {
            if(e.target === this.modalBoxDOM){
            this.modalDOM.style.animation = 'close-modal 0.5s ease forwards';
            this.modalBoxDOM.style.animation = 'close-modal-box 0.5s ease forwards';

                setTimeout(() => {
                    this.modalBoxDOM.classList.remove('show');
                }, 100)
             this.modalBoxDOM.removeEventListener('click', display)
            }
        }
        this.modalBoxDOM.addEventListener('click', display)
    }

    letEditItem(){
        this.editItemBtnDOMS.forEach(editItemBtn => {
            editItemBtn.addEventListener('click', () => {
                if(this.openLi){
                    this.ulBoxDOM.scrollTop = this.openLi.offsetTop - this.openLi.offsetHeight - 10;
                    this.liChildernDOMS.forEach(child => child.style.cssText = 'border-width: 2px; border-color:#ba2f47')
                }
                else{
                    this.openLi = editItemBtn.closest('li');
                    this.liChildernDOMS = this.openLi.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions)');
                    this.liChildernDOMS.forEach(element => {
                            element.style.cssText = 'border-width: 1px; border-color:#333'
                            element.setAttribute('contenteditable', true);
                            switch(true){
                                case element.classList.contains(`${this.sectionDOM.id}--date`):
                                this.editableData[`${this.sectionDOM.id}-date`] = element.innerText;
                                break;
                                case element.classList.contains(`${this.sectionDOM.id}--about`):
                                this.editableData[`${this.sectionDOM.id}-about`] = element.innerText;
                                break;
                                case element.classList.contains(`${this.sectionDOM.id}--priority`):
                                this.editableData[`${this.sectionDOM.id}-priority`] = element.innerText;
                                break;
                            }
                    })
                    const editActionsDOM = this.openLi.querySelector('.edit--actions');
                    editActionsDOM.style.display = 'none';

                    const updateActionsDOM = this.openLi.querySelector('.update--actions');
                    updateActionsDOM.style.display = 'flex'

                    this.updateItem();
                }
            })
        }, {once:true});
    }
    updateItem(){
        const cancelBtnDOM = this.openLi.querySelector('.update--actions > .--cancel');
        const updateBtnDOM = this.openLi.querySelector('.update--actions > .--update');

        const cancel = () => {
            this.liChildernDOMS.forEach((element) => {
                switch(true){
                    case element.classList.contains(`${this.sectionDOM.id}--date`):
                    element.innerText = this.editableData[`${this.sectionDOM.id}-date`];
                    break;
                    case element.classList.contains(`${this.sectionDOM.id}--about`):
                        element.innerText = this.editableData[`${this.sectionDOM.id}-about`];
                    break;
                    case element.classList.contains(`${this.sectionDOM.id}--priority`):
                    element.innerText = this.editableData[`${this.sectionDOM.id}-priority`];
                    break;
                }
            })
            updateBtnDOM.removeEventListener('click', update)
            this.closeItem()
        }

        const update = () => {
                const updateRoute = eval(`${this.sectionDOM.id}UpdateRoute`);

                this.liChildernDOMS.forEach(element => {
                    switch(true){
                        case element.classList.contains(`${this.sectionDOM.id}--date`):
                        this.editableData[`${this.sectionDOM.id}-date`] = element.innerText;
                        break;
                        case element.classList.contains(`${this.sectionDOM.id}--about`):
                        this.editableData[`${this.sectionDOM.id}-about`] = element.innerText;
                        break;
                        case element.classList.contains(`${this.sectionDOM.id}--priority`):
                        this.editableData[`${this.sectionDOM.id}-priority`] = element.innerText;
                        break;
                    }
                })
                const openLiId = this.openLi.id.replace(this.sectionDOM.id + '-edit-', '')
                axios.put(updateRoute + '/' + openLiId, this.editableData)
                .then(res => {
                    console.log(res.data.msg)
                    this.closeItem()
                    updateBtnDOM.addEventListener('click', update)
                })
        }

        cancelBtnDOM.addEventListener('click', cancel, {once:true})
        updateBtnDOM.addEventListener('click', update, {once:true})
    }

    letDeleteItem(){
        this.deleteItemBtnDOMS.forEach(deleteItemBtn => {
            deleteItemBtn.addEventListener('click', (e) => {
                if(this.openLi && this.openLi.id !== e.target.closest('li').id){
                    this.ulBoxDOM.scrollTop = this.openLi.offsetTop - this.openLi.offsetHeight - 10;
                    this.liChildernDOMS.forEach((child, i) => {
                        child.style.cssText = 'border-top: 2px solid #ba2f47; border-bottom: 2px solid #ba2f47';
                        if(i === 0){
                            child.style.borderLeft = '2px solid #ba2f47'
                        }
                        else if (i === this.liChildernDOMS.length - 1){
                            child.style.borderRight = ' 2px solid #ba2f47'
                        }
                    })
                }
                else{
                    this.openLi = deleteItemBtn.closest('li');                    
                    this.liChildernDOMS = this.openLi.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions)');
                    this.liChildernDOMS.forEach((element, i) => {
                        element.style.cssText = 'border-top: 1px solid #333; border-bottom:1px solid #333;'
                        if(i === 0){
                            element.style.borderLeft = '1px solid #333'
                        }
                        else if (i === this.liChildernDOMS.length - 1){
                            element.style.borderRight = ' 1px solid #333'
                        }
                    })
                    const editActionsDOM = this.openLi.querySelector('.edit--actions');

                    editActionsDOM.style.display = 'none';

                    const deleteActionsDOM = this.openLi.querySelector('.delete--actions');
                    deleteActionsDOM.style.display = 'flex'

                    this.deleteItem();
                }
            })
        }, {once:true});
    }
    deleteItem(){
        const cancelBtnDOM = this.openLi.querySelector('.delete--actions > .--cancel');

        const deleteBtnDOM = this.openLi.querySelector('.delete--actions > .--delete');

        const cancel = () => {
            this.liChildernDOMS = this.openLi.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions)');
            this.liChildernDOMS.forEach((element) => {
                element.style.border = 'none'
            })
            const editActionsDOM = this.openLi.querySelector('.edit--actions');
            editActionsDOM.style.display = 'flex';
            const deleteActionsDOM = this.openLi.querySelector('.delete--actions');
            deleteActionsDOM.style.display = 'none'
            this.openLi = null;
            deleteBtnDOM.removeEventListener('click', doDelete)

        }
        cancelBtnDOM.addEventListener('click', cancel, {once:true})

        const doDelete = () => {
            const openLiId = this.openLi.id.replace(this.sectionDOM.id + '-edit-', '')
            axios.delete(eval(`${this.sectionDOM.id}DeleteRoute`) + '/' + openLiId)
            .then(res => {
                const sectionLidDOM = this.sectionDOM.querySelector(`#${this.sectionDOM.id}-${openLiId}`)

                this.sectionUlDOM.removeChild(sectionLidDOM)
                this.ulDOM.removeChild(this.openLi)
                this.openLi = null;
            })
            cancelBtnDOM.removeEventListener('click', cancel)
        }
        deleteBtnDOM.addEventListener('click', doDelete, {once:true})

    }

    closeItem(){
        let i = 0;
        for (let element of this.openLi.children) {
            if(element.classList.contains('edit--actions')){
                element.style.display = 'flex'
            }
            else if(element.classList.contains('update--actions')){
                element.style.display = 'none'
            }
            else if(element.classList.contains('delete--actions')){
                element.style.display = 'none'
            }
            else{
                this.liChildernDOMS.forEach(element => {
                    switch(true){
                        case element.classList.contains(`${this.sectionDOM.id}--date`):
                        element.innerText = this.editableData[`${this.sectionDOM.id}-date`];
                        break;
                        case element.classList.contains(`${this.sectionDOM.id}--about`):
                        element.innerText = this.editableData[`${this.sectionDOM.id}-about`];
                        break;
                        case element.classList.contains(`${this.sectionDOM.id}--priority`):
                        element.innerText = this.editableData[`${this.sectionDOM.id}-priority`];
                        break;
                    }
                })
                const openLiId = this.openLi.id.replace(this.sectionDOM.id + '-edit-', '')
                const changedLiDOM = Array.from(this.sectionliDOMS).filter(child => child.id.replace(this.sectionDOM.id + '-', '') === openLiId)[0];
                const changedLiItemsDOMS = changedLiDOM.querySelectorAll('div');

                changedLiItemsDOMS.forEach(element => {
                    switch(true){
                        case element.classList.contains(`${this.sectionDOM.id}--date`):
                        element.innerText = this.editableData[`${this.sectionDOM.id}-date`];
                        break;
                        case element.classList.contains(`${this.sectionDOM.id}--about`):
                        element.innerText = this.editableData[`${this.sectionDOM.id}-about`];
                        break;
                    }
                })                          
                element.setAttribute('contenteditable', false);
            }
            ++i;
         }
         this.openLi = null;
    }
}

class thirdAndFourthSectionAdd{
    constructor(selector){
        this.selector = selector;
        this.sectionDOM;
        this.sectionUlDOM;
        this.addBtnDOM;
        this.backBtnDOM;
        this.modalBoxDOM;
        this.modalDOM;
        this.ulBoxDOM;
        this.ulDOM
        this.liDOMS;
        this.addBoxDOM;
        this.updateActionsDOM;
        this.cancelBtnDOM;
        this.storeBtnDOM;
        this.createdData = {};
        this.init();
    }
    init(){
        this.setVariables()
        this.letCreate()
        this.store()
        this.back()
    }
    setVariables(){
        this.sectionDOM = document.querySelector(this.selector);
        this.sectionUlDOM = this.sectionDOM.querySelector('.ul--box ul');

        this.modalBoxDOM = document.querySelector(`.--${this.sectionDOM.id}`);
        this.modalDOM = this.modalBoxDOM.querySelector('.--modal');
        this.addBtnDOM = this.modalBoxDOM.querySelector('.add--btn');
        this.backBtnDOM = this.modalBoxDOM.querySelector('.back--btn');
        this.ulBoxDOM = this.modalBoxDOM.querySelector('.ul--box');
        this.ulDOM = this.ulBoxDOM.querySelector('ul');
        this.liDOMS = this.ulDOM.querySelectorAll('li');
        this.addBoxDOM = this.modalBoxDOM.querySelector('.add--box');
        this.updateActionsDOM = this.addBoxDOM.querySelector('.update--actions');
        this.cancelBtnDOM = this.updateActionsDOM.querySelector('.--cancel');
        this.storeBtnDOM = this.updateActionsDOM.querySelector('.--store');
    }
    letCreate(){
        this.addBtnDOM.addEventListener('click', () => {
            this.ulBoxDOM.style.display = 'none';
            this.addBoxDOM.style.display = 'grid';
            this.addBtnDOM.style.display = 'none';
            this.backBtnDOM.style.display = 'block';
            this.modalDOM.style.height = 'fit-content';
            this.modalDOM.style.marginTop = (window.innerHeight  / 2 - this.modalDOM.offsetHeight/ 2).toString() + 'px';

        })
    }
    back(){
        this.backBtnDOM.addEventListener('click', () => {
            this.ulBoxDOM.style.display = 'block';
            this.addBoxDOM.style.display = 'none';
            this.addBtnDOM.style.display = 'block';
            this.backBtnDOM.style.display = 'none';
            this.modalDOM.style.height = '80vh';
            this.modalDOM.style.marginTop = '10vh';
        })
    }
    store(){
        this.storeBtnDOM.addEventListener('click', () => {
            const createInputsDOMS = this.addBoxDOM.querySelectorAll(':scope > .--form > div:not(.update--actions)');
            createInputsDOMS.forEach(contentDOM => {
                switch(true){
                    case contentDOM.classList.contains(`${this.sectionDOM.id}--date`):
                        this.createdData[`${this.sectionDOM.id}-date`] = contentDOM.innerText;
                        break;
                    case contentDOM.classList.contains(`${this.sectionDOM.id}--about`):
                        this.createdData[`${this.sectionDOM.id}-about`] = contentDOM.innerText;
                        break;  
                    case contentDOM.classList.contains(`${this.sectionDOM.id}--priority`):
                        this.createdData[`${this.sectionDOM.id}-priority`] = contentDOM.innerText;
                        break;
                }
            })
            const priority = parseInt(this.createdData[`${this.sectionDOM.id}-priority`]);
            const newDataHTML = `   <li class="one-education" id="education-edit-${this.liDOMS.length}}">
                                        <div class="date education--date">${this.createdData[`${this.sectionDOM.id}-date`]}</div>
                                        <div class="about education--about">${this.createdData[`${this.sectionDOM.id}-about`]}</div>
                                        <div class="position education--priority ${priority > 0 ? '' : 'small'}">${priority > 0 ? priority : 'nesvarbu'}</div>
                                        <div class="edit--actions edit-actions">
                                            <div class="svg-box --edit">
                                                <svg class="edit-svg">
                                                    <use xlink:href="#edit"></use>
                                                </svg>
                                            </div>
                                            <div class="svg-box --delete">
                                                <svg class="delete-svg">
                                                    <use xlink:href="#delete"></use>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="update-actions update--actions">
                                            <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                                            <button class="update-btn --update" type="button">Redaguoti</button>
                                        </div>
                                        <div class="delete-actions delete--actions">
                                            <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                                            <button class="delete-btn --delete" type="button">Ištrinti</button>
                                        </div>
                                    </li> `
            const sectionDataHTML = `<li class="one-education" id="education-${this.liDOMS.length}}">
                                        <div class="date education--date">${this.createdData[`${this.sectionDOM.id}-date`]}</div>
                                        <div class="about-edu education--about">${this.createdData[`${this.sectionDOM.id}-about`]}</div>
                                    </li>`


            axios.post(educationCreateRoute, this.createdData)
            .then(res => {
                this.ulDOM.innerHTML = newDataHTML + this.ulDOM.innerHTML;
                this. setVariables()
                console.log(res.data.msg)
            })
        })
    }

}
export { thirdAndFourthSectionUpdate, thirdAndFourthSectionAdd };