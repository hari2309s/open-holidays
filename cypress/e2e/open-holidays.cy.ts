describe('Open holidays application', () => {
    it('opens homepage and renders elements, and their values correctly', () => {
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
        cy.get('[data-testid="list-header"]').should('be.visible');

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

        // renders public holidays for Germany by default
        // list header
        cy.get('[data-testid="list-header"]')
            .contains('Public holidays in Germany')
            .should('be.visible');

        // list item
        cy.get('[data-testid="holiday-list-item"]')
            .contains(`New Year's Day`)
            .should('be.visible');
    });

    it('choosing German from language dropdown translates the content of the application to German', () => {
        cy.visit('/');

        // select German from the drop down
        cy.get('[data-testid="language-selector"]').click();
        cy.get('[data-testid="option-de"]').contains('German').click();

        // application title
        cy.get('[data-testid="app-title"]')
            .contains('Feiertage')
            .should('to.be.visible');

        // button text
        cy.get('[data-testid="show-button"]')
            .contains('Anzeigen')
            .should('be.visible');

        // list header
        cy.get('[data-testid="list-header"]').should('be.visible');

        // list sub headers
        cy.get('[data-testid="list-subheader-holidays"]')
            .contains('Ferientag')
            .should('be.visible');
        cy.get('[data-testid="list-subheader-dates"]')
            .contains('Dates')
            .should('be.visible');
        cy.get('[data-testid="list-subheader-duration"]')
            .contains('Laufzeit')
            .should('be.visible');
        cy.get('[data-testid="list-subheader-type"]')
            .contains('Typ')
            .should('be.visible');

        // renders public holidays for Germany by default
        // list header
        cy.get('[data-testid="list-header"]')
            .contains('Feiertage in Deutschland')
            .should('be.visible');

        // list item
        cy.get('[data-testid="holiday-list-item"]')
            .contains(`Neujahr`)
            .should('be.visible');
    });

    it('using form elements to get new set of results', () => {
        cy.visit('/');

        cy.get('[data-testid="country-selector"]').click();
        cy.get('[data-testid="option-AT"]').contains('Austria').click();
        cy.get('.css-1w9oans-MuiFormControl-root-MuiTextField-root')
            .eq(0)
            .type('01.01.2022');
        cy.get('.css-1w9oans-MuiFormControl-root-MuiTextField-root')
            .eq(1)
            .type('31.12.2023');
        cy.get('[data-testid="show-button"]').click();

        // list header
        cy.get('[data-testid="list-header"]')
            .contains('Public holidays in Austria')
            .should('be.visible');

        // change holiday type from the drop down
        cy.get('[data-testid="holiday-type-selector"]').click();
        cy.get('[data-testid="option-School"]')
            .contains('School holidays')
            .click();

        cy.get('[data-testid="show-button"]').click();

        // list header
        cy.get('[data-testid="list-header"]')
            .contains('School holidays in Austria')
            .should('be.visible');
    });
});
