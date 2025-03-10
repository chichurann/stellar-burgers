/// <reference types="cypress" />

import './commands';

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
    logout(): Chainable<void>;
    loadIngredients(): Chainable<void>;
    createOrder(): Chainable<void>;
  }
}
