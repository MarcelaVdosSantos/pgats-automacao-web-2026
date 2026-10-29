/// <reference types = "cypress" />

// cy.get() = busca elementos baseado em celetor CSS
// cy.contains = busca elementos baseados em texto
//aluna_04-pgats_2026_@teste.com.br
//senha 12345
//npx cypress run --spec "cypress/e2e/1-getting-started/automation-exercise-modules-final.cy.js"


import {
    email,
    password,
    user,
    product,
    cadastradoUser,
    cadastradoEmail,
    createUser,
    loginUser,
    logoutUser,
    startFirstlogin,
    contactUs,
    searchProducts,
    checkAndDetailsProducts,
    selectProduct,
    salesCart,
    payment
} from '../../support/automation-exercise-final'


describe('Exercicio final de Automação Web', () => {

    it('CT01 - Cadastrar usuário', () => {
        createUser()
        logoutUser()
    })

    it('CT02 - Login com e-mail e senha válidos', () => {
        loginUser(email, password)
        cy.contains(`Logged in as ${user}`, { timeout: 10000 }).should('be.visible')
        logoutUser()
    })

    it('CT03 - Login com e-mail e senha inválidos', () => {
        loginUser('aluna_99-pgats_2026_@teste.com.br', '78945')
        cy.contains('Your email or password is incorrect!').should('be.visible')
    })

    it('CT04 - Logout do usuário', () => {
        loginUser(email, password)
        cy.contains(`Logged in as ${user}`, { timeout: 10000 }).should('be.visible')
        logoutUser()
        cy.contains('Login to your account').should('be.visible')
    })

    it('CT05 - Cadastrar usuário com e-mail já cadastrado', () => {
        // aluna_04-pgats_2026_ - aluna_04-pgats_2026_@teste.com.br - senha 12345
        startFirstlogin(cadastradoUser, cadastradoEmail)
        cy.contains('Email Address already exist!').should('be.visible')
    })

    it('CT06 - Entrar em contato', () => {
        contactUs(cadastradoUser,cadastradoEmail)
    })
    
    it('CT07 - Verificar os casos de testes', () => {
        cy.visit('/')
        cy.get('a[href="/test_cases"]').filter(':visible').first().click() // solução IA 

        cy.contains('Test Cases').should('be.visible')
        cy.contains('Test Case 1: Register User').should('be.visible')
    })

    it('CT08 - Verificar todos os produtos e a página de detalhes do produto', () => {
        checkAndDetailsProducts()
    })

    it('CT09 - Pesquisar Produtos', () => {
           searchProducts()

    })
        
    it('CT10 - Verificar a assinatura na página inicial', () => {
        cy.visit('/')

        cy.contains('Subscription').should('be.visible')
        
        cy.get('#susbscribe_email').type(email)
        cy.get('#subscribe').click()

        cy.get('#success-subscribe').click()
        cy.contains('You have been successfully subscribed!').should('be.visible')
        
    })

    it('CT15 - Fazer pedido: Registre-se antes de finalizar a compra', () => {
        const orderId = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`
        createUser(
            `Aluna_02_CT15_${orderId}`,
            `aluna_02_ct15_${orderId}@teste.com.br`
        )
        selectProduct()
        payment()
        logoutUser()

    })

    it('CT16 - Fazer pedido: Faça Login antes de finalizar a compra', () => {
        loginUser(cadastradoEmail, password)
        cy.contains(`Logged in as ${cadastradoUser}`, { timeout: 10000 }).should('be.visible')
        selectProduct()
        payment()
        logoutUser()
    })


})