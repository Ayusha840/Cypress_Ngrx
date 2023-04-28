import LoginPageElement from "../pagelement/loginPageElement";

export default class LoginPageAction{
    // loginPageElement = new LoginPageElement();
    constructor(){
        globalThis.loginPageElement = new LoginPageElement();

    }
    verifyUserLogin(email,password){
        loginPageElement.getEmail().type(email)
        loginPageElement.getPassword().type(password)
        loginPageElement.userLoginBtn().click()
    }

    invailedAlertMessage(alertMsg){
        cy.on('window:alert',(str)=>{
            expect(str).contain(alertMsg)
        })
    }
}