describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Lucas',
      username: 'paiput',
      password: 'paiputpassword'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Log in to view all blogs');
    cy.contains('login');
  });

  describe('Login', function() {
    it('succeds with correct credentials', function() {
      cy.get('#username').type('paiput');
      cy.get('#password').type('paiputpassword');
      cy.contains('login').click();

      cy.contains('Lucas logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('paiput');
      cy.get('#password').type('wrongpassword');
      cy.contains('login').click();

      cy.get('.notification > p')
        .should('contain', 'invalid')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});