import axios from "axios";
import { CRUDmodal } from "../CRUDmodal";

class ThirdAndFourthSection extends CRUDmodal{
    constructor(cssStyles, selector, updateRoute, storeRoute, deleteRoute, swiper){
        super(cssStyles, selector)
        this.selector = selector;
        this.updateRoute = updateRoute;
        this.storeRoute = storeRoute;
        this.deleteRoute = deleteRoute;
        this.swiper = swiper;
        this.maxImagesPriorities = 256;
        this.scrollToItem;
        //modal
        this.dateDOM;
        this.aboutDOM;
        this.priorityDOM;
        this.dateInnerText;
        this.aboutInnerText;
        this.priorityInnerText;
        this.dateCreateDOM;
        this.aboutCreateDOM;
        this.priorityCreateDOM;
        //modal buttons
        this.updateBtnDOM;
        this.cancelEditBtnDOM;
        this.deleteBtnDOM;
        this.cancelDeleteBtnDOM;
        this.storeBtnDOM;
        this.cancelStoreBtnDOM;

        //section
        this.sectionUlDOM;
        this.secItemDOM;
        this.secDateDOM;
        this.secAboutDOM;
    }

    borderWarningCSS(){
        super.borderWarningCSS();
        this.scrollToItem = this.openItemDOM.offsetTop - this.openItemDOM.offsetHeight - 10
    }
    // edit
    letEditItemHandler(editItemBtn, e){
        e.preventDefault();
        if(this.openItemDOM){
            console.log(this.openItemDOM)
            this.borderWarningCSS()
        }
        else{
            this.openItemDOM = editItemBtn.closest('li');
            this.setEditItemVariables();
            this.changeToEditButtons();
            this.borderOpenCSS()
            this.cancelEditBtnDOM.addEventListener('click', this.cancelEdit, {once:true})
            this.updateBtnDOM.addEventListener('click', this.update, {once:true})
        }
    }
    setEditItemVariables(){
        //modal
        this.openItemId = this.openItemDOM.id.replace(this.selector + '-edit-', '')
        this.liChildernDOMS = this.openItemDOM.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions');
        this.dateDOM = this.openItemDOM.querySelector('.--date');
        this.aboutDOM = this.openItemDOM.querySelector('.--about');
        this.priorityDOM = this.openItemDOM.querySelector('.--priority');
        this.cancelEditBtnDOM = this.openItemDOM.querySelector('.update--actions > .--cancel');
        this.updateBtnDOM = this.openItemDOM.querySelector('.update--actions > .--update');
       //section
       this.secItemDOM = document.querySelector(`#${this.selector}-${this.openItemId}`);
        this.secDateDOM = this.secItemDOM.querySelector('.--date');
        this.secAboutDOM = this.secItemDOM.querySelector('.--about');
        // save inner text for cancel
        this.dateInnerText = this.dateDOM.innerText;
        this.aboutInnerText = this.aboutDOM.innerText;
        this.priorityInnerText = this.priorityDOM.innerText;
        // make editable
        this.dateDOM.setAttribute('contenteditable', true);
        this.aboutDOM.setAttribute('contenteditable', true);
        this.priorityDOM.setAttribute('contenteditable', true);
        this.openItemDOM.classList.add('editable');
    }
    update = () => {
        this.loadeBoxDOM.style.display = 'block';
        const dateInnerText = this.dateDOM.innerText;
        const aboutInnerText = this.aboutDOM.innerText;
        const priorityInnerText = parseInt(this.priorityDOM.innerText) ? parseInt(this.priorityDOM.innerText) : null;

        const data = {date:dateInnerText,
                      about:aboutInnerText,
                      priority:priorityInnerText}
        axios.put(`${this.updateRoute}/${this.openItemId}`, {data:data})
        .then(res => {
            if(res.data.errors){
                let errorsHTML = '';
                res.data.errors.forEach(error => {
                    errorsHTML += `<div>${error}</div>`
                })
                this.showMsg(errorsHTML)
                this.updateBtnDOM.addEventListener('click', this.update, {once:true})
            }
            else if(res.data.message){
                this.cancelEditBtnDOM.removeEventListener('click', this.cancel)

                this.changePositionInSec(priorityInnerText)
                this.changePositionInModal(priorityInnerText)
                this.applyPriorityConfig();
                this.closeItemEdit()
                this.showMsg(res.data.message)
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }
    cancelEdit = () => {
        this.updateBtnDOM.removeEventListener('click', this.update)
        this.dateDOM.innerText = this.dateInnerText;
        this.aboutDOM.innerText = this.aboutInnerText;
        this.priorityDOM.innerText = this.priorityInnerText;
        this.closeItemEdit()
    }
    applyPriorityConfig(){
        this.priorityDOM.innerText = parseInt(this.priorityDOM.innerText) ? parseInt(this.priorityDOM.innerText) : 'nesvarbu';
        this.priorityDOM.style.cssText = parseInt(this.priorityDOM.innerText) ? 'color:#000; font-style:normal;': 'color:#999; font-style:italic;';
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
        this.activateItemEditDeleteBtns(this.openItemDOM)
    }
    closeItemEdit(){
        this.changeToEditButtons();
        this.removeBorderCSS();
        //remove editable
        this.openItemDOM.classList.remove('editable');
        this.dateDOM.setAttribute('contenteditable', false);
        this.aboutDOM.setAttribute('contenteditable', false);
        this.priorityDOM.setAttribute('contenteditable', false);
        //reset variables
        this.dateInnerText = '';
        this.aboutInnerText = '';
        this.priorityInnerText = '';
        this.liChildernDOMS = null;
        this.dateDOM = null;
        this.aboutDOM = null;
        this.priorityDOM = null;
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
                this.swiper.update();
                this.showMsg(res.data.message);
            }
            else {
                this.deleteBtnDOM.addEventListener('click', this.delete, {once:true})
            }
            this.loadeBoxDOM.style.display = 'none';
        })
        this.cancelDeleteBtnDOM.removeEventListener('click', this.cancelDelete);
    }
    cancelDelete = () => {
        this.changeToDeleteButtons();
        this.removeBorderCSS();

        this.deleteBtnDOM.removeEventListener('click', this.delete)
        this.openItemDOM = null;
        this.openItemId = null;
    }

    // create
    setCreateItemVariables (){
        this.dateCreateDOM = this.addBoxDOM.querySelector('.--date');
        this.aboutCreateDOM = this.addBoxDOM.querySelector('.--about');
        this.priorityCreateDOM = this.addBoxDOM.querySelector('.--priority');
        this.storeBtnDOM = this.addBoxDOM.querySelector('.store--actions .--store');
        this.cancelStoreBtnDOM = this.addBoxDOM.querySelector('.store--actions .--cancel');
        this.letCreateItem();
    }
    letCreateItem(){
        this.storeBtnDOM.addEventListener('click', () => { this.store() });
        this.cancelBtnDOM.addEventListener('click', () => { this.clearCreate() });
    }
    store (){
        this.loadeBoxDOM.style.display = 'block';
        const dateInnerText = this.dateCreateDOM.innerText;
        const aboutInnerText = this.aboutCreateDOM.innerText;
        const priorityInnerText = parseInt(this.priorityCreateDOM.innerText) ? parseInt(this.priorityCreateDOM.innerText) : null;
        const data = {date:dateInnerText,
                      about:aboutInnerText,
                      priority:priorityInnerText};
        axios.post(this.storeRoute, {data:data})
        .then(res => {
            if(res.data.errors){  
                let errorsHTML = '';
                res.data.errors.forEach(error => {
                    errorsHTML += `<div>${error}</div>`
                })
                this.showMsg(errorsHTML)
            }
            else if(res.data.message){
                this.appendEditDeleteModal(res.data.modalHTML, res.data.itemId, priorityInnerText)
                this.appendSection(res.data.sectionHTML, res.data.itemId, priorityInnerText)
                this.clearCreate();
                this.showMsg(res.data.message);
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }

    appendEditDeleteModal(modalHTML, itemId, priority){
        let li = document.createElement('li')
        li.classList.add('one-education');
        li.id = `education-edit-${itemId}`;
        li.innerHTML = modalHTML;
        li.dataset.priority = priority;
        this.insertItemInList(this.ulDOM, li)
        this.activateItemEditDeleteBtns(li)

    }
    appendSection(sectionHTML, itemId, priority){
        let li = document.createElement('li')
        li.classList.add('one-education', 'swiper-slide');
        li.id = `education-${itemId}`;
        li.dataset.priority = priority;
        li.innerHTML = sectionHTML;
        this.insertItemInList(this.sectionUlDOM, li)
    }

    clearCreate(){
        this.dateCreateDOM.innerText = '';
        this.aboutCreateDOM.innerText = '';
        this.priorityCreateDOM.innerText = '';
        this.addBoxForm.style.border = 'none';
    }
}
export { ThirdAndFourthSection };