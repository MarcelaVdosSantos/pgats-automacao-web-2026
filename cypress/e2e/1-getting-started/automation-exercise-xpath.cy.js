/// <reference types="cypress" />

//user: Aluna_01-PGATS_2026_
//email: aluna_01-pgats_2026_@teste.com.br
//password: 12345    

describe('Automation Exercise', () => {
   
    const password = '12345'

    const openLoginPage = () => {
       
        cy.visit('/')
        cy.xpath('//a[contains(@href, "login")]').click()
    }

    const registerUser = (email) => {

        openLoginPage()
        cy.xpath('//*[@data-qa="signup-name"]').type('Aluna_01-PGATS_2026_')
        cy.xpath('//*[@data-qa="signup-email"]').type(email)
        cy.xpath('//*[@data-qa="signup-button"]').click()
        cy.xpath('//*[@id="id_gender2"]').check()
        cy.xpath('//*[@data-qa="password"]').type(password)
        cy.xpath('//*[@data-qa="days"]').select('4')
        cy.xpath('//*[@data-qa="months"]').select('June')
        cy.xpath('//*[@data-qa="years"]').select('1990')
        cy.xpath('//*[@id="newsletter"]').check()
        cy.xpath('//*[@id="optin"]').check()
        cy.xpath('//*[@data-qa="first_name"]').type('Aluna')
        cy.xpath('//*[@data-qa="last_name"]').type('PGATS')
        cy.xpath('//*[@data-qa="company"]').type('Escola')
        cy.xpath('//*[@data-qa="address"]').type('Rua de Casa')
        cy.xpath('//*[@data-qa="country"]').select('Canada')
        cy.xpath('//*[@data-qa="state"]').type('Toronto')
        cy.xpath('//*[@data-qa="city"]').type('Toronto')
        cy.xpath('//*[@data-qa="zipcode"]').type('023051000')
        cy.xpath('//*[@data-qa="mobile_number"]').type('5511858589744')
        cy.xpath('//*[@data-qa="create-account"]').click()
        cy.xpath('//h2[normalize-space(.)="Account Created!"]').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
        cy.xpath('//a[contains(normalize-space(.), "Logged in as Aluna_01-PGATS_2026_")]').should('be.visible')
    }

    it('CT01 - Criar um Usuário', () => {
      
        const email = `aluna_01-pgats_2026_${Date.now()}@teste.com.br`

        registerUser(email)
        cy.xpath('//a[contains(normalize-space(.), "Delete Account")]').click()
        cy.xpath('//h2[normalize-space(.)="Account Deleted!"]').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })

    it('CT02 Login com email e senha válidos', () => {

        const email = `aluna_01-pgats_2026_${Date.now()}@teste.com.br`

        registerUser(email)
        cy.xpath('//a[contains(@href, "logout")]').click()

        openLoginPage()
        cy.xpath('//*[@data-qa="login-email"]').type(email)
        cy.xpath('//*[@data-qa="login-password"]').type(password)
        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.xpath('//a[contains(normalize-space(.), "Aluna_01-PGATS_2026_")]').should('be.visible')

        cy.xpath('//a[contains(normalize-space(.), "Delete Account")]').click()
        cy.xpath('//h2[normalize-space(.)="Account Deleted!"]').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })

    it('CT03 Login com e-mail e senha inválidos', () => {
    
        openLoginPage()
        cy.xpath('//*[@data-qa="login-email"]').type(`email_invalido${Date.now()}@teste.com.br`)
        cy.xpath('//*[@data-qa="login-password"]').type('999999')
        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.xpath('//p[normalize-space(.)="Your email or password is incorrect!"]').should('be.visible')
    })

    it('CT04 Deslogar o Usuário', () => {
         
        const email = `aluna_01-pgats_2026_${Date.now()}@teste.com.br`

        registerUser(email)
        cy.xpath('//a[contains(@href, "logout")]').click()

        cy.url().should('include', '/login')
        cy.xpath('//h2[normalize-space(.)="Login to your account"]').should('be.visible')

        openLoginPage()
        cy.xpath('//*[@data-qa="login-email"]').type(email)
        cy.xpath('//*[@data-qa="login-password"]').type(password)
        cy.xpath('//*[@data-qa="login-button"]').click()
        cy.xpath('//a[contains(normalize-space(.), "Delete Account")]').click()
        cy.xpath('//h2[normalize-space(.)="Account Deleted!"]').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })

    it('CT05 Cadastrar usuário com e-mail já cadastrado', () => {
         
        const email = `aluna_01-pgats_2026_${Date.now()}@teste.com.br`

        registerUser(email)
        cy.xpath('//a[contains(@href, "logout")]').click()

        openLoginPage()
        cy.xpath('//*[@data-qa="signup-name"]').type('Aluna_01-PGATS_2026_')
        cy.xpath('//*[@data-qa="signup-email"]').type(email)
        cy.xpath('//*[@data-qa="signup-button"]').click()

        cy.xpath('//p[normalize-space(.)="Email Address already exist!"]').should('be.visible')

        openLoginPage()
        cy.xpath('//*[@data-qa="login-email"]').type(email)
        cy.xpath('//*[@data-qa="login-password"]').type(password)
        cy.xpath('//*[@data-qa="login-button"]').click()
        cy.xpath('//a[contains(normalize-space(.), "Delete Account")]').click()
        cy.xpath('//h2[normalize-space(.)="Account Deleted!"]').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })
}); 