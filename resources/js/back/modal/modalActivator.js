import NavigateModal from "./navigateModal";
import ToggleModal from "./toggleModal";
import CRUDactivator from "../../CRUD/CRUDactivator";

class ModalActivaror{
    constructor(selector, activations, swiper){
        this.selector = selector;
        this.activations = activations;
        this.modalDOM;
        this.swiper = swiper;
        this.init()
    }
    init(){
        this.modalDOM = document.querySelector(`.${this.selector}--modal--box .--modal`)
        this.activateModalToggler()
        for (const [key, value] of Object.entries(this.activations)) {
            if(value && typeof this[key] === 'function')  this[key]();
        }
    }
    activateModalToggler = () => new ToggleModal(this.selector);

    activateModalNavigation = () => new NavigateModal(this.selector);
    
    activateCRUD = () => new CRUDactivator(this.selector, this.modalDOM, this.activations.activateCRUD.CRUDactivations, this.activations.activateCRUD.CRUDoptionalFeatures, this.swiper);

}
export default ModalActivaror;