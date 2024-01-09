import axios from "axios";
import CRUDmodalVars from "./CRUDmodalVars";

class CRUDmodal {
    constructor(CRUDmodalVars, cssStyles, selector){
        //css
        this.warningBorderCSS = cssStyles.warningBorderStyle,

        //modal DOMS
        this.modalBoxDOM = CRUDmodalVars.modalBoxDOM;
        this.modalDOM = CRUDmodalVars.modalDOM;
        this.addBtnDOM = CRUDmodalVars.addBtnDOM;
        this.backBtnDOM = CRUDmodalVars.backBtnDOM;
        this.ulBoxDOM = CRUDmodalVars.ulBoxDOM;
        this.addBoxDOM = CRUDmodalVars.addBoxDOM;
        //section DOMS
        this.selector = selector;
        this.sectionDOM;
        this.sectionUlBoxDOM
        this.sectionUlDOM;
        this.sectionliDOMS;
        this.editSectionBtnDOM;
        //modal content
        this.createInputsDOMS;
        // edit delete btns doms
        this.ulDOM
        this.liDOMS;
        this.editDeleleBtnsDOMS;
        //
        this.storeActionsDOM;
        this.cancelBtnDOM;
        this.storeBtnDOM;
        
        this.liChildernDOMS;
        this.openLi = null;
        this.createdData = {};
        this.editableData = {};
        this.loadeBoxDOM;
        this.thirdAndFrourthSec;
        this.init();
    }

    init(){
        this.setSectionVariables();
        this.renderEditDeleteContent();
        this.renderCreateContent();
        this.editSectionBtnDOM.addEventListener('click', this.showModalHandler)
        this.addBtnDOM.addEventListener('click', this.nextModalHandler)
        this.backBtnDOM.addEventListener('click', this.backModalHandler)

    }
    setSectionVariables(){
        this.loadeBoxDOM = document.querySelector('.loader--box')  
        this.sectionDOM = document.querySelector(`#${this.selector}`)
        this.sectionUlBoxDOM = this.sectionDOM.querySelector('.ul--box');
        this.sectionUlDOM = this.sectionDOM.querySelector('.ul--box ul');
        this.sectionliDOMS = this.sectionUlDOM.querySelectorAll('li');
        this.editSectionBtnDOM = this.sectionDOM.querySelector('.--edit')
    }
    renderEditDeleteContent(){
        if(this.ulBoxDOM.innerHTML.trim() === ''){
            axios.get(`${eval(this.selector + 'EditRoute')}`)
            .then(res => {
                this.ulBoxDOM.innerHTML = res.data.html;
                this.setEditDeleteVariables()
                this.editDeleleBtnsDOMS.forEach(buttons => {
                    const editItemBtnDOM = buttons.querySelector('.--edit');
                    editItemBtnDOM.addEventListener('click', this.letEditItemHandler(editItemBtnDOM))

                    const deleteItemBtnDOM = buttons.querySelector('.--delete');
                    deleteItemBtnDOM.addEventListener('click', this.letDeleteItemHandler)
                });
            })
        }
    }
    renderCreateContent(){
        axios.get(`${eval(this.selector + 'CreateRoute')}`)
        .then(res => {
            this.addBoxDOM.innerHTML = res.data.html;
            this.setCreateVariables()
            // this.store()

        })
    }
    setEditDeleteVariables(){
        this.ulDOM = this.modalBoxDOM.querySelector('ul');
        this.liDOMS = this.ulDOM.querySelectorAll('li');
        this.editDeleleBtnsDOMS = this.modalBoxDOM.querySelectorAll('ul li .edit--actions')
    }
    setCreateVariables(){
            this.createInputsDOMS = this.addBoxDOM.querySelectorAll('.--form > div:not(.store--actions, .add--img), .--form input');
            this.storeActionsDOM = this.addBoxDOM.querySelector('.store--actions');
            this.cancelBtnDOM = this.storeActionsDOM.querySelector('.--cancel');
            this.storeBtnDOM = this.storeActionsDOM.querySelector('.--store');
    }

    showModalHandler = () => {
        this.modalBoxDOM.classList.add('show');
        this.modalBoxDOM.style.animation = 'open-modal-box 0.5s ease forwards';
        this.modalDOM.style.animation = 'open-modal 0.5s ease forwards';
        if(typeof this.setSpecificVariables === 'function') {
            this.setSpecificVariables();
        }
        // this.closeModal();
        this.modalBoxDOM.addEventListener('click', this.closeModalHandler)


    }
    nextModalHandler = () => {
        if(this.openLi){
            this.ulBoxDOM.scrollTop = this.openLi.offsetTop - this.openLi.offsetHeight - 10;
            this.liChildernDOMS.forEach(child => child.style.cssText = 'border-width: 2px; border-color:#ba2f47')
        }
        else{
            this.ulBoxDOM.style.display = 'none';
            this.addBoxDOM.style.display = 'grid';
            this.addBtnDOM.style.display = 'none';
            this.backBtnDOM.style.display = 'block';
            this.modalDOM.style.height = 'fit-content';
            this.modalDOM.style.marginTop = (window.innerHeight  / 2 - this.modalDOM.offsetHeight / 2) + 'px';
        }
    }
    backModalHandler = () => {
        if(this.createInputsDOMS && Array.from(this.createInputsDOMS).some(contentDOM => contentDOM.innerText !== '')){
            this.createInputsDOMS.forEach(child => child.style.cssText = 'border-width: 2px; border-color:#ba2f47')
        }
        else{            
            this.ulBoxDOM.style.display = 'block';
            this.addBoxDOM.style.display = 'none';
            this.addBtnDOM.style.display = 'block';
            this.backBtnDOM.style.display = 'none';
            this.modalDOM.style.height = '80vh';
            this.modalDOM.style.marginTop = '10vh';
        }
    }
    closeModalHandler = (e) => {
        if(e.target === this.modalBoxDOM){
            if(this.openLi){
                this.ulBoxDOM.scrollTop = this.openLi.offsetTop - this.openLi.offsetHeight - 10;
                this.liChildernDOMS.forEach(child => child.style.cssText = 'border-width: 2px; border-color:#ba2f47')

            }
            else if(this.createInputsDOMS && Array.from(this.createInputsDOMS).some(contentDOM => contentDOM.innerText !== '')){
                this.createInputsDOMS.forEach(child => child.style.cssText = 'border-width: 2px; border-color:#ba2f47')

            }
            else{
                this.modalDOM.style.animation = 'close-modal 0.5s ease forwards';
                this.modalBoxDOM.style.animation = 'close-modal-box 0.5s ease forwards';
                setTimeout(() => {
                    this.modalBoxDOM.classList.remove('show');
                }, 100)
                this.modalBoxDOM.removeEventListener('click', this.closeModalHandler)
            }
        }
    }
}

export { CRUDmodal };