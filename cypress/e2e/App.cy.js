/// <reference types="cypress" />
context('E2E Test of app Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('app should create a main wrapper with css class app', () => {
        cy.wait(1000);
        cy.get('#root').within(() => {
            cy.get('div:first').should('have.attr', 'class', 'App')
        })
    })
});
