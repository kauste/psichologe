import { ListsIManager } from "../listItemManager ";
import {  ItemsActivator } from "../itemsActivator";
import NavigateModal from "./navigateModal";
import ToggleModal from "./toggleModal";

class ModalActivaror{
    constructor(selector, activations, swiper){
        this.selector = selector;
        this.activations = activations;
        this.storeRoute = activations.activateCreate;
        this.updateRoute = activations.activateEdit;
        this.deleteRoute = activations.activateDelete;
        this.modalDOM;
        this.openItemDOM = null;
        this.swiper = swiper;
        this.init()
    }
    init(){
        this.modalDOM = document.querySelector(`.${this.selector}--modal--box .--modal`)
        this.activateModalToggler()
        for (const [key, route] of Object.entries(this.activations)) {
            if(route && typeof this[key] === 'function') this[key]();
        }
    }
    activateModalToggler = () => new ToggleModal(this.selector);

    activateModalNavigation = () => new NavigateModal(this.selector);
    
    activateCreate = () => new ItemsActivator('create',
                                              this.modalDOM,
                                              {
                                                actionsParentSelector:`.--form .store--actions`,
                                                openBtnSelector:null, 
                                                cancelBtnSelector:'.store--actions .--cancel',
                                                actionBtnSelector:'.store--actions .--store'
                                              },
                                              this.storeRoute,
                                              this.activations.activateLists
                                            );
        
    activateEdit = () =>  new ItemsActivator('edit',
                                             this.modalDOM,
                                             {
                                                actionsParentSelector:`.ul--box .--actions`,
                                                openBtnSelector:'.edit--actions .--edit', 
                                                cancelBtnSelector:'.update--actions .--cancel',
                                                actionBtnSelector:'.update--actions .--update'
                                              },
                                             this.updateRoute,
                                             this.activations.activateLists,
                                            );
    activateDelete = () => new ItemsActivator('delete',
                                              this.modalDOM,
                                              {
                                                actionsParentSelector:`.ul--box .--actions`,
                                                openBtnSelector:'.edit--actions .--delete', 
                                                cancelBtnSelector:'.delete--actions .--cancel',
                                                actionBtnSelector:'.delete--actions .--delete'
                                              },
                                              this.deleteRoute,
                                             );
    activateLists = () => new ListsIManager(this.modalDOM, this.activations.activateLists).activate()




}
export default ModalActivaror;