describe('Case for Network Error', () => {

    beforeEach(() => {
        cy.visit('/')

        cy
        .get(':nth-child(2) > .btn')
        .click()
    })


    // it('Mocking the userList - statusCode:200', () => {


    //     cy.intercept(
    //         {
    //             method: 'GET',
    //             url: 'https://reqres.in/api/users?page=1',
    //         },
    //         //Mockinging for 200
    //         // {
    //         //     statusCode: 200,  
    //         //     message: 'Ok',
    //         //     fixture: 'success/200.json'
    //         // }

    //         //Mockinging for 201
    //         {
    //             statusCode: 201,
    //             message: 'Created',
    //             fixture: 'success/201.json',
    //         },
    //         {
    //             passThrough: false
    //         }

    //         //Mockinging for 301
    //         // {
    //         //     statusCode: 301,
    //         //     message: 'Permanent Redirect',
    //         //     fixture: 'errors/301.json'
    //         // }

    //         //Mockinging for 302
    //         // {
    //         //     statusCode: 302,
    //         //     message: 'Bad Gateway Requests',
    //         //     fixture: 'errors/302.json'
    //         // }

    //         //Mockinging for 404
    //         // {
    //         //     statusCode: 404,
    //         //     message: 'Not Found',
    //         //     fixture: 'errors/404.json'
    //         // }

    //         //Mockinging for 500
    //         // {
    //         //     statusCode: 500,
    //         //     message: 'Internal Server Error',
    //         //     fixture: 'errors/500.json'
    //         // }
    //     ).as('getUsers')
    //     // cy.intercept('https://reqres.in/api/users?page=1').as('getUsers')

    //     cy.visit('/')

    //     cy
    //         .get(':nth-child(2) > .btn')
    //         .click()
    //         .wait('@getUsers', { timeout: 20000 })
    //         .then((xhr) => {
    //             if (JSON.stringify(xhr.response.statusCode) == 200) {
    //                 expect(xhr.response.statusCode).to.eq(200)
    //                 cy.log(JSON.stringify(xhr.response.body))
    //             } else if (JSON.stringify(xhr.response.statusCode) == 301) {
    //                 expect(xhr.response.statusCode).to.eq(301)
    //                 cy.log(JSON.stringify(xhr.response.body))
    //             } else if (JSON.stringify(xhr.response.statusCode) == 302) {
    //                 expect(xhr.response.statusCode).to.eq(302)
    //                 cy.log(JSON.stringify(xhr.response.body))
    //             } else if (JSON.stringify(xhr.response.statusCode) == 404) {
    //                 expect(xhr.response.statusCode).to.eq(404)
    //                 cy.log(JSON.stringify(xhr.response.body.message))
    //             } else if (JSON.stringify(xhr.response.statusCode) == 500) {
    //                 expect(xhr.response.statusCode).to.eq(500)
    //                 cy.log(JSON.stringify(xhr.response.body.message))
    //             } else {
    //                 cy.log(JSON.stringify(xhr.response.statusCode))
    //             }

    //         })

    // })

    it('Mocking the userList - statusCode:200', () => {
        
        cy
        .intercept({
                method: 'GET',
                url: 'https://reqres.in/api/users?page=1',
            },
            {
                statusCode: 200,
                message: 'Ok',
                fixture: 'success/200.json',
            },
            {
                passThrough: false
            })
            .as('getUsers')

    })

    it('Mocking the userList - statusCode:201', () => {
        
        cy
        .intercept({
                method: 'GET',
                url: 'https://reqres.in/api/users?page=1',
            },
            {
                statusCode: 201,
                message: 'Created',
                fixture: 'success/201.json',
            },
            {
                passThrough: false
            })
            .as('getUsers')

    })

    it('Mocking the userList - statusCode:301', () => {
        
        cy
        .intercept({
                method: 'GET',
                url: 'https://reqres.in/api/users?page=1',
            },
            {
                statusCode: 301,
                message: 'Permanent Redirect',
                fixture: 'errors/301.json'
            },
            {
                passThrough: false
            })
            .as('getUsers')

    })

    it('Mocking the userList - statusCode:302', () => {
        
        cy
        .intercept({
                method: 'GET',
                url: 'https://reqres.in/api/users?page=1',
            },
            {
                statusCode: 302,
                message: 'Bad Gateway Requests',
                fixture: 'errors/302.json'
            },
            {
                passThrough: false
            })
            .as('getUsers')

    })

    it('Mocking the userList - statusCode:404', () => {
        
        cy
        .intercept({
                method: 'GET',
                url: 'https://reqres.in/api/users?page=1',
            },
            {
                statusCode: 404,
                message: 'Not Found',
                fixture: 'errors/404.json'
            },
            {
                passThrough: false
            })
            .as('getUsers')

    })

    it('Mocking the userList - statusCode:500', () => {
        
        cy
        .intercept({
                method: 'GET',
                url: 'https://reqres.in/api/users?page=1',
            },
            {
                statusCode: 500,
                message: 'Internal Server Error',
                fixture: 'errors/500.json'
            },
            {
                passThrough: false
            })
            .as('getUsers')

    })


    afterEach(() => {
        cy
        .wait('@getUsers', { timeout: 50000 })
        .then((xhr) => {
            if (JSON.stringify(xhr.response.statusCode) == 200) {
                expect(xhr.response.statusCode).to.eq(200)
                cy.log(JSON.stringify(xhr.response.body))
            } else if (JSON.stringify(xhr.response.statusCode) == 301) {
                expect(xhr.response.statusCode).to.eq(301)
                cy.log(JSON.stringify(xhr.response.body))
            } else if (JSON.stringify(xhr.response.statusCode) == 302) {
                expect(xhr.response.statusCode).to.eq(302)
                cy.log(JSON.stringify(xhr.response.body))
            } else if (JSON.stringify(xhr.response.statusCode) == 404) {
                expect(xhr.response.statusCode).to.eq(404)
                cy.log(JSON.stringify(xhr.response.body.message))
            } else if (JSON.stringify(xhr.response.statusCode) == 500) {
                expect(xhr.response.statusCode).to.eq(500)
                cy.log(JSON.stringify(xhr.response.body.message))
            } else {
                cy.log(JSON.stringify(xhr.response.statusCode))
            }

        })
    })


})