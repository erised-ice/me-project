import {createAsyncThunk} from "@reduxjs/toolkit";
import {createRecipeApi, type CreateRecipePayload, getRecipesApi} from "./api.ts";
import type {recipe} from "./types.ts";


export const fetchRecipes = createAsyncThunk<
  recipe[],
  void,
  { rejectValue: string }
>("recipes/fetchRecipes", async (_, { rejectWithValue }) => {
  try {
    return await getRecipesApi();
  } catch {
    return rejectWithValue("Не удалось загрузить рецепты");
  }
});

export const createRecipe = createAsyncThunk<
  recipe,
  CreateRecipePayload,
  { rejectValue: string }
>("recipes/createRecipe", async (payload, { rejectWithValue }) => {
  try {
    return await createRecipeApi(payload);
  } catch {
    return rejectWithValue("Не удалось создать рецепт")
  }
});