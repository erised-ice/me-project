import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createRecipeApi,
  type CreateRecipePayload,
  deleteRecipeApi,
  getRecipesApi,
} from '../api.ts';
import type { Recipe } from './types.ts';

export const fetchRecipes = createAsyncThunk<Recipe[], void, { rejectValue: string }>(
  'recipes/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      return await getRecipesApi();
    } catch {
      return rejectWithValue('Не удалось загрузить рецепты');
    }
  },
);

export const createRecipe = createAsyncThunk<Recipe, CreateRecipePayload, { rejectValue: string }>(
  'recipes/createRecipe',
  async (payload, { rejectWithValue }) => {
    try {
      return await createRecipeApi(payload);
    } catch {
      return rejectWithValue('Не удалось создать рецепт');
    }
  },
);

export const deleteRecipe = createAsyncThunk<number, number, { rejectValue: string }>(
  'recipes/deleteRecipe',
  async (payload, { rejectWithValue }) => {
    try {
      await deleteRecipeApi(payload);
      return payload;
    } catch {
      return rejectWithValue('Не удалось удалить рецепт');
    }
  },
);
