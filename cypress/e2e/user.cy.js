import { async } from 'rxjs'
import HeaderAction from '../pageobject/pageaction/headerAction'
import UserAction from '../pageobject/pageaction/userAction'
const locator = require('./../locator.json')
describe('Case for user Component', () => {
  const headerAction = new HeaderAction()
  const userAction = new UserAction();
  beforeEach(() => {
    headerAction.navigationTo(locator.links.userTab)
  })
  it('should go to userList', () => {
    cy.get(locator.htmlTag.cardTag).should('have.length', 6)
  })

  it('delete user',()=>{
    cy.get(locator.htmlTag.cardTag).should('have.length', 6)
    userAction.deleteUser(2)
    cy.get(locator.htmlTag.cardTag).should('have.length', 5)
    userAction.deleteUser(48029358)
    cy.get(locator.htmlTag.cardTag).should('have.length', 5)

  })
})
