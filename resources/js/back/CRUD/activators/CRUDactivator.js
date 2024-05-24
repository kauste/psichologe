import { ListsIManager, SelectListManager, InputListManager } from "../parts/listsManagers";
import CreateActivator from "./createActivator";
import EditActivator from "./editActivator";
import DeleteActivator from "./deleteActivator";

class CRUDactivator {
    constructor(selector, activations, parentDOM, swiper){
        this.selector = selector;
        this.activations = activations;
        this.parentDOM = parentDOM;
        this.swiper = swiper;
        this.init();

    }
    init(){
        for (const [key, value] of Object.entries(this.activations)) {
            if(value && typeof this[key] === 'function') Array.isArray(value) ? this[key](...value) : this[key]();
        }
    }
    activateCreate = () => new CreateActivator( this.selector,
                                                this.parentDOM,
                                                this.parentDOM.querySelector(`.--form`),
                                                {
                                                    openBtnSelector:null, 
                                                    cancelBtnSelector:'.store--actions .--cancel',
                                                    actionBtnSelector:'.store--actions .--store'
                                                },
                                                this.swiper,
                                              );

    activateEdit = (itemDOM) => new EditActivator( this.selector,
                                                   this.parentDOM,
                                                   itemDOM,
                                                   {
                                                       openBtnSelector:'.edit--actions .--edit', 
                                                       cancelBtnSelector:'.update--actions .--cancel',
                                                       actionBtnSelector:'.update--actions .--update'
                                                   },
                                                   this.swiper,
                                                 );   
    activateDelete = (itemDOM) => new DeleteActivator( this.selector,
                                                       this.parentDOM,
                                                       itemDOM,
                                                       {
                                                           openBtnSelector:'.edit--actions .--delete', 
                                                           cancelBtnSelector:'.delete--actions .--cancel',
                                                           actionBtnSelector:'.delete--actions .--delete'
                                                       },
                                                       this.swiper,
                                                     );
    activateEdits = () => this.parentDOM.querySelectorAll(`.one--item`).forEach(itemDOM => this.activateEdit(itemDOM, null))
    
    activateDeletes = () => this.parentDOM.querySelectorAll(`.one--item`).forEach(itemDOM => this.activateDelete(itemDOM, null))
    
    activateSelectList = () => new SelectListManager(this.parentDOM.querySelector(`.list--box:has(.select--box)`)).letRemoveItems();

    activateInputList = () => new InputListManager(this.parentDOM.querySelector(`.list--box:has(.input--box)`)).letRemoveItems();
    
    activateSelectLists = () => new ListsIManager(this.parentDOM).activateSelectLists();
    
    activateInputLists = () => new ListsIManager(this.parentDOM).activateInputLists();

    activateLists = () => new ListsIManager(this.parentDOM).activate()
    


}
export default CRUDactivator;