describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should show validation errors for empty form submission', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.text-red-600').should('be.visible')
  })

  it('should login successfully with valid credentials', () => {
    cy.get('#email').type('client@test.com')
    cy.get('#password').type('client123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })

  it('should show error message for invalid credentials', () => {
    cy.get('#email').type('wrong@email.com')
    cy.get('#password').type('wrongpass')
    cy.get('button[type="submit"]').click()
    cy.get('.text-red-600').should('be.visible')
    cy.contains('Invalid credentials')
  })
})