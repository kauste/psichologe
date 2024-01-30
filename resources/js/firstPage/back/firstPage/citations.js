import { CRUDmodal } from "../CRUDmodal";

class Citations extends CRUDmodal{
    constructor(cssStyles, selector, updateRoute, storeRoute, deleteRoute){
        super(cssStyles, selector)
        this.updateRoute = updateRoute;
        this.storeRoute = storeRoute;
        this.deleteRoute = deleteRoute;
        this.citationDOM;
        this.authorDOM;
        this.secCitationDOM;
        this.secAuthorDOM;
        this.citationInnerText;
        this.authorInnerText;

    }
    borderWarningCSS(){
        super.borderWarningCSS();
        this.scrollToItem = this.openItemDOM.offsetTop - this.openItemDOM.offsetHeight - 10
    }
    letEditItemHandler(editItemBtn, e){
        e.preventDefault();
        if(this.openItemDOM){
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
        
        this.citationDOM = this.openItemDOM.querySelector('.--citation');
        this.authorDOM = this.openItemDOM.querySelector('.--author');
        this.cancelEditBtnDOM = this.openItemDOM.querySelector('.update--actions > .--cancel');
        this.updateBtnDOM = this.openItemDOM.querySelector('.update--actions > .--update');
        //section
        this.secItemDOM = document.querySelector(`#${this.selector}-${this.openItemId}`);
        this.secCitationDOM = this.secItemDOM.querySelector('.--citation');
        this.secAuthorDOM = this.secItemDOM.querySelector('.--author');
        // save inner text for cancel
        this.citationInnerText = this.citationDOM.innerText;
        this.authorInnerText = this.authorDOM.innerText;
        // make editable
        this.citationDOM.setAttribute('contenteditable', true);
        this.authorDOM.setAttribute('contenteditable', true);
        this.openItemDOM.classList.add('editable');
    }
    update = () => {
        this.loadeBoxDOM.style.display = 'block';
        const citationInnerText = this.citationDOM.innerText;
        const authorInnerText = this.authorDOM.innerText === '' ? null : this.authorDOM.innerText;

        const data = {citation:citationInnerText,
                      author:authorInnerText}
                      console.log(`${this.updateRoute}/${this.openItemId}`)
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
                this.closeItemEdit()
                this.showMsg(res.data.message)
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }
    cancelEdit = () => {
        this.updateBtnDOM.removeEventListener('click', this.update)
        this.citationDOM.innerText = this.citationInnerText;
        this.authorDOM.innerText = this.authorInnerText;
        this.closeItemEdit()
    }
    closeItemEdit(){
        this.changeToEditButtons();
        this.removeBorderCSS();
        //remove editable
        this.openItemDOM.classList.remove('editable');
        this.citationDOM.setAttribute('contenteditable', false);
        this.authorDOM.setAttribute('contenteditable', false);
        //reset variables
        this.citationInnerText = '';
        this.authorInnerText = '';
        this.liChildernDOMS = null;
        this.citationDOM = null;
        this.authorInnerText = null;
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
}
export default Citations;