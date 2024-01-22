class SecondSectionUpdate{
    constructor(selector, messageClass){
        this.selector = selector;
        this.messageClass = messageClass;
        this.sectionDOM;
        this.editDOM;
        this.actionsDOM;
        this.cancelDOM;
        this.updateDOM;
        this.paragraphDOM;
        this.paragraphContent;
        this.loadeBoxDOM;
        this.setVariables();
        this.listenToClicks();
    }
    setVariables(){
        this.sectionDOM = document.querySelector(this.selector)
        this.editDOM = this.sectionDOM.querySelector('.--edit')
        this.actionsDOM = this.sectionDOM.querySelector('.update--actions')
        this.cancelDOM = this.actionsDOM.querySelector('.--cancel');
        this.updateDOM = this.actionsDOM.querySelector('.--update');
        this.paragraphDOM = this.sectionDOM.querySelector('.--paragraph p')
        this.paragraphContent = this.paragraphDOM.innerText;
        this.loadeBoxDOM = document.querySelector('.loader--box');
    }

    listenToClicks(){
        this.editDOM.addEventListener('click', this.letEdit);
        this. cancelDOM.addEventListener('click', this.cancel);
        this.updateDOM.addEventListener('click', this.update)

    }
    letEdit = () =>{
        this.actionsDOM.style.display = 'flex';
        this.paragraphDOM.setAttribute('contenteditable', true)
    }
    cancel = () => {
        this.actionsDOM.style.display = 'none';
        this.paragraphDOM.setAttribute('contenteditable', false)
        this.paragraphDOM.innerText = this.paragraphContent;

    }
    update = () => {
        this.loadeBoxDOM.style.display = 'block';

            axios.put(editAboutRoute, {about:this.paragraphDOM.innerText})
            .then(res => {
                if(res.data.errors){  
                    let errorsHTML = '';
                    res.data.errors.forEach(error => {
                        errorsHTML += `<div>${error}</div>`
                    })
                    this.messageClass.showMsg(errorsHTML)
                }
                else
                {
                    this.paragraphDOM.innerText = this.paragraphDOM.innerText;
                    this.actionsDOM.style.display = 'none';
                    this.paragraphDOM.setAttribute('contenteditable', false)
                    this.paragraphContent = this.paragraphDOM.innerText;
                    this.messageClass.showMsg(res.data.message)
                }
                this.loadeBoxDOM.style.display = 'none';
            })
    }

}
// function secondSectionUpdate(){
//     const sectionDOM = document.querySelector('.section--2')
//     const editDOM = sectionDOM.querySelector('.--edit')
//     const actionsDOM = sectionDOM.querySelector('.update--actions')
//     const cancelDOM =  actionsDOM.querySelector('.--cancel');
//     const updateDOM =  actionsDOM.querySelector('.--update');
//     const paragraphDOM = sectionDOM.querySelector('.--paragraph p')
//     const loadeBoxDOM = document.querySelector('.loader--box');

//     editDOM.addEventListener('click', () => {
//         actionsDOM.style.display = 'flex';
//         paragraphDOM.setAttribute('contenteditable', true)
//     })
//     if(actionsDOM.style.display !== 'none'){
//         cancelDOM.addEventListener('click', () => {
//             actionsDOM.style.display = 'none';
//             paragraphDOM.setAttribute('contenteditable', false)
//         })
//         updateDOM.addEventListener('click', () => {
//             loadeBoxDOM.style.display = 'block';

//             axios.put(editAboutRoute, {about:paragraphDOM.innerText})
//             .then(_ => {
//                 paragraphDOM.innerText = paragraphDOM.innerText;
//                 actionsDOM.style.display = 'none';
//                 paragraphDOM.setAttribute('contenteditable', false)
//                 loadeBoxDOM.style.display = 'none';

//             })
//         })
//     }
// }

export default SecondSectionUpdate;