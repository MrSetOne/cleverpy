describe('empty spec', () => {
    const username = 'MrSetOne'
    const title = 'Amor/Odio'
    const body = 'Es lo que siento por Cypress'
    it('Visit the site', () => {
        cy.visit('http://127.0.0.1:5173/')
    })
    it(`Can't delete a post`, () => {
        cy.get('.post').not('button')
    })
    it('Do login', () => {
        cy.get('button').should('contain.text', 'Login').should('be.disabled');
        cy.get('input').first().type(username);
        cy.get('button').should('contain.text', 'Login').should('be.disabled');
        cy.get('input').first().next().type(username);
        cy.get('button').should('contain.text', 'Login').click()
    })
    it('Delete a post', () => {
        cy.wait(1000).get('.post button').first().click()
    })
    it('Create a post', () => {
        cy.get('button').should('contain.text', 'Publicar').should('be.disabled');
        cy.get('.AsideUser form input').first().type(title)
        cy.get('button').should('contain.text', 'Publicar').should('be.disabled');
        cy.get('.AsideUser form input').first().next().type(body)
        cy.get('.AsideUser button').click()
        cy.get('.post header h2').contains(username).first().parent().parent().contains(title).parent().contains(body)
    })
})