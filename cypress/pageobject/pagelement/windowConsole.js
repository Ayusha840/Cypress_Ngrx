
class windowConsole {

    error(path) {

        Cypress.on('window:before:load', (win) => {
            cy.spy(win.console, 'error').as('windowErrorSpy');
        });

        describe('Console Error Checks', () => {
            cy.visit(
                `${path}`
            )
            cy.wait(1000).then(() => {
                cy.get('@windowErrorSpy').should('not.to.be.called');
            });

        })

    }

    warning(path) {

        Cypress.on('window:before:load', (win) => {
            cy.spy(win.console, 'warn').as('windowWarningSpy');
        });

        describe('Console Warning Checks', () => {
            cy.visit(
                `${path}`
            )
            cy.wait(1000).then(() => {
                cy.get('@windowWarningSpy').should('not.to.be.called');
            });

        })

    }

    log(path) {

        Cypress.on('window:before:load', (win) => {
            cy.spy(win.console, 'log').as('windowLogSpy');
        });

        describe('Console Log Checks', () => {
            cy.visit(
                `${path}`
            )
            cy.wait(1000).then(() => {
                cy.get('@windowLogSpy').should('not.to.be.called');
            });

        })

    }

}

module.exports = new windowConsole()