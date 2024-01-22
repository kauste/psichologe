class CRUDmodal {
    constructor(cssStyles, selector){
        //css
        this.warningBorderCSS = cssStyles.warningBorderStyle,
        this.selector = selector;
        //section DOMS
        this.sectionDOM;
        this.sectionUlBoxDOM
        this.sectionUlDOM;
        this.sectionliDOMS;
        this.editSectionBtnDOM;
        //modal DOMS
        this.modalBoxDOM;
        this.modalDOM;
        this.messageDOM;
        this.h2DOM;
        this.addBtnDOM;
        this.backBtnDOM;
        this.ulBoxDOM;
        this.addBoxDOM;
        this.addBoxForm;
        this.createInputsDOMS;
        // edit delete btns DOMS
        this.ulDOM
        this.liDOMS;
        this.editDeleleBtnsDOMS;
        //store actions DOMS
        this.storeActionsDOM;
        this.cancelBtnDOM;
        this.storeBtnDOM;
        // open item
        this.openItemDOM = null;
        this.openItemId = null;
        this.liChildernDOMS;
        // dara collectors
        this.createdData = {};
        this.editableData = {};
        this.loadeBoxDOM;
        this.init();
    }

    init(){
        this.setSectionVariables();
        this.setModalVariables();
        this.setCreateVariables();
        this.setEditDeleteVariables();
        this.setCRUDListeners();
        this.setSectionListeners();
    }
    setSectionVariables(){
        this.loadeBoxDOM = document.querySelector('.loader--box');
        this.sectionDOM = document.querySelector(`#${this.selector}`);
        this.sectionUlBoxDOM = this.sectionDOM.querySelector('.ul--box');
        this.sectionUlDOM = this.sectionDOM.querySelector('.ul--box ul');
        this.sectionliDOMS = this.sectionUlDOM.querySelectorAll('li');
        this.editSectionBtnDOM = this.sectionDOM.querySelector('.--edit');
    }
    setModalVariables(){
        this.modalBoxDOM= document.querySelector(`.${this.selector}--modal--box`);
        this.modalDOM = this.modalBoxDOM.querySelector('.--modal');
        this.h2DOM = this.modalDOM.querySelector('h2');
        this.messageDOM = this.modalDOM.querySelector('.--message');
        this.addBtnDOM= this.modalDOM.querySelector('.add--btn');
        this.backBtnDOM= this.modalDOM.querySelector('.back--btn');
        this.ulBoxDOM= this.modalDOM.querySelector('.ul--box');
        this.addBoxDOM= this.modalDOM.querySelector('.add--box');
    }

    setEditDeleteVariables(){
        this.ulDOM = this.modalBoxDOM.querySelector('ul');
        this.liDOMS = this.ulDOM.querySelectorAll('li');
        this.editDeleleBtnsDOMS = this.modalBoxDOM.querySelectorAll('ul li .edit--actions')
    }
    setCreateVariables(){
            this.addBoxForm = this.addBoxDOM.querySelector('.--form');
            this.createInputsDOMS = this.addBoxDOM.querySelectorAll(".--form input[type='file'], .--form div[contenteditable='true']"); // coud not be input[type='radio']
            this.storeActionsDOM = this.addBoxDOM.querySelector('.store--actions');
            this.cancelBtnDOM = this.storeActionsDOM.querySelector('.--cancel');
            this.storeBtnDOM = this.storeActionsDOM.querySelector('.--store');
    }
    setCRUDListeners(){
        this.editSectionBtnDOM.addEventListener('click', this.showModalHandler)
        this.addBtnDOM.addEventListener('click', this.nextModalHandler)
        this.backBtnDOM.addEventListener('click', this.backModalHandler)
    }
    setSectionListeners(){
        this.editDeleleBtnsDOMS.forEach(buttons => {
          this.activateItemEditDeleteBtns(buttons)
        });
        if(typeof this.setCreateItemVariables === 'function') this.setCreateItemVariables();
    }
    activateItemEditDeleteBtns(parent){
        const editItemBtnDOM = parent.querySelector('.--edit');
        editItemBtnDOM.addEventListener('click', (e) => { this.letEditItemHandler(editItemBtnDOM, e) })
        const deleteItemBtnDOM = parent.querySelector('.--delete');
        deleteItemBtnDOM.addEventListener('click', (e) => { this.letDeleteItemHandler(e) } )
    }
    showModalHandler = () => {
        this.modalBoxDOM.classList.add('show');
        this.modalBoxDOM.style.animation = 'open-modal-box 0.5s ease forwards';
        this.modalDOM.style.animation = 'open-modal 0.5s ease forwards';
        if(typeof this.setSpecific === 'function' && !this.positioner) {
            this.setSpecific();
        }
        this.modalBoxDOM.addEventListener('click', this.closeModalHandler)


    }
    nextModalHandler = () => {
        if(this.openItemDOM){
            this.ulBoxDOM.scrollTop = this.openItemDOM.offsetTop - this.openItemDOM.oo - 10;
            this.borderWarningCSS()
        }
        else{
            this.toggleNexBackStyles();
        }
    }
    backModalHandler = () => {
        if(this.createInputsDOMS 
        && (Array.from(this.createInputsDOMS).some(contentDOM => (contentDOM && contentDOM.value !== undefined && contentDOM.value?.trim() !== ''))
            || Array.from(this.createInputsDOMS).some(contentDOM => (contentDOM && contentDOM.innerText.trim() !== '')))
        ){
            this.addBoxForm.style.border = this.warningBorderCSS;
        }
        else{    
            this.addBoxForm.style.border = 'none';
            this.toggleNexBackStyles();        
        }
    }
    closeModalHandler = (e) => {
        if(e.target === this.modalBoxDOM){
            if(this.openItemDOM){
                this.borderWarningCSS();
            }
            else  if(this.createInputsDOMS 
                && (Array.from(this.createInputsDOMS).some(contentDOM => (contentDOM && contentDOM.value !== undefined && contentDOM.value?.trim() !== ''))
                || Array.from(this.createInputsDOMS).some(contentDOM => (contentDOM && contentDOM.innerText.trim() !== '')))
            ){
                this.addBoxForm.style.border = this.warningBorderCSS;
            }
            else{
                this.addBoxForm.style.border = 'none';
                this.modalDOM.style.animation = 'close-modal 0.5s ease forwards';
                this.modalBoxDOM.style.animation = 'close-modal-box 0.5s ease forwards';
                setTimeout(() => {
                    this.modalBoxDOM.classList.remove('show');
                }, 100)
                this.modalBoxDOM.removeEventListener('click', this.closeModalHandler)
            }
        }
    }
    toggleNexBackStyles(){
        this.ulBoxDOM.style.display = this.ulBoxDOM.style.display === 'none' ? 'block' : 'none';
        this.addBoxDOM.style.display = this.addBoxDOM.style.display === 'grid' ? 'none' : 'grid';
        this.addBtnDOM.style.display = this.addBtnDOM.style.display === 'none' ? 'block' :'none';
        this.backBtnDOM.style.display = this.backBtnDOM.style.display === 'block' ? 'none' : 'block';
        this.modalDOM.style.paddingBottom = this.modalDOM.style.paddingBottom === '100px' ? '50px' : '100px';
        const createModalHeight = (window.innerHeight  / 2 - this.modalDOM.offsetHeight / 2) + 'px';
        this.modalDOM.style.marginTop = this.modalDOM.style.marginTop = createModalHeight ? '10vh' : createModalHeight;
    }

    letEditItemHandler(editItemBtn, e){ console.log('default')}
    letDeleteItemHandler(e) {console.log('default')}

    insertItemInList(ulDOM, itemToInsert){
        let afterItem = null;
        const itemsList = Array.from( ulDOM.querySelectorAll(`li`))
        for(let i = 0; i < itemsList.length; i++){
            let listItemPriority = parseInt(itemsList[i].dataset.priority) ? parseInt(itemsList[i].dataset.priority) : null;
            if (!listItemPriority || (listItemPriority && listItemPriority >= itemToInsert.dataset.priority)) {
                afterItem = itemsList[i];
                break;
            }
        }
        afterItem ? ulDOM.insertBefore(itemToInsert, afterItem) : ulDOM.appendChild(itemToInsert);
    }
    changeToEditButtons(){
        const editActionsDOM = this.openItemDOM.querySelector('.edit--actions');
        editActionsDOM.style.display = (editActionsDOM.style.display === 'none') ? 'flex' : 'none';
       
        const updateActionsDOM = this.openItemDOM.querySelector('.update--actions');
        updateActionsDOM.style.display = (updateActionsDOM.style.display === 'none') ? 'flex' : 'none';
    }
    changeToDeleteButtons(){
        const editActionsDOM = this.openItemDOM.querySelector('.edit--actions');
        editActionsDOM.style.display = editActionsDOM.style.display ==='none' ? 'flex' : 'none';
        
        const deleteActionsDOM = this.openItemDOM.querySelector('.delete--actions');
        deleteActionsDOM.style.display = deleteActionsDOM.style.display === 'flex'? 'none' : 'flex';
    }
    borderOpenCSS(){
        this.liChildernDOMS.forEach((element, i) => {
            element.style.cssText = 'border-top: 1px solid #333; border-bottom:1px solid #333;'
            if(i === 0){
                element.style.borderLeft = '1px solid #333'
            }
            else if (i === 1){
                element.style.borderRight = ' 1px solid #333'
            }
        })
    }
    borderWarningCSS(){
        this.ulBoxDOM.scrollTop = this.scrollToItem;
        this.liChildernDOMS.forEach((child, i) => {
            child.style.border = this.warningBorderCSS;
            if(i === 0) child.style.borderRight = 'none'
            if (i === 1) child.style.borderLeft = 'none';
            
        })
    }
    removeBorderCSS(){
        this.liChildernDOMS.forEach((element) => {
            element.style.border = 'none';
        })
    }
    showMsg(msgHTML){
        this.messageDOM.innerHTML = msgHTML;;
        this.messageDOM.style.display = 'block';
        setTimeout(() => {
            this.messageDOM.innerHTML = '';
            this.messageDOM.style.display = 'none';
        }, 20000)
    }

}

export { CRUDmodal };