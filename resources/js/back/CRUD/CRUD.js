
import Msg from "../msg";
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

    store = (data, closeFunction) => {
        this.loadeBoxDOM.style.display = 'block';
        const storeRoute = routes[`${this.selector}StoreRoute`];
        axios.post(storeRoute, { data: data })
        .then(res => {
            this.responseHandler.handleResponse(res.data, 'handleItemCreation',  [res.data, data, closeFunction]);
            this.loadeBoxDOM.style.display = 'none';
        })
        .catch(error => {
            console.error('An error occurred:', error);
            new Msg(this.parentDOM).showMsg(['Error occured, please try again']);
            this.loadeBoxDOM.style.display = 'none';
        });
    }

    update = (data, itemDOM, closeFunction) => {
        this.loadeBoxDOM.style.display = 'block';
        const updateRoute = routes[`${this.selector}UpdateRoute`]
        axios.put(`${updateRoute}/${itemDOM.dataset.id}`, {data:data})
        .then(res => {
            this.responseHandler.handleResponse(res.data, 'handleItemEditing', [itemDOM, data, closeFunction])
            this.loadeBoxDOM.style.display = 'none';
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
            this.loadeBoxDOM.style.display = 'none';
        })
        .catch(error => {
            console.error('An error occurred:', error);
            new Msg(this.parentDOM).showMsg(['Error occured, please try again']);
            this.loadeBoxDOM.style.display = 'none';
        });
    }

}
export default CRUD;