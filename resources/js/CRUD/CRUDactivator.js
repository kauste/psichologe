import CreateActivator from "./activators/createActivator";
import EditActivator from "./activators/editActivator";
import DeleteActivator from "./activators/deleteActivator";

class CRUDactivator {
    constructor(selector, parentDOM, CRUDactivations, optionalFeatures, swiper){
        this.selector = selector;
        this.parentDOM = parentDOM;
        this.CRUDactivations = CRUDactivations;
        this.optionalFeatures = optionalFeatures;
        this.swiper = swiper;
        this.init();
    }
    init(){
        if(this.CRUDactivations){
            for (const [key, value] of Object.entries(this.CRUDactivations)) {
                if(value && typeof this[key] === 'function') Array.isArray(value) ? this[key](...value) : this[key]();
            }
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
                                                this.optionalFeatures,
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
                                                   this.optionalFeatures,
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

    
}
export default CRUDactivator;