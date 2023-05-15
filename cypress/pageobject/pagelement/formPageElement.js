const locator= require('../../locator.json')
export default class FormPageElement{


   
    input1(){
        return cy.get(locator.inputfields.input1)
    }

    input2(){
        return cy.get(locator.inputfields.input2)
    }


    input3(){
        return cy.get(locator.inputfields.input3)
    }

    input4(){
        return cy.get(locator.inputfields.input4)
    }

    submitBtn(){
        return cy.contains(locator.buttons.submitBtn)
    }

    selectSection(){
        return cy.get(locator.inputfields.selectInput)
    }
   

}