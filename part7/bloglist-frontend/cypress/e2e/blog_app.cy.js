describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'oliver',
      username: 'oliver',
      password: '20010519'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 

    const anotherUser = {
      name: 'another_user',
      username: 'another_user',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser) 

    cy.visit('http://localhost:5173')
  })


  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('oliver')
      cy.get('#password').type('20010519')
      cy.get('#login-button').click()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('oliver')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('oliver')
      cy.get('#password').type('20010519')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get("#new-blog-button").click()
      cy.get("#inputTitle").type('test-title')
      cy.get("#inputAuthor").type('test-author')
    
      cy.get("#inputUrl").type('test-url')
      cy.get('#create-button').click()

      cy.contains('test-title')
    })


  })

  describe('When logged in and a blog created', function() {
    beforeEach(function() {
      cy.get('#username').type('oliver')
      cy.get('#password').type('20010519')
      cy.get('#login-button').click()

      cy.get("#new-blog-button").click()
      cy.get("#inputTitle").type('test-title')
      cy.get("#inputAuthor").type('test-author')
      cy.get("#inputUrl").type('test-url')
      cy.get('#create-button').click()
    })

    it('A blog can be like', function() {
      cy.get("#view-button").click()
      cy.contains('0')
      cy.get('#like-button').click()
      cy.contains('1')
    })

    it('A blog can be deleted', function() {
      cy.get("#view-button").click()
      cy.get("#delete-button").click()
      cy.on('window:confirm', () => true);
      cy.get('.blog-list').should('not.contain', 'test-title')
    })
  })

  describe('When logged in and a blog created blog by another user already exists', function(){
    beforeEach(function() {
      cy.get('#username').type('another_user')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get("#new-blog-button").click()
      cy.get("#inputTitle").type('another_user_blog')
      cy.get("#inputAuthor").type('test-author')
      cy.get("#inputUrl").type('test-url')
      cy.get('#create-button').click()

      cy.get('#logout-button').click()

      cy.get('#username').type('oliver')
      cy.get('#password').type('20010519')
      cy.get('#login-button').click()

    })

    it('delete button can only be seen by creator', function() {
      cy.get("#view-button").click()
      cy.get('#delete-button').should('not.be.visible')
    })
  })

  describe('When two blogs created and liked', function() {
    beforeEach(function(){
      cy.get('#username').type('oliver')
      cy.get('#password').type('20010519')
      cy.get('#login-button').click()

      cy.get("#new-blog-button").click()
      cy.get("#inputTitle").type('The title with the most likes')
      cy.get("#inputAuthor").type('test-author')
      cy.get("#inputUrl").type('test-url')
      cy.get('#create-button').click()
      cy.get("#view-button").click()
      cy.get("#like-button").click()
      cy.get("#like-button").click()


      cy.get("#new-blog-button").click()
      cy.get("#inputTitle").type('The title with the second most likes')
      cy.get("#inputAuthor").type('test-author')
      cy.get("#inputUrl").type('test-url')
      cy.get('#create-button').click()
    })

    it('blogs are sorting by likes', function() {
      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
    })
  
  })


  
})

