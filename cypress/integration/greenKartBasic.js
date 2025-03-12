/// <reference types="Cypress" />

describe('Green Kart Basic', function () {

    it('Test shopping flow', function () {

        cy.visit(Cypress.env('url') + 'seleniumPractise/#/')
        //type in 'ca'
        cy.get('.search-keyword').type('ca')
        cy.wait(1000)
        //assert amount of products
        cy.get('.product:visible').should('have.length', 4)
        //alias
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').should('have.length', 4)
        //add products to cart with different methods
        cy.get(':nth-child(2) > .product-action > button').click()
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click()
        cy.get('@productLocator').find('button').eq(0).click()
        cy.get('@productLocator').find('.product').each(el => {
            el.text().includes('Cashews') ? cy.wrap(el).find('button').click() : true
        })
        //assert logo
        cy.get('.brand').should('have.text', 'GREENKART')
        cy.get('.brand').then(logoelement => cy.log(logoelement.text()))
        cy.get('.brand').each(el => {
            el.text().includes('KART') ? cy.wrap(el).click() : true
        })
        //go to cart
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
    })

    it('Test calendar', function () {

        cy.visit(Cypress.env('url') + 'seleniumPractise/#/offers')
        
        //calendar const
        const monthNumber = "6";
        const date = "15";
        const year = "2027";
        const expectedList = [monthNumber, date, year];
        //set the date
        cy.get(".react-date-picker__inputGroup").click();
        cy.get(".react-calendar__navigation__label").click();
        cy.get(".react-calendar__navigation__label").click();
        cy.contains("button", year).click();
        cy.get(".react-calendar__year-view__months__month").eq(Number(monthNumber) - 1).click();
        cy.contains("abbr", date).click();
        //assertion
        cy.get(".react-date-picker__inputGroup__input").each((el, index) => {
            cy.wrap(el).invoke('val').should('eq', expectedList[index]);
        })
    })
})