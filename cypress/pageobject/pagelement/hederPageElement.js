const locator= require('../../locator.json')

export default class HeaderPageElement{

    userRedirect(){
        return cy.contains(locator.navigation.userbtn)
    }
}