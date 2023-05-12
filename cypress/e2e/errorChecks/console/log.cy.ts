let windowLogSpy: Cypress.Agent<sinon.SinonSpy<any[], any>>;

Cypress.on('window:before:load', (win) => {
  cy.spy(win.console, 'log').as('windowLogSpy');
});

describe('Console log checks', () => {
  
  beforeEach(() => {
    cy.visit(
      '/'
    )
    cy.wait(1000).then(() => {
      
        cy.get('@windowLogSpy').should('not.to.be.called'); 

    });
  });

  it('Visit main Users page', () => {
    
    cy.get(':nth-child(2) > .btn').click()
    cy.contains('User List')

  })
})