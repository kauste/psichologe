function secondSectionUpdate(){
    const section2DOM = document.querySelector('.section--2')
    const editDOM = section2DOM.querySelector('.--edit')
    const actionsDOM = section2DOM.querySelector('.update--actions')
    const cancelDOM =  actionsDOM.querySelector('.--cancel');
    const updateDOM =  actionsDOM.querySelector('.--update');
    const paragraphDOM = section2DOM.querySelector('.--paragraph p')
    const loadeBoxDOM = document.querySelector('.loader--box');

    editDOM.addEventListener('click', () => {
        actionsDOM.style.display = 'flex';
        paragraphDOM.setAttribute('contenteditable', true)
    })
    if(actionsDOM.style.display !== 'none'){
        cancelDOM.addEventListener('click', () => {
            actionsDOM.style.display = 'none';
            paragraphDOM.setAttribute('contenteditable', false)
        })
        updateDOM.addEventListener('click', () => {
            loadeBoxDOM.style.display = 'block';

            axios.put(editAboutRoute, {about:paragraphDOM.innerText})
            .then(_ => {
                paragraphDOM.innerText = paragraphDOM.innerText;
                actionsDOM.style.display = 'none';
                paragraphDOM.setAttribute('contenteditable', false)
                loadeBoxDOM.style.display = 'none';

            })
        })
    }
}
export { secondSectionUpdate };