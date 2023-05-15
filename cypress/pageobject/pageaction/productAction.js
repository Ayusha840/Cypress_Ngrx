import FormPageElement from "../pagelement/formPageElement";

export default class ProductAction{
constructor(){
    globalThis.formElement = new FormPageElement()

}
    selectInput(type){
       return formElement.selectSection().select(type)
    }

    searchInputField(data){
         formElement.input1().type(`${data}`)
    }
    searchInputFieldkeyEvent(){
         formElement.input1().type(`{ctrl}`)
    }
}