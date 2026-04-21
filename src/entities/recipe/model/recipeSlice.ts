import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRecipeApi } from '@/entities/recipe/api.ts';
import type { Recipe } from '@/entities/recipe/model/types.ts';
import { LoadingStatus, type LoadingStatusType } from '@/shared/constants/constants.ts';
import type { RootState } from '@/shared/store/store.ts';

type State = {
  data: Recipe | null;
  fetchRecipeLoadingStatus: LoadingStatusType;
};

const initialState: State = {
  data: null,
  fetchRecipeLoadingStatus: LoadingStatus.INITIAL,
};

export const fetchRecipe = createAsyncThunk<Recipe, number, { rejectValue: string }>(
  'recipes/fetchRecipe',
  async (recipeId, { rejectWithValue }) => {
    try {
      return await getRecipeApi(recipeId);
    } catch {
      return rejectWithValue('Не удалось загрузить рецепт');
    }
  },
);

export const recipeSlice = createSlice({
  initialState,
  name: 'recipe',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipe.pending, (state) => {
        state.fetchRecipeLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetchRecipeLoadingStatus = LoadingStatus.LOADED;
      })
      .addCase(fetchRecipe.rejected, (state) => {
        state.fetchRecipeLoadingStatus = LoadingStatus.ERROR;
      });
  },
});

export const selectRecipe = (state: RootState) => {
  return state.recipe.data;
};

export const selectRecipeLoadingStatus = (state: RootState) =>
  state.recipe.fetchRecipeLoadingStatus;
