import FormPageElement from '../pagelement/formPageElement'

export default class LoginPageAction {
  // loginPageElement = new LoginPageElement();
  constructor() {
    globalThis.formElement = new FormPageElement()
  }
  verifyUserLogin(data) {
    formElement.input1().clear().type(data.email)
    formElement.input2().clear().type(data.password)
    formElement.submitBtn().click()
  }

  invailedAlertMessage(alertMsg) {
    cy.on('window:alert', (str) => {
      expect(str).contain(alertMsg)
    })
  }
}
