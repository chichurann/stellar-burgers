/// <reference types="cypress" />

const selectors = {
  ingredient: '[data-cy=ingredient-643d69a5c3f7b9001cfa093c]',
  ingredientAlt: '[data-cy=ingredient-643d69a5c3f7b9001cfa0941]',
  ingredientDetails: '[data-cy=ingredient-details]',
  ingredientDetailsClose: '[data-cy=ingredient-details-close]',
  overlay: '[data-cy=overlay]',
  addIngredient: (id) => `[data-cy=add-ingredient-${id}]>button`,
  ingredientBunTop: '[data-cy=ingredient-bun-top]',
  ingredientMain: (id) => `[data-cy=ingredient-main-${id}]`,
  orderButton: '[data-cy=order-button]>button'
};

describe('тесты конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должен загрузить ингредиенты и отобразить их', () => {
    cy.get(selectors.ingredient).should('be.visible');
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    cy.get(selectors.ingredient).click();
    cy.get(selectors.ingredientDetails).should('be.visible');
    cy.get(selectors.ingredientDetailsClose).click();
    cy.get(selectors.ingredientDetails).should('not.exist');

    cy.get(selectors.ingredient).click();
    cy.get(selectors.ingredientDetails).should('be.visible');
    cy.get('body').type('{esc}');
    cy.get(selectors.ingredientDetails).should('not.exist');

    cy.get(selectors.ingredient).click();
    cy.get(selectors.ingredientDetails).should('be.visible');
    cy.get(selectors.overlay).click({ force: true });
    cy.get(selectors.ingredientDetails).should('not.exist');
  });

  it('должен добавлять булку и начинку', () => {
    cy.get(selectors.addIngredient('643d69a5c3f7b9001cfa093c')).click();
    cy.get(selectors.ingredientBunTop).should('be.visible');
    cy.get(selectors.addIngredient('643d69a5c3f7b9001cfa0941')).click();
    cy.get(selectors.ingredientMain('643d69a5c3f7b9001cfa0941')).should(
      'be.visible'
    );
  });
});

describe('тесты оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('POST', '/api/auth/login', {
      fixture: 'user.json'
    }).as('login');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    }).as('user');

    cy.intercept('POST', '/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.visit('/');
    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('должен оформить заказ, показать номер заказа, очистить конструктор', () => {
    cy.get(selectors.addIngredient('643d69a5c3f7b9001cfa093c')).click();
    cy.get(selectors.ingredientBunTop).should('be.visible');
    cy.get(selectors.addIngredient('643d69a5c3f7b9001cfa0941')).click();
    cy.get(selectors.ingredientMain('643d69a5c3f7b9001cfa0941')).should(
      'be.visible'
    );
    cy.get(selectors.orderButton).click();
    cy.wait('@createOrder', { timeout: 1000 })
      .its('response.statusCode')
      .should('eq', 200);
    cy.get('body').type('{esc}');
    cy.get(selectors.ingredientBunTop).should('not.exist');
  });
});
