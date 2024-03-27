import axios from "axios";
import { CRUDmodal } from "../parts/CRUDmodal";

class Services extends CRUDmodal{
    constructor(cssStyles, selector, updateRoute, storeRoute, deleteRoute){
        super(cssStyles, selector, storeRoute)
        this.selector = selector;
        this.updateRoute = updateRoute;
        this.deleteRoute = deleteRoute;
        //create
        this.addCreareServiceTypesSvgDOM;
        this.addCreateServiceTypesInputDOM;
        this.addedServiceTypeBoxDOM;
        //one service
        this.serviceDOM;
        this.serviceInnerText;
        this.priorityDOM;
        this.priorityValue;
        this.serviceTypeInnerHTML;
        //service type
        this.serviceTypesDOM;
        this.serviceTypesDOMS;
        this.serviceTypesUlDOM;
        this.usedServiceTypes = [];
        this.newServiceTypes = {};
        this.deleteSvgDOMS;
        this.addServiceTypeDOM;
        this.addServiceTypeSvgDOM;
        this.addServiceTypeInputtDOM;
        //buttons
        this.cancelEditBtnDOM;
        this.updateBtnDOM;
        //one service section
        this.secItemDOM;
        this.secServiceTitleDOM;
        this.secServiceTypesDOM;
        this.secServiceTypesDOMS;


    }
    borderWarningCSS(){
        this.scrollToItem = this.openItemDOM.offsetTop - this.openItemDOM.offsetHeight - 30;
        super.borderWarningCSS();
    }
    // create
    setCreateItemVariables (){
        this.addCreareServiceTypesSvgDOM = this.addBoxDOM.querySelector('svg');
        this.addCreateServiceTypesInputDOM = this.addBoxDOM.querySelector('input');
        this.addedServiceTypeBoxDOM = this.addBoxDOM.querySelector('.selected--list');
        super.setCreateItemVariables();
    }
    letCreateItem(){
        super.letCreateItem();
        this.addCreareServiceTypesSvgDOM.addEventListener('click', () => this.addServiceTypeHandler(this.addCreateServiceTypesInputDOM, this.addedServiceTypeBoxDOM))
    }

    addServiceTypeHandler(addServiceTypeInputtDOM, listDOM){
        const id = `new-${Object.keys(this.newServiceTypes).length + 1}`;
        this.newServiceTypes[id] = addServiceTypeInputtDOM.value;
        // //add element
        let li = document.createElement('li');
        li.dataset.serviceTypeId = id;
        li.style.paddingBottom = '5px';

        const serviceTypeHTML = `<div class="svg-box delete-svg-box delete--service--type--svg" style="display:flex">
                                        <svg class="delete-svg">
                                            <use xlink:href="#delete"></use>
                                        </svg>
                                    </div>
                                    <div class="--value">${addServiceTypeInputtDOM.value}</div>`
        li.innerHTML = serviceTypeHTML;
        listDOM.appendChild(li);
        const newDeleteSvgDOM = li.querySelector('svg');
        // //add listeners
        newDeleteSvgDOM.addEventListener('click', this.deleteServiceTypeHandler(newDeleteSvgDOM))          
        // //change DOM
        this.serviceTypesDOMS = listDOM.querySelectorAll('li[data-service-type-id]');
        this.deleteSvgDOMS = listDOM.querySelectorAll('.delete--service--type--svg');     
        //clear input
        addServiceTypeInputtDOM.value= '';     
            
    }

    //edit

    setEditItem(){
        //modal
        this.openItemId = this.openItemDOM.id.replace(this.selector + '-edit-', '')
        this.liChildernDOMS = this.openItemDOM.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions');
        // editable variables doms
        this.serviceDOM = this.openItemDOM.querySelector('.the--service');
        this.serviceTypesDOM = this.openItemDOM.querySelector('.service--types');
        this.priorityDOM = this.openItemDOM.querySelector('.--priority');
        //service types
        this.serviceTypesUlDOM = this.serviceTypesDOM.querySelector('ul');
        this.serviceTypesDOMS = this.serviceTypesDOM.querySelectorAll('li[data-service-type-id]');
        this.serviceTypesDOMS.forEach(serviceType => {
            this.usedServiceTypes.push(serviceType.dataset.serviceTypeId);
            })
        this.deleteSvgDOMS = this.serviceTypesDOM.querySelectorAll('.delete--service--type--svg')
        this.addServiceTypeDOM = this.serviceTypesDOM.querySelector('.add--service--type');
        this.addServiceTypeSvgDOM = this.addServiceTypeDOM.querySelector('svg');
        this.addServiceTypeInputtDOM = this.addServiceTypeDOM.querySelector('input');
        //buttons
        this.cancelEditBtnDOM = this.openItemDOM.querySelector('.update--actions > .--cancel');
        this.updateBtnDOM = this.openItemDOM.querySelector('.update--actions > .--update');
        // section
        this.secItemDOM = document.querySelector(`#${this.selector}-${this.openItemId}`);
        this.secServiceTitleDOM = this.secItemDOM.querySelector('h3');
        this.secServiceTypesDOM = this.secItemDOM.querySelector('.service--types--ul--box ul')
        this.secServiceTypesDOMS = this.secServiceTypesDOM.querySelectorAll('li');
        // save inner text for cancel
        this.serviceInnerText = this.serviceDOM.innerText;
        this.priorityValue = parseInt(this.priorityDOM.innerText) ? parseInt(this.priorityDOM.innerText) : null;
        this.serviceTypeInnerHTML = this.serviceTypesDOM.innerHTML;
        this.editStyles();
        this.makeItemEditable();
    }

    editStyles(){
        this.deleteSvgDOMS.forEach(deleteSvgDOM => {
            deleteSvgDOM.style.display = deleteSvgDOM.style.display === 'flex' ? 'none' : 'flex';
        });
        this.addServiceTypeDOM.style.display = this.addServiceTypeDOM.style.display=== 'flex' ? 'none' : 'flex';
        this.serviceTypesDOMS.forEach((serviceTypeDOM) => {
            serviceTypeDOM.style.paddingBottom = serviceTypeDOM.style.paddingBottom === '0px' ? '5px' : '0px';
        })
        this.serviceTypesDOM.style.padding = this.serviceTypesDOM.style.padding === '0px' ? '5px' : '0px';
    }

    makeItemEditable(){
        this.openItemDOM.classList.add('editable');
        this.serviceDOM.setAttribute('contenteditable', true);
        this.priorityDOM.setAttribute('contenteditable', true);
        this.deleteSvgDOMS.forEach(deleteSvgDOM => {
            deleteSvgDOM.addEventListener('click', this.deleteServiceTypeHandler(deleteSvgDOM))
        });

        this.addServiceTypeSvgDOM.addEventListener('click', () => this.addServiceTypeHandler(this.addServiceTypeInputtDOM, this.serviceTypesUlDOM))
    }
    deleteServiceTypeHandler =  (deleteSvgDOM) => () => {
        const id = deleteSvgDOM.closest('li').dataset.serviceTypeId;
        this.usedServiceTypes = this.usedServiceTypes.filter((serviceTypeId) => serviceTypeId != id)
        Object.keys(this.newServiceTypes).forEach(key => {
            if(id === key){
                delete this.newServiceTypes[key]
                return;
            }
        })
        deleteSvgDOM.closest('li').style.display = 'none';
    }

    update = () => {
        this.loadeBoxDOM.style.display = 'block';

        const priorityInnerText = parseInt(this.priorityDOM.innerText) ? parseInt(this.priorityDOM.innerText) : null;
        const data = {
            service_title: this.serviceDOM.innerText,
            priority:priorityInnerText,
            service_types:this.usedServiceTypes.length > 0 ? this.usedServiceTypes : null,
            new_service_types:Object.keys(this.newServiceTypes).length > 0 ? this.newServiceTypes : null,
        }
        axios.put(this.updateRoute + '/' + this.openItemId, data)
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
                this.appendEditSection(res.data.newServicesTypes);
                if(this.priorityValue !== priorityInnerText){
                    this.changePositionInModal(priorityInnerText)
                    this.changePositionInSec(priorityInnerText)
                }
                this.closeItemEdit()
                this.showMsg(res.data.message)
                this.priorityDOM.style.fontStyle = priorityInnerText ? 'normal' : 'italic';
                this.priorityDOM.style.color = priorityInnerText ? '#000' : '#999';
                this.priorityDOM.style.fontSize = priorityInnerText ? '16px' : '0.875rem';
                this.priorityDOM.innerText = priorityInnerText ? priorityInnerText : 'nesvarbu';
            }
            this.loadeBoxDOM.style.display = 'none';

        })
    }
    appendEditSection (newServicesTypes){
        this.secServiceTitleDOM.innerText = this.serviceInnerText;
        this.secServiceTypesDOMS.forEach(serviceTypeDOM => {
            if(!this.usedServiceTypes.includes(serviceTypeDOM.dataset.serviceTypeId)){
                this.secServiceTypesDOM.removeChild(serviceTypeDOM)
            }
        })
        if(newServicesTypes){
            newServicesTypes.forEach(newType => {
                let li = document.createElement('li');
                li.dataset.serviceTypeId = newType.id;
                li.innerText = newType.service_type;
                this.secServiceTypesDOM.appendChild(li)
            })
        }
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
        // this.activateItemEditDeleteBtns(this.openItemDOM)
    }
    cancelEdit = () => {
        this.updateBtnDOM.removeEventListener('click', this.update);
        this.serviceDOM.innerText = this.serviceInnerText;
        this.priorityDOM.innerText = parseInt(this.priorityValue) ?  parseInt(this.priorityValue) : 'nesvarbu';
        this.serviceTypesDOM.innerHTML = this.serviceTypeInnerHTML;
        this.closeItemEdit()
    }
    closeItemEdit(){
        this.changeToEditButtons();
        this.removeBorderCSS();
        // //remove editable
        this.makeNotEditable();
        this.editStyles();
        // //reset variables
        this.newServiceTypes = {};
        this.usedServiceTypes = [];
        this.tagInnerText = '';
        this.priorityValue = '';
        this.liChildernDOMS = null;
        this.citationDOM = null;
        // // should be last
        this.openItemId = null;
        this.openItemDOM = null;
    }
    makeNotEditable(){
        this.openItemDOM.classList.remove('editable');
        this.serviceDOM.setAttribute('contenteditable', false);
        this.priorityDOM.setAttribute('contenteditable', false);
        this.deleteSvgDOMS.forEach(deleteSvgDOM => {
            deleteSvgDOM.removeEventListener('click', this.deleteServiceTypeHandler(deleteSvgDOM))
        });

        this.addServiceTypeSvgDOM.removeEventListener('click', this.addArticleHandler)
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
                this.cancelDeleteBtnDOM.removeEventListener('click', this.cancelDelete);
            }
            else {
                this.deleteBtnDOM.addEventListener('click', this.delete, {once:true})
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }
    cancelDelete = () => {
        this.changeToDeleteButtons();
        this.removeBorderCSS();

        this.deleteBtnDOM.removeEventListener('click', this.delete)
        this.openItemDOM = null;
        this.openItemId = null;
    }
}
export default Services;