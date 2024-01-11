import { CRUDmodal } from "./CRUDmodal";
import { FileInputActivator } from "./FileInputsActivator";

class FirstSection extends CRUDmodal{
    constructor(cssStyles){
        super(cssStyles, 'profilePic')
        this.selector = 'profilePic';
        this.openLiId;
        this.secImgDOM;
        this.imgsBoxesDOMS;
        this.imgBoxDOM;
        this.imgDOM;
        this.updateBtnDOM;
        this.cancelEditBtnDOM;
        this.deleteBtnDOM;
        this.cancelDeleteBtnDOM;
        this.priority;
        this.prevPicPos;
        this.boxHeight;
        this.imgHeight
        this.marginHeight;
        this.additionalHeight;
        this.objectYposition;
    }

    setSpecificVariables(){
        this.imgsBoxesDOMS = document.querySelectorAll('.profilePic--img');
        const imgsWidth = this.imgsBoxesDOMS[0].querySelector('img').clientWidth;
        const secHeight = window.innerHeight;
        const screenWith = parseInt(window.screen.width);
        this.boxHeight = secHeight * imgsWidth / screenWith;
        this.imgsBoxesDOMS.forEach(imgBoxDOM => {
            console.log(this.boxHeight);
            imgBoxDOM.style.height = this.boxHeight + 'px';
        });
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
    removeBorderCSS(){
        this.liChildernDOMS.forEach((element) => {
            element.style.border = 'none';
        })
    }
    borderWarningCSS(){
        this.ulBoxDOM.scrollTop = this.openLi.offsetTop - 137;
        this.liChildernDOMS.forEach((child, i) => {
            child.style.border = this.warningBorderCSS;
            if(i === 0) child.style.borderRight = 'none'
            if (i === 1) child.style.borderLeft = 'none';
            
        })
    }
    // let edit
    letEditItemHandler = (editItemBtn) => (e) => {
        e.preventDefault();
        if(this.openLi){
            this.borderWarningCSS()
        }
        else{
            this.openLi = editItemBtn.closest('li');
            this.setEditItemsDOMS();
            this.borderOpenCSS()
            this.changeToEditButtons();
            this.setEditItemVariables();
            this.setElementConfig();
            this.letDrag();

            this.cancelEditBtnDOM.addEventListener('click', this.cancelEdit, {once:true})
            this.updateBtnDOM.addEventListener('click', this.update, {once:true})
        }
    }
    setEditItemsDOMS(){
        this.liChildernDOMS = this.openLi.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions > .--priority, img');
        this.imgBoxDOM = this.openLi.querySelector('.profilePic--img')
        this.priority = this.openLi.querySelector('.--priority')
        this.cancelEditBtnDOM = this.openLi.querySelector('.update--actions > .--cancel');
        this.updateBtnDOM = this.openLi.querySelector('.update--actions > .--update');
    }
    setEditItemVariables(){
        this.openLiId = this.openLi.id.replace(this.selector + '-edit-', '')
        this.imgDOM = this.imgBoxDOM.querySelector('img')
        this.imgDOM.style.height = 'auto';
        this.imgHeight = this.imgDOM.offsetHeight;
        this.additionalHeight = this.imgHeight - this.boxHeight;
        const objectPos = this.imgDOM.style.objectPosition.trim();
        this.objectYposition =  parseInt(objectPos.substr(objectPos.indexOf(' ') + 1).replace('%', ''))
        this.marginHeight = this.additionalHeight - (this.boxHeight  / 100 * this.objectYposition);
        this.marginHeight = ((100 - this.objectYposition) * this.additionalHeight ) / 100 ;
    }
    setElementConfig(){
        this.secImgDOM = document.querySelector('#profilePic-' + this.openLiId + '> img')
        this.priority.setAttribute('contenteditable', true);
        this.imgBoxDOM.style.height = this.imgHeight + this.additionalHeight + 'px'
        this.imgBoxDOM.style.setProperty('--borderHeight', this.additionalHeight + 'px');
        this.imgBoxDOM.style.setProperty('--marginHeight', this.marginHeight + 'px');
        this.openLi.classList.add('editable');
        this.imgDOM.style.objectPosition = '0px 0px';
    }
    letDrag(){
        this.imgDOM.setAttribute('drabable', true);

        this.imgDOM.addEventListener('dragstart', (e) => {
            this.prevPicPos = e.clientY;
        })
        this.imgDOM.addEventListener('dragover', (e) => {
            e.preventDefault();
            if((this.marginHeight + e.clientY - this.prevPicPos) > this.additionalHeight){
                 this.marginHeight = this.additionalHeight;
            }
            else if((this.marginHeight + e.clientY - this.prevPicPos) < 0){
                this.marginHeight = 0;
            }
            else{
                this.marginHeight += (e.clientY - this.prevPicPos);
            }
            this.imgBoxDOM.style.setProperty('--marginHeight', this.marginHeight + 'px');
            this.prevPicPos = e.clientY;
        })
        
        this.imgDOM.addEventListener('dragend', (e) => {
            e.preventDefault();
        })

    }
    changeToEditButtons(){
        const editActionsDOM = this.openLi.querySelector('.edit--actions');
        editActionsDOM.style.display = (editActionsDOM.style.display === 'none') ? 'flex' : 'none';
       
        const updateActionsDOM = this.openLi.querySelector('.update--actions');
        updateActionsDOM.style.display = (updateActionsDOM.style.display === 'none') ? 'flex' : 'none';
    }


    // close/update edit
    closeItemConfig(){
        this.openLiId = null;
        this.openLi.classList.remove('editable');
        this.imgDOM.style.height = '100%';
        this.priority.setAttribute('contenteditable', false);
        this.imgBoxDOM.style.height = this.boxHeight + 'px'
        this.imgBoxDOM.style.setProperty('--borderHeight', 0);
        this.imgBoxDOM.style.setProperty('--marginHeight', 0);
        this.imgDOM.style.objectPosition = '0px ' + this.objectYposition + '%';
        this.secImgDOM.style.objectPosition = '0px ' + this.objectYposition + '%';
        this.priority.style.border = 'none';
        this.imgBoxDOM.style.outline = 'none';
    }
    closeItemEdit(){
        this.closeItemConfig()
        this.changeToEditButtons();
        this.removeBorderCSS();
        // should be last
        this.openLi = null;
    }

    cancelEdit = () => {
        this.updateBtnDOM.removeEventListener('click', this.update)
        this.closeItemEdit()
    }
    update = () => {
        this.objectYposition = parseFloat(100 - (100  / this.additionalHeight * this.marginHeight)).toFixed(2);
        this.loadeBoxDOM.style.display = 'block';
        axios.put(eval(`${this.selector}UpdateRoute`), {picId:this.openLiId, objectYposition:this.objectYposition})
        .then(res => {
            this.cancelEditBtnDOM.removeEventListener('click', this.cancel)
            this.closeItemEdit()
            this.loadeBoxDOM.style.display = 'none';
        })

            // this.liChildernDOMS.forEach(element => {
            //     switch(true){
            //         case element.classList.contains(`${this.selector}--date`):
            //         this.editableData[`${this.selector}-date`] = element.innerText;
            //         break;
            //         case element.classList.contains(`${this.selector}--about`):
            //         this.editableData[`${this.selector}-about`] = element.innerText;
            //         break;
            //         case element.classList.contains(`${this.selector}--priority`):
            //         this.editableData[`${this.selector}-priority`] = element.innerText;
            //         break;
            //     }
            // })


    }
    // delete
    letDeleteItemHandler = (e) => {
        if(this.openLi && this.openLi.id !== e.target.closest('li').id){
            this.borderWarningCSS()
        }
        else{
            this.openLi = e.target.closest('li');                    
            this.changeToDeleteButtons();
            this.setDeleteItemsDOMS()
            this.borderOpenCSS()
            this.cancelDeleteBtnDOM.addEventListener('click', this.cancelDeleteItem, {once:true})
            this.deleteBtnDOM.addEventListener('click', this.deleteItem, {once:true})
        }
    }
    changeToDeleteButtons(){
        const editActionsDOM = this.openLi.querySelector('.edit--actions');
        editActionsDOM.style.display = editActionsDOM.style.display ==='none' ? 'flex' : 'none';
        
        const deleteActionsDOM = this.openLi.querySelector('.delete--actions');
        deleteActionsDOM.style.display = deleteActionsDOM.style.display === 'flex'? 'none' : 'flex';
    }
    setDeleteItemsDOMS(){
        this.liChildernDOMS = this.openLi.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions, .delete--actions > .--priority, img');
        this.cancelDeleteBtnDOM = this.openLi.querySelector('.delete--actions > .--cancel');
        this.deleteBtnDOM = this.openLi.querySelector('.delete--actions > .--delete');
    }
    cancelDeleteItem = () => {
        this.changeToDeleteButtons();
        this.removeBorderCSS();

        this.deleteBtnDOM.removeEventListener('click', this.deleteItem)
        this.openLi = null;
        
    }
    deleteItem = () => {
        const openLiId = this.openLi.id.replace(this.selector + '-edit-', '')
        this.loadeBoxDOM.style.display = 'block';
        axios.delete(eval(`${this.selector}DeleteRoute`) + '/' + openLiId)
        .then(_ => {
            const sectionLidDOM = this.sectionDOM.querySelector(`#${this.selector}-${openLiId}`)
            this.sectionUlDOM.removeChild(sectionLidDOM)
            this.ulDOM.removeChild(this.openLi)
            this.openLi = null;
            this.loadeBoxDOM.style.display = 'none';
        })
        this.cancelDeleteBtnDOM.removeEventListener('click', this.cancelDeleteItem)
    }
    // create
    letCreateItem = () => {
        const inputBoxDOM = document.querySelector('.file--input--box');
        new FileInputActivator(inputBoxDOM);
    }
    store(){
        this.storeBtnDOM.addEventListener('click', () => {
            this.createInputsDOMS.forEach(contentDOM => {
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
                this.createInputsDOMS.forEach(contentDOM => contentDOM.innerText = '')
                this.loadeBoxDOM.style.display = 'none';
                this.createInputsDOMS.forEach(child => child.style.cssText = 'border-width: 1px; border-color:#333')

                console.log(res.data.msg)
            })
        })
        this.cancelBtnDOM.addEventListener('click', () => {
            this.createInputsDOMS.forEach(contentDOM => contentDOM.innerText = '')
            this.createInputsDOMS.forEach(child => child.style.cssText = 'border-width: 1px; border-color:#333')

        })

    }
}

class FirstSecAnimation{
    constructor(){
      this.visibleChild = 1;
      this.visibleImg;
      this.nextVisibleImg;
      this.setVariables();
      this.animation();
    }
    setVariables(){
      this.nextVisibleImg = document.querySelector(`.section--1 li:nth-of-type( ${this.visibleChild}) `)
    }
    animation(){
      const imgOpacity = [
        {opacity:1},
        {opacity:0},
      ]
      const imgDisappearTiming = {
                    duration: 2000,
                    iterations: 1,
                    easing: 'ease',
                    fill: 'forwards',
                  };
      const imgAppearTiming = {
                ...imgDisappearTiming,   
                direction: 'reverse', 
              };
    
      const h1Opacity = [
          {opacity:1},
          {opacity:0, offset: 0.4},
          {opacity:0, offset: 0.7},
          {opacity:1},
        ]
      const h1Timing = {
          duration:4000,
          iterations:1,
          easing: 'ease',
          fill: 'forwards',
        }
      const h1 = document.querySelector('h1') || document.querySelector('.h1') ;
        
      const lastImg = document.querySelectorAll('.section--1 li').length;
  
      if(lastImg > 1){
        setInterval(() => {
            this.visibleImg = this.nextVisibleImg;
            this.visibleChild = this.visibleChild >= lastImg ? 1 : ++this.visibleChild;
            this.nextVisibleImg = document.querySelector(`.section--1 li:nth-of-type( ${this.visibleChild}) `)
  
            this.visibleImg.animate(imgOpacity, imgDisappearTiming);
            this.nextVisibleImg.animate(imgOpacity, imgAppearTiming);
            if((this.nextVisibleImg.classList.contains('left') && this.visibleImg.classList.contains('right')) 
            || (this.visibleImg.classList.contains('left') && this.nextVisibleImg.classList.contains('right'))){
              setTimeout(() => {
                this.nextVisibleImg.classList.contains('left') ? h1.style.cssText = 'right:150px; left:unset' : h1.style.cssText = 'left:150px; right:unset';
              }, 2000)
              h1.animate(h1Opacity, h1Timing)
            }
        }, 20000)
      }
    }
  }
  export default FirstSecAnimation;
  
export { FirstSection, FirstSecAnimation }