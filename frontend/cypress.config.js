const { defineConfig } = require('cypress');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: false,
    specPattern: path.resolve(__dirname, 'cypress/e2e/**/*.cy.js')
  }
});
