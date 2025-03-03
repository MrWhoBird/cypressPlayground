/// <reference types="Cypress" />

describe('Green Kart Basic Tests', function(){
    it('Initial test order', function(){
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(1000)
        cy.get('.product:visible').should('have.length', 4)
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').should('have.length', 4)
        cy.get(':nth-child(2) > .product-action > button').click()
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click()
        cy.get('@productLocator').find('.product').each($el => {
            //const textVeg = $el.find('.product-name').text()
            // if(textVeg.includes('Cashews')){
            //     cy.wrap($el).find('button').click()
            // }
            if($el.text().includes('Cashews')){
                cy.wrap($el).find('button').click()
            }
        })
        cy.get('.brand').should('have.text','GREENKART')
        cy.get('.brand').then((logoelement) => {
            cy.log(logoelement.text())
        })
        
        cy.get('.brand').each($el => {
            //const text = $el.text()
            if($el.text().includes('KART')){
                cy.wrap($el).click()
            }
        })

        //cy.get('.brand').text()
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
    })
})