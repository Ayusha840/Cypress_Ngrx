import HeaderAction from '../pageobject/pageaction/headerAction'
import UserAction from '../pageobject/pageaction/userAction'
const locator = require('../locator.json')
describe('Case for user Component', () => {
  const headerAction = new HeaderAction()
  const userAction = new UserAction()

  beforeEach(() => {
    cy.fixture('login/loginRes').then((item) => {
    
      cy.setToken('loginToken', item.support.res)

    })
    headerAction.navigationTo(locator.links.userTab)

    //------ get data from list
    cy.fixture('user/apiuser').then((item) => {
      globalThis.apiuser = item

      cy.intercept(
        {
          method: 'GET',
          url: `user`,
        },
        {
          statusCode: 200,
          body: apiuser,
        },
        { passthrough: false },
      ).as('List')
    })

    //------ get data for set in to form
    cy.fixture('user/delRes').then((item) => {
      globalThis.delRes = item
    })

    //------ call fixture for getting mock update deatail data
    cy.fixture('user/updateuser').then((item) => {
      globalThis.updateuser = item
    })

    //------ call fixture for getting mock post response data
    cy.fixture('user/postRes').then((item) => {
      globalThis.postRes = item
    })
  })

  /**
   * test case for getting mock list from fixture
   */
  it('should go to userList', () => {
    cy.get('@List')

    cy.get(locator.htmlTag.cardTag).should('have.length', 2)
    cy.wait(5000)
  })

  /**
   * test case for create new user
   */
  it('should create new user', () => {
    //------ click to add button at top to redirect to add user
    userAction.clickActionBtn('add')

    //------ getting post response to show after create new user in to list
    cy.intercept(
      {
        method: 'GET',
        url: `user`,
      },
      {
        statusCode: 200,
        body: postRes,
      },
      { passthrough: false },
    ).as('postRes')

    //------ call api with new user data
    cy.intercept(
      {
        method: 'POST',
        url: `user`,
      },
      {
        statusCode: 201,
        body: postRes[2],
      },
      { passthrough: false },
    ).as('addPost')

    //------ function for set new user value in to the form
    userAction.createUser(postRes[2])

    //------ call api for create new user
    cy.get('@addPost')

    //------ call response api to show list with new data
    cy.get('@postRes')

    //------ check test case
    cy.get(locator.htmlTag.cardTag).should('have.length', 3)

    cy.wait(5000)
  })

  /**
   * test case for update user
   */
  it('should update user data', () => {
    //------ click button on list to redirect to update user form
    userAction.clickActionBtn('update')

    //------ redirect function from list to update form
    headerAction.navigationTo(
      `${locator.links.updateUserTab}/${apiuser[0]._id}`,
    )

    //------ call api for getting mock detail data
    cy.intercept('GET', `user/${apiuser[0]._id}`, { passthrough: false }).as(
      'userDetail',
    )
    cy.get('@userDetail')

    //------ function for set form value
    userAction.updateUser(apiuser[0])

    //------ wait for 4 seconds
    cy.wait(4000)

    //------ call update user api

    cy.intercept(
      {
        method: 'PUT',
        url: `user/${apiuser[0]._id}`,
      },
      {
        statusCode: 201,
        body: updateuser[0],
      },
      { passthrough: false },
    ).as('userDetail')

    cy.intercept(
      {
        method: 'GET',
        url: `user`,
      },
      {
        statusCode: 200,
        body: updateuser,
      },
      { passthrough: false },
    ).as('updateRes')

    cy.get('@updateRes')
    //------ function for set update value in form
    userAction.createUser(updateuser[0])
    cy.get('@userDetail')

    cy.wait(5000)
  })

  /**
   * test case for delete user
   */
  it('delete user', () => {
    cy.intercept('DELETE', `user/${apiuser[0]._id}`, { passthrough: false }).as(
      'delItem',
    )

    cy.intercept('GET', '/user', { fixture: 'user/apiuser.json' }).as('List')

    userAction.deleteUser().click()

    cy.get('@List')

    cy.get('@delItem')

    cy.intercept('GET', 'user', { fixture: 'user/delRes.json' }).as('delRes')

    cy.get('@delRes')

    cy.get(locator.htmlTag.cardTag).should('have.length', 1)
  })
})
