import store from './store';
import {
  ingredientsReducer,
  burgerConstructorReducer,
  feedsReducer
} from './slice';

describe('Root Reducer', () => {
  it('должен корректно инициализировать store', () => {
    const state = store.getState();

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('feeds');

    expect(state.ingredients).toEqual(
      ingredientsReducer(undefined, { type: '' })
    );
    expect(state.burgerConstructor).toEqual(
      burgerConstructorReducer(undefined, { type: '' })
    );
    expect(state.feeds).toEqual(feedsReducer(undefined, { type: '' }));
  });
});
