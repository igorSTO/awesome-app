/// <reference types="cypress" />

export class Base {
    constructor() {
        this.submit = '[type="submit"]';
        this.logout = 'Logout'
        this.flashMessage = '#flash';
        this.title = 'h2';
        this.subTitle = '.subheader';

        this.loginForm = {
            userName: '#username',
            password: '#password'
        }

        this.loginFormLabels = {
            userName: '[for="username"]',
            password: '[for="password"]'
        }
    }

    clickElementByText({ element = '', index = 0 }) {
        cy.contains(element).eq(index).click({ force: true });
    }

    clickElement({ element = '', index = 0 }) {
        cy.get(element).eq(index).click({ force: true });
    }

    fillField({ element = '', index = 0, data = '' }) {
        cy.get(element).eq(index).clear({ force: true }).type(data, { force: true });
    }

    expectText({ element = '', text = '' }) {
        cy.get(element).should('contain', text)
    }

}

export const base = new Base();