import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createRecipeApi, type CreateRecipePayload } from '@/entities/recipe/api.ts';
import type { Recipe } from '@/entities/recipe/model/types.ts';
import { LoadingStatus, type LoadingStatusType } from '@/shared/constants/constants';
import type { RootState } from '@/shared/store/store.ts';

type State = {
  createRecipeLoadingStatus: LoadingStatusType;
};

const initialState: State = {
  createRecipeLoadingStatus: LoadingStatus.INITIAL,
};

export const createRecipe = createAsyncThunk<Recipe, CreateRecipePayload, { rejectValue: string }>(
  'recipes/createRecipe',
  async (payload, { rejectWithValue }) => {
    try {
      return await createRecipeApi(payload);
    } catch {
      return rejectWithValue('Не удалось создать рецепт');
    }
  },
);

export const createRecipeSlice = createSlice({
  initialState,
  name: 'createRecipe',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRecipe.pending, (state) => {
        state.createRecipeLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(createRecipe.rejected, (state) => {
        state.createRecipeLoadingStatus = LoadingStatus.ERROR;
      })
      .addCase(createRecipe.fulfilled, (state) => {
        state.createRecipeLoadingStatus = LoadingStatus.LOADED;
      });
  },
});

export const selectCreateRecipeLoadingStatus = (state: RootState) => {
  return state.createRecipe.createRecipeLoadingStatus;
};
