import {configureStore} from "@reduxjs/toolkit";
import {recipesSlice} from "../features/recipes/recipesSlice.ts";
import {loadRecipes, saveRecipes} from "../shared/utils/storage.ts";

export const store = configureStore({
  reducer: {
    recipes: recipesSlice.reducer,
  },
  preloadedState: {
    recipes: {
      data: loadRecipes(),
    },
  }
});

store.subscribe(() => {
  const recipes = store.getState().recipes.data;
  saveRecipes(recipes);
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
