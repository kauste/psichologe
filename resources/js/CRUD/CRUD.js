
import Msg from "../back/msg";
import ResponseHandler from "./responseHandler";

class CRUD {
    constructor(parentDOM, selector, swiper){
        this.parentDOM = parentDOM;
        this.selector = selector;
        this.loadeBoxDOM;
        this.responseHandler = new ResponseHandler(parentDOM, selector, swiper);
        this.setDOMS();
    }
    setDOMS(){
        this.loadeBoxDOM = document.querySelector('.loader--box');
    }

    store = (formData, optionalFeatures, closeFunction) => {
        this.loadeBoxDOM.style.display = 'block';
        const storeRoute = routes[`${this.selector}StoreRoute`];
        axios.post(storeRoute, formData, {headers:{Accept: "application/json", "Content-Type": "multipart/form-data"}})
        .then(res => {
            console.log('kokoko')
            this.responseHandler.handleResponse(res.data, 'handleItemCreation',  [res.data, formData, optionalFeatures,  closeFunction]);
            if(res.data.redirectRoute == undefined) this.loadeBoxDOM.style.display = 'none';
        })
        .catch(error => {
            console.error('An error occurred:', error);
            new Msg(this.parentDOM).showMsg(['Error occured, please try again']);
            this.loadeBoxDOM.style.display = 'none';
        });
    }

    update = (formData, itemDOM, closeFunction) => {
        this.loadeBoxDOM.style.display = 'block';
        const updateRoute = routes[`${this.selector}UpdateRoute`]
        axios.post(`${updateRoute}/${itemDOM.dataset.id}`, formData, {headers:{Accept: "application/json", "Content-Type": "multipart/form-data"}, params: { _method: 'PUT'}})
        .then(res => {
            this.responseHandler.handleResponse(res.data, 'handleItemEditing', [itemDOM, formData, closeFunction])
            if(res.data.redirectRoute == undefined) this.loadeBoxDOM.style.display = 'none';
        })
        .catch(error => {
            console.error('An error occurred:', error);
            new Msg(this.parentDOM).showMsg(['Error occured, please try again']);
            this.loadeBoxDOM.style.display = 'none';
        });
    }
    delete =  (itemDOM) => {
        this.loadeBoxDOM.style.display = 'block';
        const deleteRoute = routes[`${this.selector}DeleteRoute`]
        axios.delete(`${deleteRoute}/${itemDOM.dataset.id}`)
        .then(res => {
            this.responseHandler.handleResponse(res.data, 'handleItemDeleting', [itemDOM])
            if(res.data.redirectRoute == undefined) this.loadeBoxDOM.style.display = 'none';
        })
        .catch(error => {
            console.error('An error occurred:', error);
            new Msg(this.parentDOM).showMsg(['Error occured, please try again']);
            this.loadeBoxDOM.style.display = 'none';
        });
    }

}
export default CRUD;