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
        cy.location('href').should('include', `/movies/`);
        cy.get('[data-testid="movie-details"]').should('be.visible');
    });

    it('should return to search by clicking on search button', () => {
        cy.get('[data-testid="search-button"]').first().click();
        cy.wait(1000);
        cy.location('href').should('not.include', '/movies');
        cy.get('[data-testid="search-container"]').should('be.visible');
    });

    it('should show add movie form by clicking on add movie button', () => {
        cy.get('[data-testid="add-movie"]').first().click();
        cy.wait(1000);
        cy.location('href').should('include', '/new');
        cy.get('[data-testid="movie-form-modal"]').should('be.visible');
        cy.get('[data-testid="movie-form-modal"]').contains('h2', 'ADD MOVIE')
    });

    it('should filling and resetting form', () => {
        cy.get('[data-testid="add-movie"]').first().click();
        cy.wait(1000);
        cy.location('href').should('include', '/new');
        cy.get('[data-testid="movie-form-modal"]').should('be.visible');

        cy.get("#title").type("new movie")
        cy.get("#release_date").type("1990")
        cy.get("#vote_average").type("8")
        cy.get("#genres").select('comedy')
        cy.get("#runtime").type("120")
        cy.get("#overview").type("new movie description")
        cy.get("#poster_path").type("https://upload.wikimedia.org/wikipedia/en/8/8d/FrankDrebin.jpg")

        cy.get('input[type="reset"]').first().click()
        cy.get("#title").should('be.empty')
    });

    it('should show not passing validation of genre field', () => {
        cy.get('[data-testid="add-movie"]').first().click();
        cy.wait(1000);
        cy.location('href').should('include', '/new');
        cy.get('[data-testid="movie-form-modal"]').should('be.visible');
        cy.get('input[type="submit"]').first().click()
        cy.get('[data-testid="genre-row"]').contains('div', 'Select at least one genre to proceed')
    });

    it('should create a new movie by filling and submitting form', () => {
        cy.get('[data-testid="add-movie"]').first().click();
        cy.wait(1000);
        cy.location('href').should('include', '/new');
        cy.get('[data-testid="movie-form-modal"]').should('be.visible');
        const movieName = "new movie";
        cy.get("#title").type(movieName)
        cy.get("#release_date").type("1990")
        cy.get("#vote_average").type("8")
        cy.get("#genres").select('comedy')
        cy.get("#runtime").type("120")
        cy.get("#overview").type("new movie description")
        cy.get("#poster_path").type("https://upload.wikimedia.org/wikipedia/en/8/8d/FrankDrebin.jpg")

        cy.get('input[type="submit"]').first().click()
        cy.wait(1000);
        cy.get('[data-testid="success-modal"]').should('be.visible');
        cy.get('[data-testid="close-dialog"]').first().click();

        cy.location('href').should('include', `/movies/`);
        cy.get('[data-testid="movie-details"]').should('be.visible');
        cy.get('[data-testid="movie-details"]').contains('span', movieName)
    });

    it('should delete movie by clicking on delete button in submenu of movie tile', () => {
        cy.get('[data-testid="movie-tile"]').first().find('[role="showMenuButton"]').click();
        cy.get('[data-testid="movie-tile"]').first().find('[role="subMenu"]').should('be.visible');
        cy.get('[data-testid="movie-tile"]').first().find('[role="subMenu"]').find('ul').contains('li', 'Delete').click()
        cy.wait(1000);
        cy.get('[data-testid="delete-movie-dialog"]').should('be.visible');
        cy.get('[data-testid="delete-movie-dialog"]').find('button').click();
        cy.wait(1000);
    });

    it('should edit movie by clicking on edit button in submenu of movie tile', () => {
        cy.get('[data-testid="movie-tile"]').first().find('[role="showMenuButton"]').click();
        cy.get('[data-testid="movie-tile"]').first().find('[role="subMenu"]').should('be.visible');
        cy.get('[data-testid="movie-tile"]').first().find('[role="subMenu"]').find('ul').contains('li', 'Edit').click()
        cy.wait(1000);
        cy.wait(1000);
        cy.location('href').should('include', '/edit');
        cy.get('[data-testid="movie-form-modal"]').should('be.visible');

        const movieName = "new movie";
        cy.get("#title").type(movieName)
        cy.get("#release_date").type("1990")
        cy.get("#vote_average").type("8")
        cy.get("#genres").select('comedy')
        cy.get("#runtime").type("120")
        cy.get("#overview").type("new movie description")
        cy.get("#poster_path").type("https://upload.wikimedia.org/wikipedia/en/8/8d/FrankDrebin.jpg")

        cy.get('input[type="submit"]').first().click()
    });
});
