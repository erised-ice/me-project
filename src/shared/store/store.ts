import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createRecipeSlice } from '@/entities/recipe/model/createRecipeSlice.ts';
import { deleteRecipeSlice } from '@/entities/recipe/model/deleteRecipeSlice.ts';
import { recipesSlice } from '@/entities/recipe/model/recipesSlice.ts';

export const store = configureStore({
  reducer: {
    recipes: recipesSlice.reducer,
    createRecipe: createRecipeSlice.reducer,
    deleteRecipe: deleteRecipeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
