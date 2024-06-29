import DOMmodifier from "./parts/DOMmodifier";
import CRUDactivator from "./CRUDactivator";
import ItemInUse from "./parts/itemInUse";
import Msg from "../back/msg";
import DirectErrors from "../back/directErrors";

class ResponseHandler {
    constructor(parentDOM, selector , swiper) {
        this.parentDOM = parentDOM;
        this.selector = selector;
        this.swiper = swiper;
        this.modalParentDOM;
        this.secParentDOM;
        this.msgObj = new Msg(this.parentDOM)
        this.DOMmodifierOBJ = new DOMmodifier();
    }

    handleResponse = (resData, func, args) => {
        switch(true){
            case (resData.errors !== undefined) :
                this.msgObj.showMsg(resData.errors);
                break;
            case (resData.errorsObj !== undefined) :
                new DirectErrors().addErrors(document, resData.errorsObj)
                break;
            case (resData.redirectRoute !== undefined) :
                window.location.href = resData.redirectRoute;
                break;
            case (resData.message !== undefined && this.parentDOM !== document) :
                this.setDOMS();
                this[func](...args);
                this.msgObj.showMsg(resData.message);
                if(this.swiper){
                     this.swiper.update();
                }
                break;
            case (resData.message !== undefined && this.parentDOM === document) :
                this[func](...args);
                this.msgObj.showMsg(resData.message);
                break;
        }
    }
    formDataToObj(formData){
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        return data;
    }
    setDOMS(){
        this.modalParentDOM = this.parentDOM.querySelector('.items--parent');
        this.secParentDOM =  document.querySelector(`#${this.selector} .items--parent`);
    }
    handleItemCreation = (resData, formData, optionalFeatures, closeFunction) => {
        const priority = formData.get('priority');
        const newElementDOM = this.DOMmodifierOBJ.createListItem( this.modalParentDOM,
                                                             ['one-item', `one-${this.selector}`, 'one--item'],
                                                             { id: resData.itemId, priority: priority ? priority : null },
                                                             null,
                                                             resData.modalHTML,
                                                            );
        new CRUDactivator(  this.selector,
                            this.parentDOM,
                            { activateEdit: [newElementDOM],
                              activateDelete: [newElementDOM],
                             },
                            optionalFeatures,
                            this.swiper
                          );

        this.DOMmodifierOBJ.createListItem( this.secParentDOM,
                                       [`one-${this.selector}`, 'one--item', this.swiper ? 'swiper-slide' : null],
                                       { id:resData.itemId, priority: priority ? priority : null },
                                        null,
                                       resData.sectionHTML,
                                     );
        closeFunction();
    }

    handleItemEditing = (itemDOM, formData, closeFunction) => {
        const data = this.formDataToObj(formData);

        if(this.parentDOM !== document) this.handleEditDOMS(itemDOM, data)
        this.handleEditClose(closeFunction)
    }
    handleEditDOMS(itemDOM, data){
        const sectionItemDOM = this.secParentDOM.querySelector(`.one--item[data-id='${itemDOM.dataset.id}']`)
        this.DOMmodifierOBJ.changeContent(sectionItemDOM, data)
        const priority = data.priority;
        if(priority !== undefined){
            this.DOMmodifierOBJ.changePosition(this.secParentDOM, sectionItemDOM, priority)
            this.DOMmodifierOBJ.changePosition(this.modalParentDOM, itemDOM, priority)
            this.DOMmodifierOBJ.changePriorityVarStyle(itemDOM, priority)
        }
    }
    handleEditClose(closeFunction){
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