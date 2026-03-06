import type { RootState } from '../../store/store.ts';

export const selectRecipes = (state: RootState) => {
  return state.recipes.data;
};

export const selectFetchRecipesLoadingStatus = (state: RootState) => {
  return state.recipes.fetchRecipesLoadingStatus;
};

export const selectCreateRecipeLoadingStatus = (state: RootState) => {
  return state.recipes.createRecipeLoadingStatus;
};
