import axios from "axios";

class CRUDmodal {
    constructor(cssStyles, selector){
        //css
        this.warningBorderCSS = cssStyles.warningBorderStyle,
        this.selector = selector;

        //modal DOMS
        this.modalBoxDOM;
        this.modalDOM;
        this.addBtnDOM;
        this.backBtnDOM;
        this.ulBoxDOM;
        this.addBoxDOM;
        this.messageDOM;
        //section DOMS
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
        this.setModalVariables();
        this.setSectionVariables();
        this.renderEditDeleteContent();
        this.renderCreateContent();
        this.editSectionBtnDOM.addEventListener('click', this.showModalHandler)
        this.addBtnDOM.addEventListener('click', this.nextModalHandler)
        this.backBtnDOM.addEventListener('click', this.backModalHandler)

    }
    setModalVariables(){
        this.modalBoxDOM= document.querySelector('.modal--box');
        this.modalDOM= this.modalBoxDOM.querySelector('.--modal');
        this.addBtnDOM= this.modalBoxDOM.querySelector('.add--btn');
        this.backBtnDOM= this.modalBoxDOM.querySelector('.back--btn');
        this.ulBoxDOM= this.modalBoxDOM.querySelector('.ul--box');
        this.addBoxDOM= this.modalBoxDOM.querySelector('.add--box');
        this.messageDOM = this.modalBoxDOM.querySelector('.--message');
    }
    setSectionVariables(){
        this.loadeBoxDOM = document.querySelector('.loader--box');
        this.sectionDOM = document.querySelector(`#${this.selector}`);
        this.sectionUlBoxDOM = this.sectionDOM.querySelector('.ul--box');
        this.sectionUlDOM = this.sectionDOM.querySelector('.ul--box ul');
        this.sectionliDOMS = this.sectionUlDOM.querySelectorAll('li');
        this.editSectionBtnDOM = this.sectionDOM.querySelector('.--edit');
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
            if(typeof this.letCreateItem === 'function') this.letCreateItem();

            // this.store()

        })
    }
    setEditDeleteVariables(){
        this.ulDOM = this.modalBoxDOM.querySelector('ul');
        this.liDOMS = this.ulDOM.querySelectorAll('li');
        this.editDeleleBtnsDOMS = this.modalBoxDOM.querySelectorAll('ul li .edit--actions')
    }
    setCreateVariables(){
            this.createInputsDOMS = this.addBoxDOM.querySelectorAll('.--form > div:not(.store--actions, .add--img, .file--input--box), .--form input');
            this.storeActionsDOM = this.addBoxDOM.querySelector('.store--actions');
            this.cancelBtnDOM = this.storeActionsDOM.querySelector('.--cancel');
            this.storeBtnDOM = this.storeActionsDOM.querySelector('.--store');
    }

    showModalHandler = () => {
        this.modalBoxDOM.classList.add('show');
        this.modalBoxDOM.style.animation = 'open-modal-box 0.5s ease forwards';
        this.modalDOM.style.animation = 'open-modal 0.5s ease forwards';
        if(typeof this.setSpecific === 'function') {
            this.setSpecific();
        }
        // this.closeModal();
        this.modalBoxDOM.addEventListener('click', this.closeModalHandler)


    }
    nextModalHandler = () => {
        if(this.openLi){
            console.log('jo')
            this.ulBoxDOM.scrollTop = this.openLi.offsetTop - this.openLi.offsetHeight - 10;
            this.liChildernDOMS.forEach(child => child.style.border = this.warningBorderCSS)
        }
        else{
            this.ulBoxDOM.style.display = 'none';
            this.addBoxDOM.style.display = 'grid';
            this.addBtnDOM.style.display = 'none';
            this.backBtnDOM.style.display = 'block';
            this.modalDOM.style.paddingBottom = '100px';
            this.modalDOM.style.marginTop = (window.innerHeight  / 2 - this.modalDOM.ffsetHeight / 2) + 'px';
        }
    }
    backModalHandler = () => {
        if(this.createInputsDOMS && Array.from(this.createInputsDOMS).some(contentDOM => contentDOM.innerText !== '')){
            console.log('ce');
            this.createInputsDOMS.forEach(child => child.style.border = this.warningBorderCSS)
        }
        else{            
            this.ulBoxDOM.style.display = 'block';
            this.addBoxDOM.style.display = 'none';
            this.addBtnDOM.style.display = 'block';
            this.backBtnDOM.style.display = 'none';
            this.modalDOM.style.paddingBottom = '50px';
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
    showMsg(msg){
        this.messageDOM.innerHTML = msg;;
        this.messageDOM.style.display = 'block';
        console.log(this.messageDOM)
        setTimeout(() => {
            this.messageDOM.innerHTML = '';
            this.messageDOM.style.display = 'none';
        }, 20000)
    }
}

export { CRUDmodal };