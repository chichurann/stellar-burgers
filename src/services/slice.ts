import { createSlice, createReducer } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getIngredients, getFeeds } from './actions';
import { TIngredient, TConstructorIngredient } from '../utils/types';

type TIngredientsState = {
  buns: Array<TIngredient>;
  mains: Array<TIngredient>;
  sauces: Array<TIngredient>;
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    reducer: () => {}
  },
  selectors: {
    getIngredientsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.buns = action.payload.filter((item) => item.type === 'bun');
        state.mains = action.payload.filter((item) => item.type === 'main');
        state.sauces = action.payload.filter((item) => item.type === 'sauce');
      });
  }
});

type TBurgerConstructorState = {
  bun: {
    price: number;
    _id: string;
  } | null;
  ingredients: Array<TConstructorIngredient>;
};

const initialBurgerConstructorState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialBurgerConstructorState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({ ...action.payload, id: action.payload._id });
      }
    },
    removeIngredient: (state, action) => {
      state.ingredients.splice(action.payload, 1);
    },
    moveDownIngredient: (state, action) => {
      const arr = state.ingredients;
      [arr[action.payload + 1], arr[action.payload]] = [
        arr[action.payload],
        arr[action.payload + 1]
      ];
      state.ingredients = arr;
    },
    moveUpIngredient: (state, action) => {
      const arr = state.ingredients;
      [arr[action.payload - 1], arr[action.payload]] = [
        arr[action.payload],
        arr[action.payload - 1]
      ];
      state.ingredients = arr;
    }
  },
  selectors: {
    getBurgerConstructorSelector: (state) => state
  }
});

type TFeedsState = {
  orders: Array<TOrder>;
  total: number | null;
  totalToday: number | null;
};

const initialFeedsOrders: TFeedsState = {
  orders: [],
  total: null,
  totalToday: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialFeedsOrders,
  reducers: {},
  selectors: {
    getFeedsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { getIngredientsSelector } = ingredientsSlice.selectors;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveDownIngredient,
  moveUpIngredient
} = burgerConstructorSlice.actions;
export const { getBurgerConstructorSelector } =
  burgerConstructorSlice.selectors;
export const feedsReducer = feedsSlice.reducer;
export const { getFeedsSelector } = feedsSlice.selectors;
