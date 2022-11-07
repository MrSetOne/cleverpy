const username = 'MrSetOne'
describe('First contact', () => {
  it('Visit the site', () => {
    cy.visit('http://127.0.0.1:5173/')
  })
  it(`Can't see posts`, () => {
    cy.get('.post').should('not.exist')
  })
  it('you can only see the login aside and the unlogged page', () => {
    cy.get('.Unlogged')
    cy.get('.logPage')
  })
})
describe('Login', () => {
  const username = 'MrSetOne'
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
    cy.get('.posts__container')
    cy.get('.Unlogged').should('not.exist')
  })
})
describe(`Post's CRUD`, () => {
  const post = {
    first: {
      title: 'Amor/Odio',
      body: 'Es lo que siento por Cypress',
    },
    edited: {
      title: 'Se le pilla cariño',
      body: 'Pero tampoco mucho, no nos volvamos locos',
    },
  }
  it('Create a post', () => {
    cy.get('.AsideUser form button').should('contain.text', 'Publicar').should('be.disabled')
    cy.get('.AsideUser form input').first().type(post.first.title)
    cy.get('.AsideUser form button').should('contain.text', 'Publicar').should('be.disabled')
    cy.get('.AsideUser form textarea').type(post.first.body)
    cy.get('.AsideUser form button').click()
  })
  it('Post has been created', () => {
    cy.get('.post header h2')
      .first()
      .contains(username)
      .parent()
      .parent()
      .get('.post_content h3')
      .contains(post.first.title)
      .parent()
      .get('p')
      .contains(post.first.body)
  })
  it('Edit my post', () => {
    cy.get('.post header .PostMenu button').first().click()
    cy.get('.post header .PostMenu .PostMenu--edit').click()
    cy.get('.post .PostTools__update input')
      .should('have.value', post.first.title)
      .clear()
      .type(post.edited.title)
    cy.get('.post .PostTools__update').contains('Cuerpo').click()
    cy.get('.post .PostTools__update textarea')
      .should('have.value', post.first.body)
      .clear()
      .type(post.edited.body)
    cy.get('.post .PostTools__update button').contains('Editar').click()
  })
  it('Post was edited', () => {
    cy.get('.post')
      .first()
      .contains(username)
      .parent()
      .parent()
      .get('.post_content h3')
      .contains(post.edited.title)
      .parent()
      .get('p')
      .contains(post.edited.body)
  })
  it('Remove my post', () => {
    cy.get('.post')
      .contains(username)
      .parent()
      .get('.PostMenu button')
      .first()
      .click()
      .parent()
      .get('.PostMenu--delete')
      .first()
      .click()
      .get('.PostTools__delete')
      .contains('Si')
      .click()
  })
  it('My post was deleted', () => {
    cy.get('.post').contains(post.edited.body).should('not.exist')
  })
})

describe('Responsive test', () => {
  it('Burger Menu works', () => {
    cy.viewport(390, 844)
    cy.get('.BurgerIcon >div').click().wait(1000).click()
  })
})

describe('Navegation test', () => {
  const getMorePost = () => {
    cy.get('.posts__container').wait(1000).scrollTo('bottom', { duration: 1000 })
    cy.get('.posts__btn button').click()
  }
  it('Loading all Posts', () => {
    getMorePost()
    getMorePost()
    getMorePost()
    getMorePost()
    getMorePost()
    cy.get('.posts__container').wait(1000).scrollTo('bottom', { duration: 1000 })
    cy.get('.posts__btn p')
      .first()
      .contains('Ya no quedan mas posts...')
      .next()
      .contains('¿Porque no creas uno?')
  })
  it('Scroll to top', () => {
    cy.get('.ScrollToTop').click().wait(1000)
    cy.window().its('scrollY').should('equal', 0)
  })
})
describe('Profiles', () => {
  it('Visit other user', () => {
    cy.get('.post .post__header h2')
      .first()
      .then((username) => {
        const target = username.text()
        cy.get('.post .post__header .post__header--link').first().click()
        cy.get('.Profile > header h2').should('contain', target)
      })
  })
  it('Hide post in profile view', () => {
    cy.get('.post h3')
      .first()
      .then((title) => {
        const target = title.text()
        cy.get('.post .PostMenu button')
          .first()
          .click()
          .get('.PostMenu--delete')
          .first()
          .click()
          .get('.PostTools__delete')
          .contains('Si')
          .click()
        cy.get('.post h3').first().should('not.include.text', target)
      })
  })
  it('Logo works like home-btn', () => {
    cy.get('.header img').click()
    cy.location().should((url) => expect(url.pathname).to.eq('/'))
  })
  it('Navigate to my profile', () => {
    cy.get('.AsideUser > header .AsideUser__headerContainer--profile').click()
    cy.get('.post').should('not.exist')
    cy.get('.Profile h2').should('contain', 'Aun no has realizado ningún post.')
  })
})
describe('Do Logout', () => {
  it('Do Logout', () => {
    cy.get('.AsideUser > header .AsideUser__headerContainer--logout').click()
  })
  it(`Can't see posts`, () => {
    cy.get('.post').should('not.exist')
  })
  it('you can only see the login aside and the unlogged page', () => {
    cy.get('.Unlogged')
    cy.get('.logPage')
  })
})
