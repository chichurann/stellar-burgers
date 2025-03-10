import { ingredientsReducer } from './slice';
import { getIngredients } from './actions';
import { TIngredient } from '../utils/types';

const getInitialState = () => ({
  buns: [],
  mains: [],
  sauces: [],
  loading: false,
  error: null
});

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 150,
    price: 100,
    image: 'https://example.com/bun.png',
    image_large: 'https://example.com/bun_large.png',
    image_mobile: 'https://example.com/bun_mobile.png'
  },
  {
    _id: '2',
    name: 'Котлета',
    type: 'main',
    proteins: 15,
    fat: 10,
    carbohydrates: 5,
    calories: 200,
    price: 150,
    image: 'https://example.com/main.png',
    image_large: 'https://example.com/main_large.png',
    image_mobile: 'https://example.com/main_mobile.png'
  },
  {
    _id: '3',
    name: 'Соус',
    type: 'sauce',
    proteins: 2,
    fat: 1,
    carbohydrates: 5,
    calories: 50,
    price: 30,
    image: 'https://example.com/sauce.png',
    image_large: 'https://example.com/sauce_large.png',
    image_mobile: 'https://example.com/sauce_mobile.png'
  }
];

describe('ingredientsSlice', () => {
  it('должен вернуть начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(
      getInitialState()
    );
  });

  it('должен обработать getIngredients.pending', () => {
    const state = ingredientsReducer(
      getInitialState(),
      getIngredients.pending('requestId')
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обработать getIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      getInitialState(),
      getIngredients.fulfilled(mockIngredients, 'requestId', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.buns).toHaveLength(1);
    expect(state.buns[0].type).toBe('bun');

    expect(state.mains).toHaveLength(1);
    expect(state.mains[0].type).toBe('main');

    expect(state.sauces).toHaveLength(1);
    expect(state.sauces[0].type).toBe('sauce');
  });

  it('должен обработать getIngredients.rejected', () => {
    const errorMessage = 'Ошибка';
    const state = ingredientsReducer(
      getInitialState(),
      getIngredients.rejected({ message: errorMessage } as any, 'requestId')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
