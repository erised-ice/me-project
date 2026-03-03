import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {recipe} from "./types.ts";

type State = {
  data: recipe[];
}

const initialState: State = {
  data: [],
}

export const recipesSlice = createSlice({
  initialState,
  name: 'recipes',
  reducers: {
    setRecipes: (state, action: PayloadAction<recipe[]>) => {
      state.data = action.payload;
    },
    addRecipe: (state, action: PayloadAction<recipe>) => {
      state.data.push(action.payload);
    }
  },
})

export const {setRecipes, addRecipe} = recipesSlice.actions;
