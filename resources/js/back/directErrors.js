import Msg from "./msg";

class DirectErrors{
    addErrors(parentDOM, errors){
        const errorsDOMS = parentDOM.querySelectorAll('.--error');
        console.log(errors);
        errorsDOMS.forEach(errorDOM => errorDOM.innerText = '');
        for(const [key, error] of Object.entries(errors)){
            const formatedKey = key.match(/[A-Za-z_\d]*/)[0]
            const errorDOM = parentDOM.querySelector(`.${formatedKey}--error`);
            console.log(errorDOM)
            if(errorDOM){
                errorDOM.innerText = `* ${error}`
            }
            else{
                console.log('patekti')
                new Msg(parentDOM).showMsg([error]);
            } 
        }
    }
}
export default DirectErrors;