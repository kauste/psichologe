class DOMmodifier{
    appendElement(parentDOM, tag, html, dataset, value){
        let el = document.createElement(tag)
        if(dataset) Object.entries(dataset).forEach(([key, value]) => el.dataset[key] = value);
        if(value) el.value = value
        el.innerHTML = html;
        parentDOM.appendChild(el);
        return el;
    }
    prependElement(parentDOM, tag, html, dataset, value){
        let el = document.createElement(tag)
        if(dataset) Object.entries(dataset).forEach(([key, value]) => el.dataset[key] = value);
        if(value) el.value = value
        el.innerHTML = html;
        parentDOM.prepend(el);
        return el;
    }
    insertElement(parentDOM, element){
        let priority = element.dataset.priority
        priority = priority && !isNaN(priority)? parseInt(priority) : null;
        const elementsList = Array.from( parentDOM.querySelectorAll(`:scope > li`))

        let afterElement = null;
        if(priority && priority > 0){
            for(let i = 0; i < elementsList.length; i++){
                let listElementPriority = parseInt(elementsList[i].dataset.priority)
                listElementPriority = listElementPriority ? listElementPriority : null;
                if (!listElementPriority || (listElementPriority && listElementPriority >= priority)) {
                    afterElement = elementsList[i];
                    break;
                }
            }
        }
        (afterElement || priority === 0) ? parentDOM.insertBefore(element, afterElement) : parentDOM.appendChild(element);
    }
    changePosition(parentDOM, itemDOM, priority){
        parentDOM.removeChild(itemDOM);
        itemDOM.dataset.priority = priority;
        this.insertElement(parentDOM, itemDOM)
    }
    changePriorityVarStyle(itemDOM, priority){
        const priorityDOM = itemDOM.querySelector(".--var[data-name='priority']")
        if(parseInt(priority)){
            priorityDOM.innerText = priority;
            priorityDOM.classList.remove('small')
        }
        else{
            priorityDOM.innerText = 'nesvarbu'
            priorityDOM.classList.add('small')
        }
    }

    createListItem(listDOM, htmlClasses, dataset, id, innerHTML){
        let li = document.createElement('li')
        if(htmlClasses) li.classList.add(...htmlClasses);
        if(dataset) {
            for (const [key, value] of Object.entries(dataset)) {
                if(value) li.dataset[key] = value;
              }
        }
        if(id) li.id = id;
        li.innerHTML = innerHTML;
        this.insertElement(listDOM, li)
        return li;
    }

    changeContent(itemDOM, data){
        const varDOMS = itemDOM.querySelectorAll('.--var');
        varDOMS.forEach(vardOM =>  vardOM.innerText = data[vardOM.dataset.name])
        const listDOMS = itemDOM.querySelectorAll('.list--box ul');
        if(listDOMS && listDOMS.length > 0){
            listDOMS.forEach(listDOM => {
                const currList = data[listDOM.dataset.name].split(',')
                let html = '';
                currList.forEach(item => html += `<li>${item}</li>`)
                listDOM.innerHTML = html;
            })
        }
    }
    changePositionInModal(priority){
        this.ulDOM.removeChild(this.openItemDOM)
        this.openItemDOM.dataset.priority = priority;
        this.insertItemInList(this.ulDOM, this.openItemDOM)
      
    }
    innerHTML(){
        
    }
}
export default DOMmodifier;