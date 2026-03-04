import {createSlice} from "@reduxjs/toolkit";
import type {recipe} from "./types.ts";
import {LoadingStatus, type LoadingStatusType} from "../../shared/constants/constants.ts";
import {createRecipe, fetchRecipes} from "./thunks.ts";

type State = {
  data: recipe[];
  fetchRecipesLoadingStatus: LoadingStatusType;
  createRecipeLoadingStatus: LoadingStatusType;
}

const initialState: State = {
  data: [],
  fetchRecipesLoadingStatus: LoadingStatus.INITIAL,
  createRecipeLoadingStatus: LoadingStatus.INITIAL,
}

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
  }
})
