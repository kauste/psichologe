import 'bootstrap';
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
import './backAndFront/appBackAndFront';


import Router from './back/routerClass';



new Router;



// from back
import { FileInputsActivator } from './back/CRUDmodal/parts/fileInputsActivator';
import AddItem from './back/DRAFTFoldwer/articlesPages/addItem';
import CreateArticle from './back/DRAFTFoldwer/articlesPages/createArticle';
import EditArticle from './back/DRAFTFoldwer/articlesPages/editArticle';
import ToggleModal from './back/CRUDmodal/toggleModal';

// if(document.querySelector('.article--create')){
//   new FileInputsActivator();
//   new AddItem('.tags--box', '.add--btn', 'select', 'added--tags')
//   new CreateArticle;
// }
// else if(document.querySelector('.article--edit')){
//   new FileInputsActivator();
//   const addTags = new AddItem('.tags--box', '.add--btn', 'select', 'added--tags');
//   addTags.letExistingTagsDelete();
//   new EditArticle;
// }

// else if( document.querySelector('.contact--modal--box')){
//   new ToggleModal('contact').init();
//   const loadeBoxDOM = document.querySelector('.loader--box');
//   const modalDOM = document.querySelector('.contact--modal--box --modal')
//   const editVarsDOMS = modalDOM.querySelectorAll(' .--var')
//   const msgObj = new ModalMsg(modalDOM)

//   const update = () => {
//     loadeBoxDOM.style.display = 'block';
//     const data = {};
//     editVarsDOMS.forEach(varDOM => {
//             data[varDOM.dataset.name] = varDOM.innerText;
//     })

//     axios.put(contactsUpdateRoute, {data:data})
//     .then(res => {
//         if(res.data.errors){
//             let errorsHTML = '';
//             res.data.errors.forEach(error => {
//                 errorsHTML += `<div>${error}</div>`
//             })
//             this.msgObj.showMsg(errorsHTML)
//         }
//         else if(res.data.message){
//             this.updateSection(data);
//             if(this.editPriorityDOM && this.initialPriority !== data.priority){
//                 this.changePositionInSec(data.priority)
//                 this.changePositionInModal(data.priority)
//             }
//             this.changeToEditButtons();
//             this.closeItemEdit()
//             this.showMsg(res.data.message)
//         }
//         this.loadeBoxDOM.style.display = 'none';
//     })
// }
//   }

