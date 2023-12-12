describe('login page', () => {
  it('should ', () => {
    Cypress.visit('http://localhost:3000/')

    cy.get('[data-cy=username]').type('your_valid_username');
    cy.get('[data-cy=password]').type('your_valid_password');

    // Click the login button
    cy.get('[data-cy=loginbutton]').click();
  })
})


// cypress/integration/login.spec.js

describe('Login Page', () => {
  it('should log in successfully with valid credentials', () => {
    // Visit the login page
    cy.visit('/login');

    // Input valid credentials
    cy.get('[data-cy=username]').type('shashank');
    cy.get('[data-cy=password]').type('shashank1105');

    // Click the login button
    cy.get('[data-cy=loginbutton]').click();

    // Check if navigation to the home page occurred
    cy.url().should('include', '/home');

    // Check if the token is stored in local storage
    cy.window().its('localStorage').invoke('getItem', 'token').should('exist');
  });

  it('should display an error message with invalid credentials', () => {
    // Visit the login page
    cy.visit('/login');

    // Input invalid credentials
    cy.get('[data-cy=username]').type('invalid_username');
    cy.get('[data-cy=password]').type('invalid_password');

    // Click the login button
    cy.get('[data-cy=loginbutton]').click();

    // Check if an error message is displayed
    cy.get('[data-cy=login-message]').should('contain', 'Invalid username or password');
  });
});
