import ItemInUse from "../parts/itemInUse";
import CRUD from "../CRUD";
import { ListsIManager} from "../parts/listsManagers";
import { FileInputsActivator } from "../../back/imgs/fileInputsActivator";

class ItemActivationManager {
    constructor(selector, parentDOM, itemDOM, actionsSelectors, optionalFeatures, swiper){
        this.parentDOM = parentDOM;
        this.selector = selector;
        this.itemDOM = itemDOM;
        this.actionsSelectors = actionsSelectors;
        this.optionalFeatures = optionalFeatures;
        this.swiper = swiper;
        this.openBtnDOM = this.itemDOM.querySelector(this.actionsSelectors.openBtnSelector);
        this.cancelBtnDOM = this.itemDOM.querySelector(this.actionsSelectors.cancelBtnSelector);
        this.actionBtnDOM = this.itemDOM.querySelector(this.actionsSelectors.actionBtnSelector);
        this.dataDOM;
        this.varDOMS;
        this.listsDOMS;
        this.radioBoxesDOMS;
    }
    activateOptionalFeatures() {
        if (!this.optionalFeatures) return;
    
        if (this.optionalFeatures.lists) this.activateLists();
        if (this.optionalFeatures.images && (this.parentDOM === document || this.parentDOM.classList.contains('show'))){
            this.activateImages(this.optionalFeatures.images);
        }
        else if(this.optionalFeatures.images) this.observeParentDisplay();
    }
    observeParentDisplay() {
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style' && mutation.target.style.display !== 'none') {
                    this.activateImages(this.optionalFeatures.images);
                    observer.disconnect();
                }
            });
        });
    
        observer.observe(this.parentDOM, { attributes: true });
    }

    activateImages = (imgRatio) => new FileInputsActivator(imgRatio);
    
    activateLists = () => new ListsIManager(this.itemDOM).activate()

    setVariables(){
        this.dataDOM = this.itemDOM.querySelector('.--data');
        this.varDOMS = this.dataDOM.querySelectorAll('.--var');
        this.listsDOMS = this.dataDOM.querySelectorAll('.list--box ul');
        this.radioBoxesDOMS = this.dataDOM.querySelectorAll('.radio--box');
        this.initialHTML = this.dataDOM.innerHTML;
    }

    addItemInUse(){
        if(ItemInUse.isOpenItem()) return false;
        ItemInUse.updateItem(this.itemDOM);
        return true;
    }
    removeItemInUse(){
        if (ItemInUse.getItem()) ItemInUse.updateItem(null);
    }
    openStyles () {
        this.itemDOM.classList.add(`let--${this.action}`);
    }
    closeStyles(){
        this.itemDOM.classList.remove(`let--${this.action}`, 'border--warning');
    }

    enableEditing = () =>  this.varDOMS.forEach(variable =>  variable.contentEditable = 'true')

    disableEditing = () => this.varDOMS.forEach(variable =>  variable.contentEditable = 'false')
    
    restoreHTML(){
        this.dataDOM.innerHTML = this.initialHTML;
        this.setVariables();
        this.activateOptionalFeatures();
    }

    modify = () => new CRUD(this.parentDOM, this.selector, this.swiper)[this.action](...this.getArgs());
}

export default ItemActivationManager;