import FormData from "form-data";

class FormDataManager{
    constructor(varDOMS, listDOMS, radioBoxesDOMS){
        this.varDOMS = varDOMS;
        this.listsDOMS = listDOMS;
        this.radioBoxesDOMS = radioBoxesDOMS;
        this.formData;

    }
    getFormData(){
        console.log('paspaude')

        this.formData = new FormData();
        if(this.varDOMS.length > 0)  this.getVarsData();
        if(this.listsDOMS.length > 0) this.getListsData()
        if(this.radioBoxesDOMS && this.radioBoxesDOMS.length > 0) this.getRadioValues()

        return this.formData;

    }
    getVarsData(){
        this.varDOMS.forEach(varDOM => {
            let value;
            const varTag = varDOM.tagName.toLowerCase()
            switch(true){
                case (varTag === 'input' && varDOM.type === 'file') :   
                    value = varDOM.files[0] || null;
                    break;
                case (varTag == 'input' && varDOM.type !== 'file') || varTag === 'textarea' :
                    value = varDOM.value;
                    break;
                default : 
                value = varDOM.innerText;

            }
            if(value || value === '') this.formData.append(varDOM.dataset.name, value)
        })
    }
    getListsData(){
        this.listsDOMS.forEach(listDOM => {
            let items = [];
            const itemsValuesDOMS = listDOM.querySelectorAll('li .--value');
            itemsValuesDOMS.forEach(valueDOM => items.push(valueDOM.innerText))
            this.formData.append(listDOM.dataset.name, items)
        })
    }
    getRadioValues(){
        console.log(this.radioBoxesDOMS);
            this.radioBoxesDOMS.forEach(radioBoxDOM => {
                console.log(radioBoxDOM)
            const radioDOM = radioBoxDOM.querySelector('input[type="radio"]:checked');
            console.log(radioDOM)
            this.formData.append(radioDOM.dataset.name, radioDOM.value)
        })
    }
}
export default FormDataManager;