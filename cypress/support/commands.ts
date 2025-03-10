/// <reference types="cypress" />

import 'cypress-drag-drop'; // Подключаем расширение drag & drop

// Добавление типизации для команд
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      loadIngredients(): Chainable<void>;
      createOrder(): Chainable<void>;
    }
  }
}
