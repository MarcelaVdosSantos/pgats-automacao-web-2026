    const testRunId = Date.now()
    export const user = `Aluna_02-PGATS_2026_${testRunId}`;
    export const email = `aluna_02-pgats_2026_${testRunId}@teste.com.br`;
    export const password = '12345';
    export const cadastradoUser = 'aluna_04-pgats_2026_';
    export const cadastradoEmail = 'aluna_04-pgats_2026_@teste.com.br'
    export const product = 'Blue Top';


    const openLoginPage = () => {
        cy.visit('/')
        cy.get('a[href*="login"]').click()
    }

    export const startFirstlogin = (userName = user, userEmail = email) => {
        openLoginPage()
        cy.get('[data-qa="signup-name"]').type(userName)
        cy.get('[data-qa="signup-email"]').type(userEmail)
        cy.get('[data-qa="signup-button"]').click()
    }

    export const createUser = (userName = user, userEmail = email) => {
        startFirstlogin(userName, userEmail)
        //dados da conta
        cy.get('#id_gender2').check()
        cy.get('[data-qa="password"]').type(password)

        cy.get('[data-qa="days"]').select('4')
        cy.get('[data-qa="months"]').select('June')
        cy.get('[data-qa="years"]').select('1980')

        cy.get('#newsletter').check()
        cy.get('#optin').check()

        cy.get('[data-qa="first_name"]').type('Aluna_02')
        cy.get('[data-qa="last_name"]').type('PGATS_2026')
        cy.get('[data-qa="company"]').type('Escola')
        cy.get('[data-qa="address"]').type('Rua de Casa')
        cy.get('[data-qa="country"]').select('Canada')

        cy.get('[data-qa="state"]').type('Toronto')
        cy.get('[data-qa="city"]').type('Toronto')
        cy.get('[data-qa="zipcode"]').type('0258911')
        cy.get('[data-qa="mobile_number"]').type('5511985658985')

        cy.get('[data-qa="create-account"]').click()

        cy.url().should('include', '/account_created')
        cy.get('[data-qa="account-created"]', { timeout: 10000 })
          .should('be.visible')
          .and('contain.text', 'Account Created!')

        cy.get('[data-qa="continue-button"]').click()

        cy.contains(`Logged in as ${userName}`, { timeout: 10000 }).should('be.visible')

    }

    export const loginUser = (userEmail = email, userPassword = password) => {
        openLoginPage()
        cy.get('[data-qa="login-email"]').type(userEmail)
        cy.get('[data-qa="login-password"]').type(userPassword)
        cy.get('[data-qa="login-button"]').click()
        
    }
  
    export const logoutUser = () => {
        cy.get('a[href*="logout"]').click()
    }

    
    export const salesCart = () => {
        cy.get('[href*="view_cart"]').filter(':visible').click()
        cy.contains('Proceed To Checkout').should('be.visible').click()

        cy.contains('Address Details', { timeout: 10000 }).should('be.visible')
        cy.contains('Your delivery address', { timeout: 10000 }).should('be.visible')
        cy.contains('Your billing address', { timeout: 10000 }).should('be.visible')
        cy.contains('Review Your Order', { timeout: 10000 }).should('be.visible')
                
        cy.get('[class="form-control"]').type('Texto do comentário')
    }

    export const contactUs = (userName = user, userEmail = email) => {
        cy.visit('/contact_us')

        cy.contains('Get In Touch').should('be.visible')

        cy.get('[data-qa="name"]').type(userName)
        cy.get('[data-qa="email"]').type(userEmail)
        cy.get('[data-qa="subject"]').type('Digitando o título da mensagem')
        cy.get('[data-qa="message"]').type('Digitando uma mensagem')

        // Upload do arquivo
        cy.get('input[name="upload_file"]').selectFile({
            contents: Cypress.Buffer.from('Conteudo do arquivo'),
            fileName: 'exemplo.txt',
            mimeType: 'text/plain',
        })

        cy.on('window:confirm', () => true)

        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status.alert-success', { timeout: 10000 })
          .should('be.visible')
          .and('contain', 'Success! Your details have been submitted successfully.')
    }

    export const searchProducts = (searchProduct = product) => {
        cy.visit('/products')
        cy.get('#search_product', { timeout: 10000 })
          .should('be.visible')
          .type(searchProduct)
        cy.get('#submit_search').click()
        cy.contains('Searched Products', { timeout: 10000 }).should('be.visible')
        cy.get('.features_items .product-image-wrapper')
          .should('have.length.greaterThan', 0)
          .contains(searchProduct)
          .should('be.visible')
    }

    export const checkAndDetailsProducts = () => {
        cy.visit('/products')

        cy.contains('All Products', { timeout: 10000 }).should('be.visible')
        cy.get('.features_items .product-image-wrapper').should('be.visible')
        cy.get('a[href*="product_details/1"]').filter(':visible').first().click()

        cy.contains('Quantity:').should('be.visible')
        cy.contains('Availability:').should('be.visible')
        cy.contains('Condition:').should('be.visible')
        cy.contains('Brand:').should('be.visible')
    }

    export const payment = () => {
        cy.get('a[href*="payment"]').click()
        cy.contains('Payment').should('be.visible')
        cy.get('[data-qa="name-on-card"]').type('Maria Silva')
        cy.get('[data-qa="card-number"]').type('5334798689234529')
        cy.get('[data-qa="cvc"]').type('974')
        cy.get('[data-qa="expiry-month"]').type('09')
        cy.get('[data-qa="expiry-year"]').type('2036')

        cy.get('[data-qa="pay-button"]').click()

        cy.contains('Order Placed!').should('be.visible')
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')

        cy.get('[data-qa="continue-button"]').click()
    }        
            

    export const selectProduct = () => {
        cy.visit('/')
        cy.get('a[href*="products"]').filter(':visible').first().click() 

        cy.contains('All Products', { timeout: 10000 }).should('be.visible')
        cy.get('a[href*="product_details/1"]').filter(':visible').first().click()


        cy.get('button.cart').click()

        cy.get('#cartModal').should('be.visible')
        cy.get('#cartModal a[href="/view_cart"]').click()

        cy.url().should('include', '/view_cart')

        cy.contains('Proceed To Checkout', { timeout: 10000 })
          .scrollIntoView()
          .should('be.visible')
          .click()

        cy.contains('Address Details', { timeout: 10000 }).should('be.visible')
        cy.contains('Your delivery address', { timeout: 10000 }).should('be.visible')
        cy.contains('Your billing address', { timeout: 10000 }).should('be.visible')
        cy.contains('Review Your Order', { timeout: 10000 }).should('be.visible')

        cy.get('.form-control').type('Texto do comentário')
    }