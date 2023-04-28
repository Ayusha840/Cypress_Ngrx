const locator= require('../../locator.json')
export default class LoginPageElement{


    userLoginTitle(){
        return cy.contains(locator.titles.loginPageTitle)
    }

    getEmail(){
        return cy.get(locator.inputfields.input1)
    }

    getPassword(){
        return cy.get(locator.inputfields.input2)
    }

    userLoginBtn(){
        return cy.contains(locator.buttons.userLoginBtn)
    }
   

}