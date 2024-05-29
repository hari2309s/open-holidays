describe('Open holidays application', () => {
    it('opens homepage', () => {
        cy.visit('/');

        // language selector
        cy.get('[data-testid="language-selector"]').should('be.visible');

        // application title
        cy.get('[data-testid="app-title"]')
            .contains('Holidays')
            .should('to.be.visible');

        // form elements
        cy.get('[data-testid="country-selector"]').should('be.visible');
        cy.get('.css-1w9oans-MuiFormControl-root-MuiTextField-root').should(
            'be.visible',
        );
        cy.get('.css-1w9oans-MuiFormControl-root-MuiTextField-root').should(
            'have.length',
            2,
        );
        cy.get('[data-testid="holiday-type-selector"]').should('be.visible');
        cy.get('[data-testid="show-button"]').should('be.visible');

        // list header
        cy.get('[data-testid="list-header"]')
            .contains('Public holidays in Germany')
            .should('be.visible');

        // list sub headers
        cy.get('[data-testid="list-subheader-holidays"]')
            .contains('Holidays')
            .should('be.visible');
        cy.get('[data-testid="list-subheader-dates"]')
            .contains('Dates')
            .should('be.visible');
        cy.get('[data-testid="list-subheader-duration"]')
            .contains('Duration')
            .should('be.visible');
        cy.get('[data-testid="list-subheader-type"]')
            .contains('Type')
            .should('be.visible');
    });
});
