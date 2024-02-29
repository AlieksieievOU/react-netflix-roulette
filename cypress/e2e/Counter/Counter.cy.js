/// <reference types="cypress" />
context('E2E Test Counter Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Counter Component should have 2 button elements', () => {
        cy.get('.counterBody > button')
            .its('length')
            .should('be.lt', 3);
    });

    it('Counter Component buttons should have right css classes', () => {
        cy.get('.counterBody').within(() => {
            cy.get('button:first').should('have.attr', 'class', 'increaseButton')
            cy.get('button:last').should('have.attr', 'class', 'decreaseButton')
        })
    });

    it('Counter Component buttons should change value of .counterLabel element', () => {
        cy.get('.counterBody').within(() => {
            cy.get('button:first').click();
            cy.wait(1000);
            cy.get('.counterLabel').should('contain', '1');
            cy.get('button:last').click();
            cy.wait(1000);
            cy.get('.counterLabel').should('contain', '0');
        })
    })
});