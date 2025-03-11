/// <reference types="Cypress" />

describe('Mocking playground', function () {

    it('Mock the response', function () {

        cy.LoginAPI().then(function () {
            //cy.visit("https://rahulshettyacademy.com/client",
            cy.visit(Cypress.env('url')+'client',
                {
                    onBeforeLoad: function (window) {
                        window.localStorage.setItem('token', Cypress.env('token'))
                    }
                })
        })
        cy.get('.btn.w-10.rounded').eq(2).click()
        cy.get('.card-body').each(el => {
            el.text().includes('ZARA') ? cy.wrap(el).find('button').contains('Add').click() : true
        })
        cy.contains('Cart').click()
        cy.contains('Checkout').click()
        cy.get('.form-group > .input').type('ind')
        cy.get('.ta-results button').each( res => {
            res.text() === ' India' ? cy.wrap(res).click() : true
        })
        cy.contains('Place Order ').click()
        cy.wait(2000)
        cy.contains('CSV').click()
    })

})

