import {  ToggleItems } from "../toggltem";
import NavigateModal from "./navigateModal";
import ToggleModal from "./toggleModal";

class ModalActivaror{
    constructor(selector, boxSelector, storeRoute, updateRoute, deleteRoute, swiper){
        this.selector = selector;
        this.boxSelector = boxSelector;
        this.storeRoute = storeRoute;
        this.updateRoute = updateRoute;
        this.deleteRoute = deleteRoute;
        this.swiper = swiper;
        this.activateModalToggler()
    }
    activateModalToggler(){
        new ToggleModal(this.selector);                       
    }
    activateModalNavigation(){
        new NavigateModal(this.selector);
    }
    activateItemsToggler(){
        new ToggleItems(  this.boxSelector, 
                          '.edit--actions .--delete', 
                          '.delete--actions',
                          'let--delete'
                        );
        new ToggleItems(  this.boxSelector,
                          '.edit--actions .--edit', 
                          '.update--actions',
                          'let--edit'
                        );
    }



}
export default ModalActivaror;