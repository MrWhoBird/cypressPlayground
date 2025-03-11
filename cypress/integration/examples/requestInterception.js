/// <reference types="Cypress" />

describe('Mocking playground', function () {

    it('Mock the response', function () {

        cy.visit(Cypress.env('url')+'angularAppdemo/')

        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
            {
                statusCode: 200,
                body: [{
                    "book_name": "This is a fake book",
                    "isbn": "RSU",
                    "aisle": "2301"
                }]

            }).as('bookretrievals')
        cy.get("button[class='btn btn-primary']").click()
        cy.wait('@bookretrievals').then(({ request, response }) => {
            cy.get('tr').should('have.length', response.body.length + 1)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available')
    })

    it('Mock http requests', function () {

        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', req => {
            req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
            req.continue(res => {
                //expect(res.statusCode).to.equal(404)
            })
        }
        ).as("dummyUrl")

        cy.get("button[class='btn btn-primary']").click()
        cy.wait('@dummyUrl')

    })

})