import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteRecipeApi, type DeleteRecipePayload } from '@/entities/recipe/api.ts';
import { LoadingStatus, type LoadingStatusType } from '@/shared/constants/constants.ts';

type State = {
  deleteRecipeLoadingStatus: LoadingStatusType;
};

const initialState: State = {
  deleteRecipeLoadingStatus: LoadingStatus.INITIAL,
};

export const deleteRecipe = createAsyncThunk<number, DeleteRecipePayload, { rejectValue: string }>(
  'recipes/deleteRecipe',
  async (payload, { rejectWithValue }) => {
    try {
      await deleteRecipeApi(payload);
      return payload.recipeId;
    } catch {
      return rejectWithValue('Не удалось удалить рецепт');
    }
  },
);

export const deleteRecipeSlice = createSlice({
  initialState,
  name: 'deleteRecipe',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteRecipe.pending, (state) => {
        state.deleteRecipeLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(deleteRecipe.rejected, (state) => {
        state.deleteRecipeLoadingStatus = LoadingStatus.ERROR;
      })
      .addCase(deleteRecipe.fulfilled, (state) => {
        state.deleteRecipeLoadingStatus = LoadingStatus.LOADED;
      });
  },
});
