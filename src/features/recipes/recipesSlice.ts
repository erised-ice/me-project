import { createSlice } from '@reduxjs/toolkit';
import type { recipe } from './types.ts';
import { LoadingStatus, type LoadingStatusType } from '../../shared/constants/constants.ts';
import { createRecipe, deleteRecipe, fetchRecipes } from './thunks.ts';

type State = {
  data: recipe[];
  fetchRecipesLoadingStatus: LoadingStatusType;
  createRecipeLoadingStatus: LoadingStatusType;
  deleteRecipeLoadingStatus: LoadingStatusType;
};

const initialState: State = {
  data: [],
  fetchRecipesLoadingStatus: LoadingStatus.INITIAL,
  createRecipeLoadingStatus: LoadingStatus.INITIAL,
  deleteRecipeLoadingStatus: LoadingStatus.INITIAL,
};

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
      .addCase(createRecipe.pending, (state) => {
        state.createRecipeLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(createRecipe.rejected, (state) => {
        state.createRecipeLoadingStatus = LoadingStatus.ERROR;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.createRecipeLoadingStatus = LoadingStatus.LOADED;
        state.data.push(action.payload);
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.deleteRecipeLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(deleteRecipe.rejected, (state) => {
        state.deleteRecipeLoadingStatus = LoadingStatus.ERROR;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.deleteRecipeLoadingStatus = LoadingStatus.LOADED;
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});
