/// <reference types="Cypress" />

describe('E2E test', function(){
    it('Initial e2e flow', function(){
        
        cy.visit('https://rahulshettyacademy.com/loginpagePractise/#')
        cy.get('input#username').type('rahulshettyacademy').should('have.value', 'rahulshettyacademy')
        cy.get('input#password').type('learning').should('have.value', 'learning')
        cy.get('input#usertype').check().should('be.checked')
        cy.wait(500)
        cy.get('button#cancelBtn').click()
        cy.get('select.form-control').select('teach').should('have.value','teach')
        cy.get('input#terms').check().should('be.checked')
        cy.get('input#signInBtn').click()

        cy.get('app-card').each( el => {
            const result = el.find('.card-title').text()
            result.includes('Nokia') || result.includes('Samsung') || result.includes('iphone') ? cy.wrap(el.find('div.card-footer button')).click() : true
        })

        cy.get('a.nav-link.btn-primary').click()

        cy.get('tr td:nth-child(2)').each(($e1, index) => {
            const text = $e1.text()
            if (text.includes("Python")) {
                cy.get("tr td:nth-child(2)").eq(index).next().then(price => {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                })
            }
        }) 

    })
})

