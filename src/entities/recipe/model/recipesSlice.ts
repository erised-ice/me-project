import { createSlice } from '@reduxjs/toolkit';
import type { Recipe } from './types.ts';
import { createRecipe, deleteRecipe, fetchRecipes } from './thunks.ts';
import { LoadingStatus, type LoadingStatusType } from '@/shared/constants/constants.ts';

type State = {
  data: Recipe[];
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

/*TODO: сделать отдельно слайсы для рецепта, рецептов, удаление рецепта, создание рецепта, потому что одна модель - одна операция. И в файле слайса сделать и селектор, и санки, которые относятся к этой сущности */

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
