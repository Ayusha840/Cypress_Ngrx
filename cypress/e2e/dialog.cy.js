// import windowConsole from "../pageobject/pagelement/windowConsole"

describe('Case for Dialog', () => {

    it('Visits the album page', () => {
        cy.visit('/dashboard/album')

        cy.get('[data-bs-toggle="modal"]').click()
        cy.wait(500)
        // cy.get('.btn-secondary').click()
    })

    // beforeEach(() => {
    //     windowConsole.error('/dashboard/album')
    // })
})
