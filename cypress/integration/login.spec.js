/**
 * @link npx cypress run --spec "cypress/integration/login.spec.js"
 * @author Igor Stotskyy
 */

import { base } from "../support/page-objects/base"

describe('Check content of Login page and valid and invalid user credentials', () => {

        it('Check Login page content', () => {
            cy.visit('login');
            cy.url().should('include', 'login');

            cy.fixture("text-messages").then((text) => {
                base.expectText({ element: base.title, text: text.loginPage })
            })
            cy.fixture("text-labels").then((text) => {
                base.expectText({ element: base.loginFormLabels.userName, text: text.userName })
                base.expectText({ element: base.loginFormLabels.password, text: text.password })
            })

        });

        it('Check Login form with Invalid and Valid user credentials', () => {

            // Invalid username and Valid password
            cy.fixture("credential").then((credentials) => {
                base.fillField({ element: base.loginForm.userName, data: credentials.invalidUserName })
                base.fillField({ element: base.loginForm.password, data: credentials.password })
            })
            base.clickElement({ element: base.submit })
            cy.fixture("text-messages").then((text) => {
                base.expectText({ element: base.flashMessage, text: text.invalidUsernameMessage })
            })

            // Valid username and Invalid password
            cy.fixture("credential").then((credentials) => {
                base.fillField({ element: base.loginForm.userName, data: credentials.userName })
                base.fillField({ element: base.loginForm.password, data: credentials.invalidPassword })
            })
            base.clickElement({ element: base.submit })
            cy.fixture("text-messages").then((text) => {
                base.expectText({ element: base.flashMessage, text: text.invalidPasswordMessage })
            })

        });


        it('Check Login page with Valid user credentials and Content of Welcome Secure page', () => {

            cy.fixture("credential").then((credentials) => {
                base.fillField({ element: base.loginForm.userName, data: credentials.userName })
                base.fillField({ element: base.loginForm.password, data: credentials.password })
            })
            base.clickElement({ element: base.submit })
            cy.log('Successful login')
            cy.url().should('include', 'secure');

            // Content of Welcome Secure page
            cy.fixture("text-messages").then((text) => {
                base.expectText({ element: base.flashMessage, text: text.successMessage })
                base.expectText({ element: base.title, text: text.secureTitle })
                base.expectText({ element: base.subTitle, text: text.secureSubTitle })
            })

            // Logout
            base.clickElementByText({ element: base.logout })
            cy.log('Successful logout')

        });

});