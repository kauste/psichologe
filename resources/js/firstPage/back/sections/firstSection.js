import { CRUDmodal } from "../CRUDmodal";
import { FileInputActivator } from "../parts/FileInputsActivator";
import Positioner from "../parts/positioner";
class FirstSection extends CRUDmodal{
    constructor(cssStyles, firstSecAnimation){
        super(cssStyles, 'profilePic')
        this.selector = 'profilePic';
        this.firstSecAnimation = firstSecAnimation;
        this.maxImagesPriorities = 256;
        this.scrollToItem;
        //section
        this.secItemDOM
        this.secImgBoxDOM;
        this.secImgDOM;
        //modal
        this.imgBoxDOM;
        this.imgDOM;
        this.priorityDOM;
        //modal buttons
        this.updateBtnDOM;
        this.cancelEditBtnDOM;
        this.deleteBtnDOM;
        this.cancelDeleteBtnDOM;
        this.storeBtnDOM;
        this.cancelStoreBtnDOM;
        //classes
        this.fileInputActivator;
        this.positioner;       
    }
    setSpecific(){
        this.positioner = new Positioner('.' + this.selector + '--img');
        this.positioner.doSetBoxesSize()
    }
    borderWarningCSS(){
        super.borderWarningCSS();
        this.scrollToItem = this.openItemDOM.offsetTop - 137
    }
    // edit
    letEditItemHandler(editItemBtn, e) {
        e.preventDefault();
        if(this.openItemDOM){
            this.borderWarningCSS()
        }
        else{
            this.openItemDOM = editItemBtn.closest('li');
            this.setEditItemVariables();
            this.changeToEditButtons();
            // this.borderOpenCSS()
            this.positioner.imgBoxDOM = this.openItemDOM.querySelector('.profilePic--img');
            this.positioner.secImgDOM = this.secImgDOM;
            this.positioner.init();
            this.cancelEditBtnDOM.addEventListener('click', this.cancelEdit, {once:true})
            this.updateBtnDOM.addEventListener('click', this.update, {once:true})
        }
    }
    setEditItemVariables(){
        //modal
        this.openItemId = this.openItemDOM.id.replace(this.selector + '-edit-', '')
        this.liChildernDOMS = this.openItemDOM.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions > .--priority, img');
        this.imgBoxDOM = this.openItemDOM.querySelector('.profilePic--img')
        this.priorityDOM = this.openItemDOM.querySelector('.--priority')
        this.cancelEditBtnDOM = this.openItemDOM.querySelector('.update--actions > .--cancel');
        this.updateBtnDOM = this.openItemDOM.querySelector('.update--actions > .--update');
        // section
        this.secImgBoxDOM = document.querySelector('#profilePic-' + this.openItemId);
        this.secImgDOM = this.secImgBoxDOM.querySelector('img')
        // make editable
        this.priorityDOM.setAttribute('contenteditable', true);
        this.openItemDOM.classList.add('editable');
    }
    update = () => {
        const objectYposition = this.positioner.returnObjectPosition();
        this.loadeBoxDOM.style.display = 'block';
        axios.put(eval(`${this.selector}UpdateRoute`), {picId:this.openItemId, objectYposition:objectYposition, priority:this.priorityDOM.innerText})
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
                this.showMsg(res.data.message)
                this.cancelEditBtnDOM.removeEventListener('click', this.cancel)

                this.changePositionInSec()
                this.closeItemEdit()
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }
    changePositionInSec(){
        const priority = parseInt(this.priorityDOM.innerText) ? parseInt(this.priorityDOM.innerText) : this.maxImagesPriorities;
        this.sectionUlDOM.removeChild(this.secImgBoxDOM);
        this.secImgBoxDOM.dataset.priority = priority;
        let afterImage = null;
        const imagesList = Array.from(this.sectionUlDOM.querySelectorAll('li'))
        for (let i = 0; i < imagesList.length; i++) {
            const li = imagesList[i];
            if (li.dataset.priority && li.dataset.priority > priority) {
                afterImage = li;
                break;
            }
        }
        if (afterImage) {
            this.sectionUlDOM.insertBefore(this.secImgBoxDOM, afterImage);
        } else {
            this.sectionUlDOM.appendChild(this.secImgBoxDOM);
        }
    }
    closeItemEdit(){
        this.changeToEditButtons();
        this.removeBorderCSS();
        this.positioner.closeStyles();
        this.openItemId = null;
        this.openItemDOM.classList.remove('editable');
        this.priorityDOM.innerText = parseInt(this.priorityDOM.innerText) ? parseInt(this.priorityDOM.innerText) : 'nesvarbu';
        this.priorityDOM.setAttribute('contenteditable', false);
        // should be last
        this.openItemDOM = null;
    }
    cancelEdit = () => {
        this.updateBtnDOM.removeEventListener('click', this.update)
        this.closeItemEdit()
    }

    // delete
    letDeleteItemHandler(e){
        if(this.openItemDOM && this.openItemDOM.id !== e.target.closest('li').id){
            this.borderWarningCSS()
        }
        else{
            this.openItemDOM = e.target.closest('li');                    
            this.changeToDeleteButtons();
            this.setDeleteItemVariables()
            this.borderOpenCSS()
            this.openItemDOM.querySelector('.profilePic--img').style.height = this.positioner.boxHeight + 'px'
            this.cancelDeleteBtnDOM.addEventListener('click', this.cancelDelete, {once:true})
            this.deleteBtnDOM.addEventListener('click', this.delete, {once:true})
        }
    }
    setDeleteItemVariables(){
        this.liChildernDOMS = this.openItemDOM.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions, .delete--actions > .--priority, img');
        this.cancelDeleteBtnDOM = this.openItemDOM.querySelector('.delete--actions > .--cancel');
        this.deleteBtnDOM = this.openItemDOM.querySelector('.delete--actions > .--delete');
        this.openItemId = this.openItemDOM.id.replace(this.selector + '-edit-', '');
        this.secItemDOM = this.sectionDOM.querySelector(`#${this.selector}-${this.openItemId}`);

    }
    delete = () => {
        this.loadeBoxDOM.style.display = 'block';
        axios.delete(eval(`${this.selector}DeleteRoute`) + '/' + this.openItemId)
        .then(res => {
            if(res.data.message){
                this.showMsg(res.data.message);
                this.sectionUlDOM.removeChild(this.secItemDOM);
                this.firstSecAnimation.animation();
                this.ulDOM.removeChild(this.openItemDOM);
                this.openItemDOM = null;
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
        const inputBoxDOM = this.addBoxDOM.querySelector('.file--input--box');
        this.storeBtnDOM = this.addBoxDOM.querySelector('.store--actions .--store');
        this.cancelStoreBtnDOM = this.addBoxDOM.querySelector('.store--actions .--cancel');
        this.fileInputActivator = new FileInputActivator(inputBoxDOM);
        this.letCreateItem();
    }
    letCreateItem() {
        this.storeBtnDOM.addEventListener('click', () => { this.store() });
        this.cancelBtnDOM.addEventListener('click', () => { this.cancelCreate() });
    }
    store (){
        this.loadeBoxDOM.style.display = 'block';
        const file = this.fileInputActivator.file;
        const objectYposition = this.fileInputActivator.getObjectPosition();
        const isRightRadioDOM = document.querySelector(".is--right--radios input[type='radio']:checked")
        const isRight = isRightRadioDOM ? isRightRadioDOM.value : 1;
        let formData = new FormData();
        formData.append('picture', file)
        formData.append('objectYposition',objectYposition)
        formData.append('is_right',isRight)

        axios.post(eval(`${this.selector}StoreRoute`), formData, {headers:{ "Content-Type": "multipart/form-data"}})
        .then(res => {
            if(res.data.errors){  
                let errorsHTML = '';
                res.data.errors.forEach(error => {
                    errorsHTML += `<div>${error}</div>`
                })
                this.showMsg(errorsHTML)
            }
            else if(res.data.message){
                this.appendEditDeleteModal(res.data.imageId, res.data.modalHTML)
                this.appendSection(res.data.imageId, res.data.sectionHTML)
                this.showMsg(res.data.message)
            }
            this.fileInputActivator.clearInput()
            this.loadeBoxDOM.style.display = 'none';
        })    
    }

    appendEditDeleteModal(imageId, modalHTML){
        let li = document.createElement('li')
        li.classList.add('one-profile-pic');
        li.id = `profilePic-edit-${imageId}`;
        li.innerHTML = modalHTML;
        const imgBox = li.querySelector('.profilePic--img')

        this.ulBoxDOM.querySelector('ul').append(li)
        this.positioner.doSetBoxSize(imgBox);
        this.activateItemEditDeleteBtns(li)
    }
    appendSection(imageId, sectionHTML){
        let li = document.createElement('li');
        li.classList.add('one-profile-pic')
        li.style.opacity = '0';
        li.id = `${this.selector}-${imageId}`
        li.innerHTML = sectionHTML;
        this.sectionUlDOM.append(li);
        this.firstSecAnimation.animation()
    }
    cancelCreate(){
        this.addBoxForm.style.border = 'none';
        this.fileInputActivator.clearInput()
    }
}
  
export default FirstSection;