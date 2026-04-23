import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRecipesApi } from '@/entities/recipe/api.ts';
import { deleteRecipe } from '@/entities/recipe/model/deleteRecipeSlice.ts';
import { LoadingStatus, type LoadingStatusType } from '@/shared/constants/constants.ts';
import type { RootState } from '@/shared/store/store.ts';
import { createRecipe } from './createRecipeSlice.ts';
import type { Recipe } from './types.ts';

type State = {
  data: Recipe[];
  fetchRecipesLoadingStatus: LoadingStatusType;
};

const initialState: State = {
  data: [],
  fetchRecipesLoadingStatus: LoadingStatus.INITIAL,
};

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

export const recipesSlice = createSlice({
  initialState,
  name: 'recipes',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.fetchRecipesLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.fetchRecipesLoadingStatus = LoadingStatus.LOADED;
        state.data = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.fetchRecipesLoadingStatus = LoadingStatus.ERROR;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export const selectRecipes = (state: RootState) => {
  return state.recipes.data;
};

export const selectFetchRecipesLoadingStatus = (state: RootState) => {
  return state.recipes.fetchRecipesLoadingStatus;
};
