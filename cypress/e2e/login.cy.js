import HeaderAction from "../pageobject/pageaction/headerAction";
import LoginPageAction from "../pageobject/pageaction/loginPageAction";
const locator = require('./../locator.json')
describe('login user case',()=>{
    const header = new HeaderAction();
    const login = new LoginPageAction();

    beforeEach(()=>{
    header.navigationTo(locator.links.loginTab)

        cy.fixture('user').then((data)=>{
            global.logData = data;
        })
    })

    it('should valid and login',()=>{
        login.verifyUserLogin(logData.email,logData.password,logData.title)
        login.invailedAlertMessage(logData.alertMsg)
        cy.get('#toast-container').should('be.visible')
    })
})