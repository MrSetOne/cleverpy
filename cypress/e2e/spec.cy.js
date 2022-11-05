const username = 'MrSetOne';
describe('First contact', () => {
    it('Visit the site', () => {
        cy.visit('http://127.0.0.1:5173/')
    })
    it(`Can't see posts`, () => {
        cy.get('.post').should('not.exist');
    })
    it('you can only see the login aside and the unlogged page', () => {
        cy.get('.Unlogged')
        cy.get('.logPage')
    })
})
describe('Login', () => {
    const username = 'MrSetOne';
    const password = 'RuleZ'

    it('Do login', () => {
        cy.get('.logPage button').should('contain.text', 'Login').should('be.disabled')
        cy.get('.logPage input').first().type(username)
        cy.get('.logPage button').should('contain.text', 'Login').should('be.disabled')
        cy.get('input').first().next().type(password)
        cy.get('button').should('contain.text', 'Login').click()
    })

    it('The posts appear', () => {
        cy.wait(1000)
        cy.get('.posts__container');
        cy.get('.Unlogged').should('not.exist');
    })
});
describe(`Post's CRUD`, () => {
    const post = {
        first: {
            title: 'Amor/Odio',
            body: 'Es lo que siento por Cypress'
        },
        edited: {
            title: 'Se le pilla cariño',
            body: 'Pero tampoco mucho, no nos volvamos locos'
        }
    }

    it('Create a post', () => {
        cy.get('button').should('contain.text', 'Publicar').should('be.disabled')
        cy.get('.AsideUser form input').first().type(post.first.title)
        cy.get('button').should('contain.text', 'Publicar').should('be.disabled')
        cy.get('.AsideUser form textarea').type(post.first.body)
        cy.get('.AsideUser button').click()
    })
    it('Post has been created', () => {
        cy.get('.post header h2')
            .first()
            .contains(username)
            .parent()
            .parent()
            .get('.post_content h3').contains(post.first.title)
            .parent()
            .get('p').contains(post.first.body)
    })
    it('Edit my post', () => {
        cy.get('.post header .PostMenu button').first().click()
        cy.get('.post header .PostMenu .PostMenu--edit').click()
        cy.get('.post .PostTools__update input').should('have.value', post.first.title).clear().type(post.edited.title)
        cy.get('.post .PostTools__update').contains('Cuerpo').click()
        cy.get('.post .PostTools__update textarea').should('have.value', post.first.body).clear().type(post.edited.body)
        cy.get('.post .PostTools__update button').contains('Editar').click()
    })
    it('Post was edited', () => {
        cy.get('.post')
            .first()
            .contains(username)
            .parent()
            .parent()
            .get('.post_content h3').contains(post.edited.title)
            .parent()
            .get('p').contains(post.edited.body)
    })
})