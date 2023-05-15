const locator  = require('../../locator.json')
export default class BtnPageElement{

    userDeleteBtn(){
      return  cy.contains(locator.buttons.deleteuser)
    }
    userAddBtn(){
      return cy.contains(locator.buttons.adduser)
    }
    userUpdateBtn(){
      return cy.contains(locator.buttons.updateuser)

    }
   
}