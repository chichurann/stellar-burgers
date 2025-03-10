import {
  burgerConstructorReducer,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearBurgerConstructor
} from './slice';
import { TBurgerConstructorState } from '../utils/types';

describe('burgerConstructorReducer', () => {
  let prevState: TBurgerConstructorState;

  beforeEach(() => {
    prevState = {
      bun: null,
      ingredients: [
        {
          _id: '1',
          name: 'Котлета',
          type: 'main',
          price: 100,
          proteins: 20,
          fat: 10,
          carbohydrates: 5,
          calories: 150,
          image: '',
          image_mobile: '',
          image_large: '',
          id: 'ing-1'
        },
        {
          _id: '2',
          name: 'Сыр',
          type: 'sauce',
          price: 50,
          proteins: 5,
          fat: 3,
          carbohydrates: 2,
          calories: 50,
          image: '',
          image_mobile: '',
          image_large: '',
          id: 'ing-2'
        }
      ]
    };
  });

  it('должен добавить булку в конструктор', () => {
    const bun = {
      _id: '3',
      name: 'Булка',
      type: 'bun',
      price: 200,
      proteins: 10,
      fat: 5,
      carbohydrates: 3,
      calories: 120,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const nextState = burgerConstructorReducer(prevState, addIngredient(bun));

    expect(nextState.bun).toEqual(bun);
  });

  it('должен добавить начинку в конструктор', () => {
    const newIngredient = {
      _id: '4',
      name: 'Соус чили',
      type: 'sauce',
      price: 30,
      proteins: 2,
      fat: 1,
      carbohydrates: 1,
      calories: 20,
      image: '',
      image_mobile: '',
      image_large: '',
      id: 'ing-4'
    };

    const nextState = burgerConstructorReducer(
      prevState,
      addIngredient(newIngredient)
    );

    expect(nextState.ingredients.length).toBe(3);
    expect(nextState.ingredients[2]).toEqual({
      ...newIngredient,
      id: '4'
    });
  });

  it('должен удалить ингредиент', () => {
    const nextState = burgerConstructorReducer(prevState, removeIngredient(0));

    expect(nextState.ingredients.length).toBe(1);
    expect(nextState.ingredients[0]._id).toBe('2');
  });

  it('должен менять местами ингредиенты (перемещение вниз)', () => {
    const nextState = burgerConstructorReducer(
      prevState,
      moveDownIngredient(0)
    );

    expect(nextState.ingredients[0]._id).toBe('2');
    expect(nextState.ingredients[1]._id).toBe('1');
  });

  it('должен менять местами ингредиенты (перемещение вверх)', () => {
    const nextState = burgerConstructorReducer(prevState, moveUpIngredient(1));

    expect(nextState.ingredients[0]._id).toBe('2');
    expect(nextState.ingredients[1]._id).toBe('1');
  });

  it('должен очищать конструктор', () => {
    const nextState = burgerConstructorReducer(
      prevState,
      clearBurgerConstructor()
    );

    expect(nextState.bun).toBeNull();
    expect(nextState.ingredients.length).toBe(0);
  });
});
