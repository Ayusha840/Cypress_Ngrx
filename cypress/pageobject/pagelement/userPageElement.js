const locator  = require('./../../locator.json')
export default class UserPageElement{

    userDeleteBtn(){
      return  cy.contains(locator.buttons.deleteuser)
    }

}