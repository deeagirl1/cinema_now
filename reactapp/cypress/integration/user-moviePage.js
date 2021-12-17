
 describe("renders the movie page", ()=> {
  beforeEach(() => {
    cy.login("andreea","123456");
  });
    it("renders page correctly", ()=> {
      cy.visit("/schedule")


      /* ==== Generated with Cypress Studio ==== */
      cy.get(':nth-child(1) > .card > .card-body > .card-text > div > .btn').click();
      cy.get('#ticketType').select('1');
      cy.get('#amountOfPeople').clear();
      cy.get('#amountOfPeople').type('5');
      cy.get('#submit').click();
      /* ==== End Cypress Studio ==== */
    })
})
