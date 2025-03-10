/// <reference types="cypress" />

describe('тесты конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должен загрузить ингредиенты и отобразить их', () => {
    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa093c]').should(
      'be.visible'
    );
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa093c]').click();
    cy.get('[data-cy=ingredient-details]').should('be.visible');
    cy.get('[data-cy=ingredient-details-close]').click();
    cy.get('[data-cy=ingredient-details]').should('not.exist');

    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa093c]').click();
    cy.get('[data-cy=ingredient-details]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[data-cy=ingredient-details]').should('not.exist');

    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa093c]').click();
    cy.get('[data-cy=ingredient-details]').should('be.visible');
    cy.get('[data-cy=overlay]').click({ force: true });
    cy.get('[data-cy=ingredient-details]').should('not.exist');
  });

  it('должен добавлять булку и начинку', () => {
    cy.get('[data-cy=add-ingredient-643d69a5c3f7b9001cfa093c]>button').click();
    cy.get('[data-cy=ingredient-bun-top]').should('be.visible');
    cy.get('[data-cy=add-ingredient-643d69a5c3f7b9001cfa0941]>button').click();
    cy.get('[data-cy=ingredient-main-643d69a5c3f7b9001cfa0941]').should(
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
    cy.get('[data-cy=add-ingredient-643d69a5c3f7b9001cfa093c]>button').click();
    cy.get('[data-cy=ingredient-bun-top]').should('be.visible');
    cy.get('[data-cy=add-ingredient-643d69a5c3f7b9001cfa0941]>button').click();
    cy.get('[data-cy=ingredient-main-643d69a5c3f7b9001cfa0941]').should(
      'be.visible'
    );
    cy.get('[data-cy=order-button]>button').click();
    cy.wait('@createOrder', { timeout: 1000 })
      .its('response.statusCode')
      .should('eq', 200);
    cy.get('body').type('{esc}');
    cy.get('[data-cy=ingredient-bun-top]').should('not.exist');
  });
});
