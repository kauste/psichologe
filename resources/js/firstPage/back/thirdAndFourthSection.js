import { CRUDmodal } from "./CRUDmodal";

class ThirdAndFourthSection extends CRUDmodal{
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
                        case element.classList.contains(`--date`):
                        element.innerText = this.editableData[`${this.selector}-date`];
                        break;
                        case element.classList.contains(`--about`):
                        element.innerText = this.editableData[`${this.selector}-about`];
                        break;
                        case element.classList.contains(`--priority`):
                        element.innerText = this.editableData[`${this.selector}-priority`];
                        break;
                    }
                })
                const openLiId = this.openLi.id.replace(this.selector + '-edit-', '')
                const changedLiDOM = Array.from(this.sectionliDOMS).filter(child => child.id.replace(this.selector + '-', '') === openLiId)[0];
                const changedLiItemsDOMS = changedLiDOM.querySelectorAll('div');

                changedLiItemsDOMS.forEach(element => {
                    switch(true){
                        case element.classList.contains(`${this.selector}--date`):
                        element.innerText = this.editableData[`${this.selector}-date`];
                        break;
                        case element.classList.contains(`${this.selector}--about`):
                        element.innerText = this.editableData[`${this.selector}-about`];
                        break;
                    }
                })                          
                element.setAttribute('contenteditable', false);
            }
            ++i;
         }
         this.openLi = null;
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
                                case element.classList.contains(`--date`):
                                this.editableData[`${this.selector}-date`] = element.innerText;
                                break;
                                case element.classList.contains(`--about`):
                                this.editableData[`${this.selector}-about`] = element.innerText;
                                break;
                                case element.classList.contains(`--priority`):
                                this.editableData[`${this.selector}-priority`] = element.innerText;
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
                    case element.classList.contains(`${this.selector}--date`):
                    element.innerText = this.editableData[`${this.selector}-date`];
                    break;
                    case element.classList.contains(`${this.selector}--about`):
                        element.innerText = this.editableData[`${this.selector}-about`];
                    break;
                    case element.classList.contains(`${this.selector}--priority`):
                    element.innerText = this.editableData[`${this.selector}-priority`];
                    break;
                }
            })
            updateBtnDOM.removeEventListener('click', update)
            this.closeItem()
        }

        const update = () => {
                const updateRoute = eval(`${this.selector}UpdateRoute`);
                this.liChildernDOMS.forEach(element => {
                    switch(true){
                        case element.classList.contains(`${this.selector}--date`):
                        this.editableData[`${this.selector}-date`] = element.innerText;
                        break;
                        case element.classList.contains(`${this.selector}--about`):
                        this.editableData[`${this.selector}-about`] = element.innerText;
                        break;
                        case element.classList.contains(`${this.selector}--priority`):
                        this.editableData[`${this.selector}-priority`] = element.innerText;
                        break;
                    }
                })
                const openLiId = this.openLi.id.replace(this.selector + '-edit-', '')
                this.loadeBoxDOM.style.display = 'block';
                axios.put(updateRoute + '/' + openLiId, this.editableData)
                .then(res => {
                    console.log(res.data.msg)
                    this.closeItem()
                    cancelBtnDOM.removeEventListener('click', cancel)

                    this.loadeBoxDOM.style.display = 'none';
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
            const openLiId = this.openLi.id.replace(this.selector + '-edit-', '')
            this.loadeBoxDOM.style.display = 'block';
            axios.delete(eval(`${this.selector}DeleteRoute`) + '/' + openLiId)
            .then(res => {
                const sectionLidDOM = this.sectionDOM.querySelector(`#${this.selector}-${openLiId}`)
                this.sectionUlDOM.removeChild(sectionLidDOM)
                this.ulDOM.removeChild(this.openLi)
                this.openLi = null;
                this.loadeBoxDOM.style.display = 'none';
            })
            cancelBtnDOM.removeEventListener('click', cancel)
        }
        deleteBtnDOM.addEventListener('click', doDelete, {once:true})

    }
    store(){
        this.storeBtnDOM.addEventListener('click', () => {
            this.contentDOMS.forEach(contentDOM => {
                switch(true){
                    case contentDOM.classList.contains(`${this.selector}--date`):
                        this.createdData[`${this.selector}-date`] = contentDOM.innerText;
                        break;
                    case contentDOM.classList.contains(`${this.selector}--about`):
                        this.createdData[`${this.selector}-about`] = contentDOM.innerText;
                        break;  
                    case contentDOM.classList.contains(`${this.selector}--priority`):
                        this.createdData[`${this.selector}-priority`] = contentDOM.innerText;
                        break;
                }
            })
            const priority = parseInt(this.createdData[`${this.selector}-priority`]);
            const newDataHTML = `   <li class="one-${this.selector}" id="${this.selector}-edit-${this.liDOMS.length}">
                                        <div class="date ${this.selector}--date">${this.createdData[`${this.selector}-date`]}</div>
                                        <div class="about ${this.selector}--about">${this.createdData[`${this.selector}-about`]}</div>
                                        <div class="position ${this.selector}--priority ${priority > 0 ? '' : 'small'}">${priority > 0 ? priority : 'nesvarbu'}</div>
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
            const sectionDataHTML = `<li class="one-${this.selector}" id="${this.selector}-${this.liDOMS.length}}">
                                        <div class="date ${this.selector}--date">${this.createdData[`${this.selector}-date`]}</div>
                                        <div class="about-edu ${this.selector}--about">${this.createdData[`${this.selector}-about`]}</div>
                                    </li>`

            this.loadeBoxDOM.style.display = 'block';
            axios.post(eval(`${this.selector}StoreRoute`), this.createdData)
            .then(res => {
                this.ulDOM.innerHTML = newDataHTML + this.ulDOM.innerHTML;
                this.ulDOM.replaceWith(this.ulDOM.cloneNode(true));
                this.sectionUlDOM.innerHTML = sectionDataHTML + this.sectionUlDOM.innerHTML;
                this.sectionUlDOM.replaceWith(this.sectionUlDOM.cloneNode(true));
                this.addBoxDOM.replaceWith(this.addBoxDOM.cloneNode(true))
                this.init()
                this.contentDOMS.forEach(contentDOM => contentDOM.innerText = '')
                this.loadeBoxDOM.style.display = 'none';
                this.contentDOMS.forEach(child => child.style.cssText = 'border-width: 1px; border-color:#333')

                console.log(res.data.msg)
            })
        })
        this.cancelBtnDOM.addEventListener('click', () => {
            this.contentDOMS.forEach(contentDOM => contentDOM.innerText = '')
            this.contentDOMS.forEach(child => child.style.cssText = 'border-width: 1px; border-color:#333')

        })

    }
}
export { ThirdAndFourthSection }