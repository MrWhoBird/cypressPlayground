/// <reference types="Cypress" />

describe('Elements Handling Test', function(){
    it('Initial test order', function(){
        //Check boxes
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option2','option3'])

        //radio buttons
        cy.get('#radio-btn-example > fieldset').find('.radioButton').each( $el => {
            cy.wrap($el).check().should('be.checked')
        })

        //Static Dropdown
        cy.get('select').select('option2').should('have.value','option2')
        
        //Dynamic dropdowns
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each($e1 => {
            if($e1.text()==="India"){
                cy.wrap($e1).click()
            }
        })
        cy.get('#autocomplete').should('have.value','India')

        //visibility
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

        //alert
        cy.get('#name').type('test1')
        cy.get('#alertbtn').click()
        cy.on('window:alert', str => {
            expect(str).to.equal('Hello test1, share this practice page and share your knowledge')
        })

        //table
        cy.get('tr td:nth-child(2)').each(($e1, index) => {
            const text = $e1.text()
            if (text.includes("Python")) {
                cy.get("tr td:nth-child(2)").eq(index).next().then(price => {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                })
            }
        }) 
        
        //hover
        cy.contains('Top').click({ force: true })

        cy.get('.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.url().should('include', 'top')

        //new tab
        // cy.get('#opentab').invoke('removeAttr','target').click()
        // cy.origin("https://www.qaclickacademy.com",() => {
        //     cy.get("#navbarSupportedContent a[href*='about']").click()
        //     cy.get(".mt-50 h2").should('contain','QAClick Academy')
        // })
    })
})

