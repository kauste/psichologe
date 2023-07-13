import axios from "axios";

class CRUDmodal{
    constructor(selector){
        this.selector = selector;
        this.sectionDOM;
        this.sectionUlBoxDOM
        this.sectionUlDOM;
        this.sectionliDOMS;
        this.modalBoxDOM;
        this.addBtnDOM;
        this.addBoxDOM;
        this.contentDOMS;
        this.storeActionsDOM;
        this.cancelBtnDOM;
        this.storeBtnDOM;
        this.backBtnDOM;
        this.modalDOM;
        this.ulBoxDOM;
        this.ulDOM
        this.liDOMS;
        this.editSectionBtnDOM;
        this.editItemBtnDOMS;
        this.liChildernDOMS;
        this.editableData = {};
        this.createdData = {};
        this.openLi = null;
        this.deleteItemBtnDOMS;
        this.loadeBoxDOM;
        this.thirdAndFrourthSec;
        this.init();
    }

    init(){
        this.setSectionVariables();
        this.setModalVariables();
    }
    setSectionVariables(){
        this.loadeBoxDOM = document.querySelector('.loader--box')  
        this.sectionDOM = document.querySelector(`#${this.selector}`)
        this.sectionUlBoxDOM = this.sectionDOM.querySelector('.ul--box');
        this.sectionUlDOM = this.sectionDOM.querySelector('.ul--box ul');
        this.sectionliDOMS = this.sectionUlDOM.querySelectorAll('li');

    }
    setModalVariables(){
        this.modalBoxDOM = document.querySelector('.modal--box')
        this.addBtnDOM = this.modalBoxDOM.querySelector('.add--btn');
        this.backBtnDOM = this.modalBoxDOM.querySelector('.back--btn');
        this.ulBoxDOM = this.modalBoxDOM.querySelector('.ul--box');
        this.addBoxDOM = this.modalBoxDOM.querySelector('.add--box');
        this.editSectionBtnDOM = this.sectionDOM.querySelector('.--edit')
        this.showModal();

    }

    setEditVariables(){
        axios.get(`${eval(this.selector + 'EditRoute')}`)
        .then(res => {
            console.log(`${eval(this.selector + 'EditRoute')}`)
            this.ulBoxDOM.innerHTML = res.data.html;
            this.modalDOM = this.modalBoxDOM.querySelector(`.--modal`)
            this.modalDOM.style.animation = 'open-modal 0.5s ease forwards';

            this.ulDOM = this.modalBoxDOM.querySelector('ul');
            this.liDOMS = this.ulDOM.querySelectorAll('li');
            this.editItemBtnDOMS = this.modalBoxDOM.querySelectorAll('ul li .--edit')
            this.deleteItemBtnDOMS = this.modalBoxDOM.querySelectorAll('ul li .--delete')
            
            this.letEditItem();
            this.letDeleteItem();
            this.setCreateVariables()

            // this.showModal()
        })
    }
    setCreateVariables(){
        axios.get(`${eval(this.selector + 'CreateRoute')}`)
        .then(res => {
            this.addBoxDOM.innerHTML = res.data.html;
            this.contentDOMS = this.addBoxDOM.querySelectorAll('.--form > div:not(.store--actions, .add--img), .form input');
            this.storeActionsDOM = this.addBoxDOM.querySelector('.store--actions');
            this.cancelBtnDOM = this.storeActionsDOM.querySelector('.--cancel');
            this.storeBtnDOM = this.storeActionsDOM.querySelector('.--store');
            this.letCreate()
            this.back()
            // this.store()
            this.closeModal();


        })
    }
    showModal(){
        this.editSectionBtnDOM.addEventListener('click', () => {
            this.setEditVariables()
            this.modalBoxDOM.classList.add('show');
            this.modalBoxDOM.style.animation = 'open-modal-box 0.5s ease forwards';

        })
    }

    closeModal(){

        const display = (e) => {
            if(e.target === this.modalBoxDOM){
                if(this.openLi){
                    this.ulBoxDOM.scrollTop = this.openLi.offsetTop - this.openLi.offsetHeight - 10;
                    this.liChildernDOMS.forEach(child => child.style.cssText = 'border-width: 2px; border-color:#ba2f47')
    
                }
                else if(this.contentDOMS && Array.from(this.contentDOMS).some(contentDOM => contentDOM.innerText !== '')){
                    this.contentDOMS.forEach(child => child.style.cssText = 'border-width: 2px; border-color:#ba2f47')
    
                }
                else{
                    this.modalDOM.style.animation = 'close-modal 0.5s ease forwards';
                    this.modalBoxDOM.style.animation = 'close-modal-box 0.5s ease forwards';
                    setTimeout(() => {
                        this.modalBoxDOM.classList.remove('show');
                    }, 100)
                    this.modalBoxDOM.removeEventListener('click', display)
                }
            }
        }
        this.modalBoxDOM.addEventListener('click', display)
        
    }
    letCreate(){
        this.addBtnDOM.addEventListener('click', () => {
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
        })
    }
    back(){
        this.backBtnDOM.addEventListener('click', () => {
            if(this.contentDOMS && Array.from(this.contentDOMS).some(contentDOM => contentDOM.innerText !== '')){
                this.contentDOMS.forEach(child => child.style.cssText = 'border-width: 2px; border-color:#ba2f47')
            }
            else{            
                this.ulBoxDOM.style.display = 'block';
                this.addBoxDOM.style.display = 'none';
                this.addBtnDOM.style.display = 'block';
                this.backBtnDOM.style.display = 'none';
                this.modalDOM.style.height = '80vh';
                this.modalDOM.style.marginTop = '10vh';
            }

        })
    }
}

export { CRUDmodal };