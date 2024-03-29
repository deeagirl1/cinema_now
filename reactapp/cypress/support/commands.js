import 'cypress-file-upload';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add('login', (username, password) => {
  var reqBody = "username="+username+"&password="+password;
      cy.request({
          method: 'POST',
          url: 'http://localhost:8080/login',
          headers:{
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: reqBody
        }).then(({ body }) => {
          window.localStorage.setItem("user", JSON.stringify(body))
  })
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

