/// <reference types="Cypress" />

describe('Elements Handling', function () {

    it('Test website elements', function () {

        cy.visit(Cypress.env('url') + 'AutomationPractice/')

        //radio buttons
        cy.get('#radio-btn-example > fieldset').find('.radioButton').each(el => {
            cy.wrap(el).check().should('be.checked')
        })

        //dynamic dropdowns
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each(el => {
            el.text() === "India" ? cy.wrap(el).click() : true
        })
        cy.get('#autocomplete').should('have.value', 'India')

        //static dropdown
        cy.get('select').select('option2').should('have.value', 'option2')

        //check boxes
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option2', 'option3'])

        //alerts
        cy.get('#name').type('test1')
        cy.get('#alertbtn').click()
        cy.on('window:alert', str => {
            expect(str).to.equal('Hello test1, share this practice page and share your knowledge')
        })
        cy.get('#confirmbtn').click()
        cy.on("window:confirm", str => {
            expect(str).to.be.equal("Hello , Are you sure you want to confirm?")
        })

        //table
        cy.get('tr td:nth-child(2)').each((el, index) => {
            const text = el.text()
            if (text.includes("Python")) {
                cy.get("tr td:nth-child(2)").eq(index).next().then(price => {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                })
            }
        })

        //visibility
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

        //hover
        cy.contains('Top').click({ force: true })
        cy.url().should('include', 'top')
        cy.get('.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.url().should('include', 'top')

        //new tab
        cy.get('#opentab').invoke('removeAttr', 'target').click()
        cy.origin("https://www.qaclickacademy.com", () => {
            cy.get("#navbarSupportedContent a[href*='about']").click()
            cy.get(".mt-50 h2").should('contain', 'QAClick Academy')
        })
    })

    it('Test another tab', function () {

        cy.visit(Cypress.env('url') + 'AutomationPractice/')
        //open new tab
        cy.get('#opentab').then(el => {
            const url = el.prop('href')
            cy.visit(url)
            cy.origin(url, () => {
                cy.get("div.sub-menu-bar a[href*='about']").click()
                cy.go('back')
            })
        })
    })
})