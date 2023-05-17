/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import "@testing-library/cypress/add-commands"
import * as CryptoJS from "crypto-js"
import { environment } from "src/environment/environment"

//-------- set localstorage common function
Cypress.Commands.add("setToken", (key: string, value) => {
    cy.window().then((window) => {
        const token = CryptoJS.AES.encrypt(JSON.stringify(value), environment.S_KEY)
            .toString()
            .replace("+", "xMl3Jk")
            .replace("/", "Por21Ld")
            .replace("=", "Ml32")
            .replace("+", "xMl3Jk")
            .replace("/", "Por21Ld")
            .replace("=", "Ml32")
            .replace("+", "xMl3Jk")
            .replace("/", "Por21Ld")
            .replace("=", "Ml32")

        window.localStorage.setItem(key, token)
    })
})

//-------- get localstorage data
Cypress.Commands.add("getToken", (key: string) => {
    cy.window().then((window) => {
        const local:any = window.localStorage.getItem(key)
        if(local){
            const bcrypt = CryptoJS.AES.decrypt(
                local
                    .replace("xMl3Jk", "+")
                    .replace("Por21Ld", "/")
                    .replace("Ml32", "=")
                    .replace("xMl3Jk", "+")
                    .replace("Por21Ld", "/")
                    .replace("Ml32", "=")
                    .replace("xMl3Jk", "+")
                    .replace("Por21Ld", "/")
                    .replace("Ml32", "="),
                environment.S_KEY,
            )
            if (bcrypt.toString()) {
      
                return JSON.parse(bcrypt.toString(CryptoJS.enc.Utf8))
            }
            return local 
        }
        return false;
    })
})

//-------- function for removing localstorage

Cypress.Commands.add("removeToken", (key: string) => {
    cy.window().then((window) => {
        window.localStorage.removeItem(key)
    })
})
