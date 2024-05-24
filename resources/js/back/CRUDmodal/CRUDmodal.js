import AddItem from "./parts/addItem";
import AddSelectedItem from "./parts/addSelectedItem";
import ModalMsg from "./parts/modalMsg";
import ToggleModal from "./toggleModal";

class CRUDmodal extends ToggleModal{
    constructor(cssStyles, selector, storeRoute, updateRoute, deleteRoute, swiper){
        super(selector)
        //css
        this.cssStyles = cssStyles;
        this.warningBorderCSS = cssStyles.warningBorderStyle,
        this.storeRoute = storeRoute;
        this.updateRoute = updateRoute;
        this.deleteRoute = deleteRoute;
        this.swiper = swiper;
        this.editColumns;
        //section DOMS
        this.sectionDOM;
        this.sectionUlBoxDOM
        this.sectionUlDOM;
        this.sectionliDOMS;
        this.editSectionBtnDOM;
        //modal DOMS
        this.addBtnDOM;
        this.backBtnDOM;
        this.ulBoxDOM;
        this.addBoxDOM;
        this.addBoxForm;
        this.createInputsDOMS;
        // create DOMS
        this.createVarsDOMS;
        this.createSelectedListDOMS;
        this.createAddedListDOMS;
        this.createPriorityDOM;
        this.cancelBtnDOM;
        this.storeBtnDOM;
        this.createSelectItemOBJS = [];
        this.editAddedItemOBJS = [];
        // edit delete DOMS
        this.ulDOM
        this.liDOMS;
        this.editDeleleBtnsDOMS;
        // open item
        this.openItemDOM = null;
        this.openItemId = null;
        this.liChildernDOMS;
        this.secItemDOM;
        this.itemInnerHTML;
        //edit
        this.editVarsDOMS;
        this.editSelectedListDOMS;
        this.editAddedListDOMS;
        this.editPriorityDOM;
        this.initialPriority;
        this.cancelEditBtnDOM;
        this.updateBtnDOM;
        this.editSelectItemOBJS = [];
        // delete
        this.cancelDeleteBtnDOM;
        this.deleteBtnDOM;
        // dara collectors
        this.createdData = {};
        this.editableData = {};
        this.loadeBoxDOM;
        this.msgObj;
        this.init();
    }

    init(){
        super.init();
        this.setSectionVariables();
        this.setModalVariables();
        this.setCreateVariables();
        this.letCreateItem();
        this.setEditDeleteVariables();
        this.setModalListeners();
        this.setSectionListeners();
    }
    setSectionVariables(){
        this.loadeBoxDOM = document.querySelector('.loader--box');
        this.sectionDOM = document.querySelector(`#${this.selector}`);
        this.sectionUlBoxDOM = this.sectionDOM.querySelector('.items--parent');
        this.sectionUlDOM = this.sectionDOM.querySelector('.items--parent ul');
        this.sectionliDOMS = this.sectionUlDOM.querySelectorAll('li');
        this.editSectionBtnDOM = this.sectionDOM.querySelector('.--edit');
    }
    // setModalVariables(){
    //     this.msgObj = new ModalMsg(this.modalDOM)
    //     this.addBtnDOM= this.modalDOM.querySelector('.add--btn');
    //     this.backBtnDOM= this.modalDOM.querySelector('.back--btn');
    //     this.ulBoxDOM = this.modalDOM.querySelector('.items--parent');
    //     this.addBoxDOM = this.modalDOM.querySelector('.add--box');
    // }
    // toggleNexBackStyles(){
    //     this.ulBoxDOM.style.display = this.ulBoxDOM.style.display === 'none' ? 'block' : 'none';
    //     this.addBoxDOM.style.display = this.addBoxDOM.style.display === 'grid' ? 'none' : 'grid';
    //     this.addBtnDOM.style.display = this.addBtnDOM.style.display === 'none' ? 'block' :'none';
    //     this.backBtnDOM.style.display = this.backBtnDOM.style.display === 'block' ? 'none' : 'block';
    //     this.modalDOM.style.paddingBottom = this.modalDOM.style.paddingBottom === '100px' ? '50px' : '100px';
    //     const createModalHeight = (window.innerHeight  / 2 - this.modalDOM.offsetHeight / 2) + 'px';
    //     this.modalDOM.style.marginTop = this.modalDOM.style.marginTop = createModalHeight ? '10vh' : createModalHeight;
    // }
    
    // setModalListeners(){
    //     this.editSectionBtnDOM.addEventListener('click', this.showModalHandler)
    //     if(this.addBtnDOM) this.addBtnDOM.addEventListener('click', this.nextModalHandler)
    //     if(this.backBtnDOM) this.backBtnDOM.addEventListener('click', this.backModalHandler)
    // }
    // nextModalHandler = () => {
    //     if(this.openItemDOM){
    //         this.ulBoxDOM.scrollTop = this.openItemDOM.offsetTop - this.openItemDOM.oo - 10;
    //         this.borderWarningCSS()
    //     }
    //     else{
    //         this.toggleNexBackStyles();
    //     }
    // }
    // backModalHandler = () => {
    //     if(this.createInputsDOMS 
    //     && (Array.from(this.createInputsDOMS).some(contentDOM => (contentDOM && contentDOM.value !== undefined && contentDOM.value?.trim() !== ''))
    //         || Array.from(this.createInputsDOMS).some(contentDOM => (contentDOM && contentDOM.innerText.trim() !== '')))
    //     ){
    //         this.addBoxForm.style.border = this.warningBorderCSS;
    //     }
    //     else{    
    //         this.addBoxForm.style.border = 'none';
    //         this.toggleNexBackStyles();        
    //     }
    // }
    // IN ONE CHILD CLASS I NEED TO CHECK FEW THINGS BEFORE OPENING
    // closeModalHandler = (e) => {
    //     if(e.target === this.modalBoxDOM){
    //         if(this.openItemDOM){
    //             this.borderWarningCSS();
    //         }
    //         else  if(this.createInputsDOMS 
    //             && (Array.from(this.createInputsDOMS).some(contentDOM => (contentDOM && contentDOM.value !== undefined && contentDOM.value?.trim() !== ''))
    //             || Array.from(this.createInputsDOMS).some(contentDOM => (contentDOM && contentDOM.innerText.trim() !== '')))
    //         ){
    //             this.addBoxForm.style.border = this.warningBorderCSS;
    //         }
    //         else{
    //             this.addBoxForm.style.border = 'none';
    //             this.parentCloseModalHandler(e);
    //         }
    //     }
    // }
    // setSectionListeners(){
    //     this.editDeleleBtnsDOMS.forEach(buttons => { 
    //       this.activateItemEditDeleteBtns(buttons)
    //     });
    //     if(typeof this.setCreateItemVariables === 'function') this.setCreateItemVariables();
    // }
    // activateItemEditDeleteBtns(parent){
    //     const editItemBtnDOM = parent.querySelector('.--edit');
    //     editItemBtnDOM.addEventListener('click', (e) => { this.letEditItemHandler(editItemBtnDOM, e) })
    //     const deleteItemBtnDOM = parent.querySelector('.--delete');
    //     deleteItemBtnDOM.addEventListener('click', (e) => { this.letDeleteItemHandler(e) } )
    // }

    // insertItemInList(ulDOM, itemToInsert){
    //     const itemPriority = itemToInsert.dataset.priority && !isNaN(itemToInsert.dataset.priority)? parseInt(itemToInsert.dataset.priority) : null;
    //     let afterItem = null;
    //     const itemsList = Array.from( ulDOM.querySelectorAll(`:scope > li`))

    //     if(itemPriority && itemPriority > 0){
    //         for(let i = 0; i < itemsList.length; i++){
    //             let listItemPriority = parseInt(itemsList[i].dataset.priority) ? parseInt(itemsList[i].dataset.priority) : null;
    //             if (!listItemPriority || (listItemPriority && listItemPriority >= itemToInsert.dataset.priority)) {
    //                 afterItem = itemsList[i];
    //                 break;
    //             }
    //         }
    //     }
    //     (afterItem || itemPriority === 0) ? ulDOM.insertBefore(itemToInsert, afterItem) : ulDOM.appendChild(itemToInsert);
    // }
    // changeToEditButtons(){
    //     const editActionsDOM = this.openItemDOM.querySelector('.edit--actions');
    //     editActionsDOM.style.display = (editActionsDOM.style.display === 'none') ? 'flex' : 'none';

    //     const updateActionsDOM = this.openItemDOM.querySelector('.update--actions');
    //     updateActionsDOM.style.display = (updateActionsDOM.style.display === 'none') ? 'flex' : 'none';
    // }
    // changeToDeleteButtons(){
    //     const editActionsDOM = this.openItemDOM.querySelector('.edit--actions');
    //     editActionsDOM.style.display = editActionsDOM.style.display ==='none' ? 'flex' : 'none';
        
    //     const deleteActionsDOM = this.openItemDOM.querySelector('.delete--actions');
    //     deleteActionsDOM.style.display = deleteActionsDOM.style.display === 'flex'? 'none' : 'flex';
    // }
    // borderOpenCSS(){
    //     this.liChildernDOMS.forEach((element, i) => {
    //         element.style.borderTop = '1px solid #333';
    //         element.style.borderBottom = '1px solid #333';
    //         element.style.borderRight = '1px solid #333';
    //         if(i === 0){
    //             element.style.borderLeft = '1px solid #333'
    //         }
    //     })
    // }
    // borderWarningCSS(){
    //     this.ulBoxDOM.scrollTop = this.openItemDOM.offsetTop - this.openItemDOM.offsetHeight - 30;
    //     this.liChildernDOMS.forEach((child, i) => {
    //         child.style.border = this.warningBorderCSS;
    //         if ( i !== this.liChildernDOMS.length -1) child.style.borderRight = 'none';            
    //     })
    // }
    // removeBorderCSS(){
    //     this.liChildernDOMS.forEach((element) => {
    //         element.style.border = 'none';
    //     })
    // }
    // create
    setCreateVariables(){
        this.addBoxForm = this.addBoxDOM.querySelector('.--form');
        this.createInputsDOMS = this.addBoxDOM.querySelectorAll(".--form input[type='file'], .--form div[contenteditable='true']"); // coud not be input[type='radio']
        this.createVarsDOMS = this.addBoxDOM.querySelectorAll('.--var');
        this.createSelectedListDOMS = this.addBoxDOM.querySelectorAll('.selected--list');
        this.createAddedListDOMS = this.addBoxDOM.querySelectorAll('.added--list');

        this.createPriorityDOM = this.addBoxDOM.querySelector('.--priority');
        this.cancelBtnDOM = this.addBoxDOM.querySelector('.store--actions .--cancel');
        this.storeBtnDOM = this.addBoxDOM.querySelector('.store--actions .--store');
}
    // letCreateItem(){
    //     this.storeBtnDOM.addEventListener('click', () => { this.store() });
    //     this.cancelBtnDOM.addEventListener('click', () => { this.clearCreate() });
    //     if(this.createSelectedListDOMS && this.createSelectedListDOMS.length > 0){
    //         Array.from(this.createSelectedListDOMS).forEach(createListVarDOM => {
    //             const createAddItem = new AddSelectedItem(createListVarDOM);
    //            createAddItem.saveOptionsHTML();
    //            this.createSelectItemOBJS.push(createAddItem);
    //         })
    //     }
    //     if(this.createAddedListDOMS && this.createAddedListDOMS.length > 0){
    //         Array.from(this.createAddedListDOMS).forEach(createListVarDOM => {
    //             new AddItem(createListVarDOM);
    //         })
    //     }
    // }
    store (){
        this.loadeBoxDOM.style.display = 'block';
        let data = {};
        this.createVarsDOMS.forEach(varDOM => {
                data[varDOM.dataset.name] = varDOM.innerText;
        })
        let priority = null;
        if(this.createPriorityDOM){
            priority = parseInt(this.createPriorityDOM.innerText) ? parseInt(this.createPriorityDOM.innerText) : null;
            data['priority'] = priority;
        }
        if(this.createSelectedListDOMS && this.createSelectedListDOMS.length > 0){
            this.createSelectedListDOMS.forEach(createListVarsDOM => {
                const name = createListVarsDOM.dataset.name;
                const listItems = createListVarsDOM.querySelectorAll('li')
                const items = [];
                listItems.forEach(item => {
                    items.push(item.querySelector('.--value').innerText);
                })
                data[name] = items;
            })
        }
        if(this.createAddedListDOMS && this.createAddedListDOMS.length > 0){
            Array.from(this.createAddedListDOMS).forEach(createListVarsDOM => {
                const name = createListVarsDOM.dataset.name;
                const listItems = createListVarsDOM.querySelectorAll('li')
                const items = [];
                listItems.forEach(item => {
                    items.push(item.querySelector('.--value').innerText);
                })
                data[name] = items;
            })
        }
        axios.post(this.storeRoute, {data:data})
        .then(res => {
            if(res.data.errors){  
                let errorsHTML = '';
                res.data.errors.forEach(error => {
                    errorsHTML += `<div>${error}</div>`
                })
                this.msgObj.showMsg(errorsHTML)
            }
            else if(res.data.message){
                this.appendEditDeleteModal(res.data.modalHTML, res.data.itemId, priority)
                this.appendSection(res.data.sectionHTML, res.data.itemId, priority)
                this.clearCreate();
                this.msgObj.showMsg(res.data.message);
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }
    clearCreate(){
        if(this.createVarsDOMS && this.createVarsDOMS.length > 0){
            this.createVarsDOMS.forEach(varDOM => {
                varDOM.innerText = '';
            })
        }
        if(this.createPriorityDOM){
            this.createPriorityDOM.innerText = '';
        }
        if(this.createSelectedListDOMS && this.createSelectedListDOMS.length > 0){
            this.createSelectedListDOMS.forEach(createListVarsDOM => {
                createListVarsDOM.innerText = '';
            })
            this.createSelectItemOBJS.forEach(createAddItemOBJ => {
                createAddItemOBJ.fullOptions()
            })
        }

        if(this.createAddedListDOMS && this.createAddedListDOMS.length > 0){
            Array.from(this.createAddedListDOMS).forEach(createListVarsDOM => {
                createListVarsDOM.innerHTML = null;
            })
        }
        this.createSelectItemOBJS = [];
        this.addBoxForm.style.border = 'none';
    }
    appendEditDeleteModal(modalHTML, itemId, priority){
        let li = document.createElement('li')
        li.classList.add(`one-${this.selector}`);
        li.id = `${this.selector}-edit-${itemId}`;
        if(priority) li.dataset.priority = priority;
        li.innerHTML = modalHTML;
        this.insertItemInList(this.ulDOM, li)
        this.activateItemEditDeleteBtns(li)
    }
    appendSection(sectionHTML, itemId, priority){
        let li = document.createElement('li')
        li.classList.add(`one-${this.selector}`);
        li.id = `${this.selector}-${itemId}`;
        if(priority) li.dataset.priority = priority;
        li.innerHTML = sectionHTML;
        this.insertItemInList(this.sectionUlDOM, li)
        if(this.swiper){
            li.classList.add('swiper-slide');
            this.swiper.update();
        }
    }
    // edit
    setEditDeleteVariables(){
        this.ulDOM = this.modalBoxDOM.querySelector('ul');
        this.liDOMS = this.ulDOM.querySelectorAll('li');
        this.editDeleleBtnsDOMS = this.modalBoxDOM.querySelectorAll('ul li .edit--actions')
    }
    letEditItemHandler(editItemBtn, e){
        e.preventDefault();
        if(this.openItemDOM){
            this.borderWarningCSS()
        }
        else{
            this.openItemDOM = editItemBtn.closest('li');
            this.setEditItem();
            this.changeToEditButtons();
            this.borderOpenCSS()
            this.cancelEditBtnDOM.addEventListener('click', this.cancelEdit, {once:true})
            this.updateBtnDOM.addEventListener('click', this.update, {once:true})
        }
    }
    setEditItem(){
        this.setEditVariables();
        this.makeEditable();
    }
    setEditVariables(){
        this.openItemId = this.openItemDOM.id.replace(this.selector + '-edit-', '')
        this.liChildernDOMS = this.openItemDOM.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions');
        this.editVarsDOMS = this.openItemDOM.querySelectorAll('.--var');
        this.editSelectedListDOMS = this.openItemDOM.querySelectorAll('.selected--list');
        this.editAddedListDOMS = this.openItemDOM.querySelectorAll('.added--list');
        this.editPriorityDOM = this.openItemDOM.querySelector('.--priority');
        this.initialPriority = this.editPriorityDOM && parseInt(this.editPriorityDOM.innerText) ? parseInt(this.editPriorityDOM.innerText) : null;

        this.cancelEditBtnDOM = this.openItemDOM.querySelector('.update--actions > .--cancel');
        this.updateBtnDOM = this.openItemDOM.querySelector('.update--actions > .--update');
        this.secItemDOM = document.querySelector(`#${this.selector}-${this.openItemId}`);
        this.itemInnerHTML = this.openItemDOM.innerHTML;

    }
    makeEditable(){
        this.editVarsDOMS.forEach(editVar => {
            editVar.setAttribute('contenteditable', true);
        });
        if(this.editPriorityDOM) this.editPriorityDOM.setAttribute('contenteditable', true);
        if(this.editSelectedListDOMS && this.editSelectedListDOMS.length > 0){
            Array.from(this.editSelectedListDOMS).forEach(editListVarDOM => {
                const editAddItem = new AddSelectedItem(editListVarDOM);
                editAddItem.toggleEditStyle();
                editAddItem.letDeleteItems();
                this.editSelectItemOBJS.push(editAddItem);

            })
        }
        if(this.editAddedListDOMS && this.editAddedListDOMS.length > 0){
            Array.from(this.editAddedListDOMS).forEach(editListVarDOM => {
                const addItemOBJ = new AddItem(editListVarDOM);
                addItemOBJ.toggleEditStyle();
                addItemOBJ.letDeleteItems();
                this.editAddedItemOBJS.push(addItemOBJ);
            })
        }
        this.openItemDOM.classList.add('editable');

    }
    update = () => {
        this.loadeBoxDOM.style.display = 'block';
        const data = {};
        this.editVarsDOMS.forEach(varDOM => {
                data[varDOM.dataset.name] = varDOM.innerText;
        })
        let priority = null;
        if(this.editPriorityDOM){
            priority = parseInt(this.editPriorityDOM.innerText) ? parseInt(this.editPriorityDOM.innerText) : null;
            data['priority'] = priority;
        }
        if(this.editSelectedListDOMS && this.editSelectedListDOMS.length > 0){
            this.editSelectedListDOMS.forEach(editListVarsDOM => {
                const name = editListVarsDOM.dataset.name;
                const listItems = editListVarsDOM.querySelectorAll('li')
                const items = [];
                listItems.forEach(item => {
                    items.push(item.querySelector('.--value').innerText);
                })
                data[name] = items;
            })
        }
        if(this.editAddedListDOMS && this.editAddedListDOMS.length > 0){
            this.editAddedListDOMS.forEach(editListVarsDOM => {
                const name = editListVarsDOM.dataset.name;
                const listItems = editListVarsDOM.querySelectorAll('li')
                const items = [];
                listItems.forEach(item => {
                    items.push(item.querySelector('.--value').innerText);
                })
                data[name] = items;
            })
        }

        axios.put(`${this.updateRoute}/${this.openItemId}`, {data:data})
        .then(res => {
            if(res.data.errors){
                let errorsHTML = '';
                res.data.errors.forEach(error => {
                    errorsHTML += `<div>${error}</div>`
                })
                this.msgObj.showMsg(errorsHTML)
                this.updateBtnDOM.addEventListener('click', this.update, {once:true})
            }
            else if(res.data.message){
                this.cancelEditBtnDOM.removeEventListener('click', this.cancel)
                this.updateSection(data);
                if(this.editPriorityDOM && this.initialPriority !== data.priority){
                    this.changePositionInSec(data.priority)
                    this.changePositionInModal(data.priority)
                }
                this.changeToEditButtons();
                this.closeItemEdit()
                this.msgObj.showMsg(res.data.message)
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }
    updateSection(data){
        const variablesDOMS = this.secItemDOM.querySelectorAll('.--var');
        variablesDOMS.forEach(variableDOM => {
            variableDOM.innerText = data[variableDOM.dataset.name];
        })

    }
    changePositionInSec(priority){
        this.sectionUlDOM.removeChild(this.secItemDOM);
        this.secItemDOM.dataset.priority = priority;
        this.insertItemInList(this.sectionUlDOM, this.secItemDOM)

    }
    changePositionInModal(priority){
        this.ulDOM.removeChild(this.openItemDOM)
        this.openItemDOM.dataset.priority = priority;
        this.insertItemInList(this.ulDOM, this.openItemDOM)
        this.editPriorityDOM.innerText = parseInt(this.editPriorityDOM.innerText) ? parseInt(this.editPriorityDOM.innerText) : 'nesvarbu';
        this.editPriorityDOM.style.cssText = parseInt(this.editPriorityDOM.innerText) ? 'color:#000; font-style:normal;': 'color:#999; font-style:italic;';
    }
    cancelEdit = () => {
        this.updateBtnDOM.removeEventListener('click', this.update)
        this.openItemDOM.innerHTML = this.itemInnerHTML;
        this.activateItemEditDeleteBtns(this.openItemDOM)
        this.closeItemEdit()
    }
    closeItemEdit(){
        this.removeBorderCSS();
        //remove editable
        this.openItemDOM.classList.remove('editable');
        this.editVarsDOMS.forEach(editVar => {
            editVar.setAttribute('contenteditable', false);
        });
        this.editVarsDOMS = null;
        if(this.editPriorityDOM) {
            this.editPriorityDOM.setAttribute('contenteditable', false);
            this.editPriorityDOM = null;
            this.initialPriority = null;
        }
        if(this.editSelectedListDOMS && this.editSelectedListDOMS.length > 0){
            this.editSelectItemOBJS.forEach(editSelectItemsOBJ => {
                editSelectItemsOBJ.toggleEditStyle();
            })
            this.editSelectItemOBJS = [];
            this.editSelectedListDOMS = null;

        }
        if(this.editAddedListDOMS && this.editAddedListDOMS.length > 0){
            this.editAddedItemOBJS.forEach(editAddItemsOBJ => {
                editAddItemsOBJ.toggleEditStyle();
            })
            this.editAddedItemOBJS = [];
            this.editAddedListDOMS = null;
        }
        //reset variables
        this.itemInnerHTML - null;
        this.liChildernDOMS = null;
        // should be last
        this.openItemId = null;
        this.openItemDOM = null;
    }
    // delete
    letDeleteItemHandler = (e) => {
        if(this.openItemDOM){
            this.borderWarningCSS()
        }
        else{
            this.openItemDOM = e.target.closest('li');                    
            this.changeToDeleteButtons();
            this.setDeleteItemVariables()
            this.borderOpenCSS()
            this.cancelDeleteBtnDOM.addEventListener('click', this.cancelDelete, {once:true})
            this.deleteBtnDOM.addEventListener('click', this.delete, {once:true})
        }
    }
    setDeleteItemVariables(){
        this.openItemId = this.openItemDOM.id.replace(this.selector + '-edit-', '')
        this.liChildernDOMS = this.openItemDOM.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions');
        this.cancelDeleteBtnDOM = this.openItemDOM.querySelector('.delete--actions > .--cancel');
        this.deleteBtnDOM = this.openItemDOM.querySelector('.delete--actions > .--delete');
        this.secItemDOM = this.sectionDOM.querySelector(`#${this.selector}-${this.openItemId}`);
    }

    delete = () => {
        this.loadeBoxDOM.style.display = 'block';
        axios.delete(`${this.deleteRoute}/${this.openItemId}`)
        .then(res => {
            if(res.data.message){
                this.sectionUlDOM.removeChild(this.secItemDOM);
                this.ulDOM.removeChild(this.openItemDOM);
                this.openItemDOM = null;
                this.openItemId = null;
                if(this.swiper){
                    this.swiper.update();
                }
                this.msgObj.showMsg(res.data.message);
            }
            else {
                this.deleteBtnDOM.addEventListener('click', this.delete, {once:true})
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }
    cancelDelete = () => {
        this.changeToDeleteButtons();
        this.removeBorderCSS();

        this.deleteBtnDOM.removeEventListener('click', this.delete)
        this.openItemDOM = null;
        this.openItemId = null;
    }


}

export { CRUDmodal };