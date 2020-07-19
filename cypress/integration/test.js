describe('Form Test', function(){
    it('tests to see for required parameters for MVP', function(){
        cy.visit("index.html");
        cy.get('#name').type('Brittany');
        cy.get('#tomato').check();
        cy.get('#xcheese').check();
        cy.get('#pepperoni').check();
        cy.get('#submit-button').click();
    })
})