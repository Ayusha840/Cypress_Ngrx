let windowErrorSpy: Cypress.Agent<sinon.SinonSpy<any[], any>>;

Cypress.on('window:before:load', (win) => {
  cy.spy(win.console, 'error').as('windowErrorSpy');
});

describe('Console Error Checks', () => {
  
  beforeEach(() => {
    cy.visit(
      '/'
    )
    cy.wait(1000).then(() => {

      cy.get('@windowErrorSpy').should('not.to.be.called'); 
      
    });
  });

  it('Visit main Users page', () => {

    cy.get(':nth-child(2) > .btn').click()
    cy.contains('User List')
  
  })
})

// export default;