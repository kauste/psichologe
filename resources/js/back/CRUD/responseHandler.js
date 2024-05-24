import DOMmodifier from "./parts/DOMmodifier";
import CRUDactivator from "./activators/CRUDactivator";
import ItemInUse from "./parts/itemInUse";
import Msg from "../msg";

class ResponseHandler {
    constructor(parentDOM, selector , swiper) {
        this.parentDOM = parentDOM;
        this.selector = selector;
        this.swiper = swiper;
        this.modalParentDOM;
        this.secParentDOM;
        this.msgObj = new Msg(this.parentDOM)
        this.DOMmodifierOBJ = new DOMmodifier();
        this.setDOMS();
    }
    setDOMS(){
        this.modalParentDOM = this.parentDOM.querySelector('.items--parent');
        this.secParentDOM =  document.querySelector(`#${this.selector} .items--parent`);
        console.log(this.modalParentDOM)
    }
    handleResponse = (resData, func, args) => {
        switch(true){
            case (resData.errors !== undefined) :
                this.msgObj.showMsg(resData.errors);
                break;
            case (resData.redirectRoute !== undefined) :
                window.location.href = redirectRoute;
                break;
            case (resData.message !== undefined) :
                this[func](...args);
                this.msgObj.showMsg(resData.message);
                if(this.swiper) this.swiper.update();
                break;
        }
    }
    handleItemCreation = (resData, data, closeFunction) => {
        const newElementDOM = this.DOMmodifierOBJ.createListItem( this.modalParentDOM,
                                                             ['one-item', `one-${this.selector}`, 'one--item'],
                                                             { id: resData.itemId, priority: data.priority ? data.priority : null },
                                                             null,
                                                             resData.modalHTML,
                                                            );
        new CRUDactivator(  this.selector,
                            { activateEditsAndDeletes: [newElementDOM] },
                            this.parentDOM,
                            this.swiper
                          );

        this.DOMmodifierOBJ.createListItem( this.secParentDOM,
                                       ['one--item', this.swiper ? 'swiper-slide' : ''],
                                       { priority: data.priority ? data.priority : null },
                                       `${this.selector}-${resData.itemId}`,
                                       resData.sectionHTML,
                                     );
        closeFunction();
    }

    handleItemEditing = (itemDOM, data, closeFunction) => {
        const sectionItemDOM = this.secParentDOM.querySelector(`.one--item[data-id='${itemDOM.dataset.id}']`)
        this.DOMmodifierOBJ.changeContent(sectionItemDOM, data)
        if(data.priority){
             this.DOMmodifierOBJ.changePosition(this.secParentDOM, sectionItemDOM, data.priority)
             this.DOMmodifierOBJ.changePosition(this.modalParentDOM, itemDOM, data.priority)
             this.DOMmodifierOBJ.changePriorityVarStyle(itemDOM, data.priority)
        }
        ItemInUse.updateItem(null);
        closeFunction();
    }

    handleItemDeleting = (itemDOM) => {
        this.modalParentDOM.removeChild(itemDOM);
        const sectionItemDOM = this.secParentDOM.querySelector(`li[data-id='${itemDOM.dataset.id}']`)
        this.secParentDOM.removeChild(sectionItemDOM)
        ItemInUse.updateItem(null);
    }
}

export default ResponseHandler;