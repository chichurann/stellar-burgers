import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { getIngredientsApi, getFeedsApi } from '@api';

export const getIngredients = createAsyncThunk(
  'getIngredients',
  async () => await getIngredientsApi()
);

export const getFeeds = createAsyncThunk('getFeeds', () => getFeedsApi());
