import HeaderAction from '../pageobject/pageaction/headerAction'
import LoginPageAction from '../pageobject/pageaction/loginPageAction'
const locator = require('../locator.json')
describe('login user case', () => {
  const headerAction = new HeaderAction()
  const login = new LoginPageAction()

  beforeEach(() => {

    headerAction.navigationTo('')

    cy.contains('Login').click()

    cy.fixture('login/user').then((data) => {
      globalThis.logData = data
    })

    cy.fixture('user/apiuser').then((item) => {
      globalThis.apiuser = item
    })

    cy.fixture('login/loginRes').then((item) => {
      globalThis.localRes = item
    })
  })

  /**
   * redirect directly without login
   */
  it('should not access page without login', () => {
    headerAction.navigationTo(locator.links.userTab)
    cy.get('.toast-error').should('be.visible').and('have.text', ' Please login!!! ')

    cy.wait(3000)
  })

  /**
   * check test case with invalid credential
   */
  it('should check with invalid credential', () => {
    login.verifyUserLogin(logData.invalidData)
    login.invailedAlertMessage(logData.invalidData.alertMsg)
  })

  /**
   * check test case with  valid email and password for support
   */
  it('should redirect to other page', () => {
    //-------- call api for login with valid email password
    cy.intercept(
      {
        method: 'POST',
        url: `login`,
      },
      {
        statusCode: 201,
        body: localRes.support,
      },
      { passthrough: false },
    ).as('login')


    //-------- call function for set login value to form
    login.verifyUserLogin(logData.backendReq)

    //-------- call api for login data
    cy.get('@login')
    cy.get('.toast-success').should('be.visible').and('have.text', ` Hi, ${localRes.support.res.name} welcome!!! `)

    cy.wait(3000)
    cy.get(locator.htmlTag.head1Tag).find(locator.htmlTag.spanTag).contains(localRes.support.res.name)

    // cy.get('.toast-error').should('be.visible').and('have.text', ' Not Authorized!!! ')
    cy.get('.menu').should('be.visible')

    cy.wait(5000)
  })

  /**
   * check test case with  valid email and password for admin
   */
  it('should redirect to other page', () => {
    //-------- call api for login with valid email password
    cy.intercept(
      {
        method: 'POST',
        url: `login`,
      },
      {
        statusCode: 201,
        body: localRes.admin,
      },
      { passthrough: false },
    ).as('login')

    //-------- call function for set login value to form
    login.verifyUserLogin(logData.adminvalidata)

    //-------- call api for login data
    cy.get('@login')

    cy.setToken('loginToken', localRes.admin.res)

    cy.get('.toast-success').should('be.visible').and('have.text', ` Hi, ${localRes.admin.res.name} welcome!!! `)

    cy.wait(3000)

    cy.get(locator.htmlTag.head1Tag).find(locator.htmlTag.spanTag).contains(localRes.admin.res.name)

    cy.get('.menu').should('be.visible')

  })
})
