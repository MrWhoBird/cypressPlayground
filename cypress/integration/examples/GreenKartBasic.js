/// <reference types="Cypress" />

describe('Green Kart Basic', function () {
    it('Test shopping flow', function () {

        cy.visit(Cypress.env('url') + 'seleniumPractise/#/')

        cy.get('.search-keyword').type('ca')
        cy.wait(1000)
        cy.get('.product:visible').should('have.length', 4)
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').should('have.length', 4)
        cy.get(':nth-child(2) > .product-action > button').click()
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click()
        cy.get('@productLocator').find('.product').each(el => {
            //const textVeg = $el.find('.product-name').text()
            // if(textVeg.includes('Cashews')){
            //     cy.wrap($el).find('button').click()
            // }
            el.text().includes('Cashews') ? cy.wrap(el).find('button').click() : true
        })
        cy.get('.brand').should('have.text', 'GREENKART')
        cy.get('.brand').then((logoelement) => {
            cy.log(logoelement.text())
        })

        cy.get('.brand').each(el => {
            //const text = $el.text()
            el.text().includes('KART') ? cy.wrap(el).click() : true
        })

        //cy.get('.brand').text()
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
    })

    it('Test calendar', function () {

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");

        const monthNumber = "6";
        const date = "15";
        const year = "2027";
        const expectedList = [monthNumber, date, year];
        
        
        cy.get(".react-date-picker__inputGroup").click();
        cy.get(".react-calendar__navigation__label").click();
        cy.get(".react-calendar__navigation__label").click();
        cy.contains("button", year).click();
        cy.get(".react-calendar__year-view__months__month").eq(Number(monthNumber) - 1).click();
        cy.contains("abbr", date).click();
        //Assertion
        cy.get(".react-date-picker__inputGroup__input").each(($el, index) => {
            cy.wrap($el).invoke('val').should('eq', expectedList[index]);
        })

    })
})