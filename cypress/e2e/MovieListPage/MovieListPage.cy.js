/// <reference types="cypress" />
context('E2E Test of MovieListPage Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('should render the initial list of movies', () => {
        cy.wait(1000);
        cy.get('[data-testid="movie-list"]').should('be.visible');
        cy.get('[data-testid="movie-tile"]').should('have.length.greaterThan', 0);
    });

    it('should filter movies by genre', () => {
        const genreToSelect = 'action';
        cy.get('[data-testid="genre"]').contains(genreToSelect).click();
        cy.wait(1000);
        cy.location('search').should('include', `searchBy=genres&search=${genreToSelect}`);
        cy.get('[data-testid="movie-tile"]').should('have.length.greaterThan', 0);
    });

    it('should sort movies by title', () => {
        cy.get('[data-testid="sortControl"').select('1'); // Assuming select element
        cy.get('[data-testid="sortControl"]').should('have.value', '1');
        cy.get('[data-testid="sortControl"]').trigger('change');
        cy.wait(1000);
        cy.location('search').should('include', 'sortBy=title');
        cy.get('[data-testid="movie-tile"]').should('have.length.greaterThan', 0);
    });

    it('should sort movies by release date', () => {
        cy.get('[data-testid="sortControl"').select('0');
        cy.get('[data-testid="sortControl"]').should('have.value', '0');
        cy.get('[data-testid="sortControl"]').trigger('change');
        cy.wait(1000);
        cy.location('search').should('include', 'sortBy=release_date');
        cy.get('[data-testid="movie-tile"]').should('have.length.greaterThan', 0);
    });

    it('should filter movies based on search query', () => {
        const searchTerm = 'zoo';
        cy.get('[data-testid="search-input"]').type(searchTerm);
        cy.wait(1000);
        cy.get('[data-testid="search-button"]').click();
        cy.wait(1000);
        cy.location('search').should('include', 'search=zoo');
        cy.get('[data-testid="movie-tile"]').should('have.length.greaterThan', 1);
    });

    it('should show movie page by clicking on movie tile', () => {
        cy.get('[data-testid="movie-tile"]').first().click();
        cy.wait(1000);
        cy.location('href').should('include', `/movie/`);
        cy.get('[data-testid="movie-details"]').should('be.visible');
    });

    it('should return to search by clicking on search button', () => {
        cy.get('[data-testid="search-button"]').first().click();
        cy.wait(1000);
        cy.location('href').should('not.include', '/movie');
        cy.get('[data-testid="search-container"]').should('be.visible');
    });
});
