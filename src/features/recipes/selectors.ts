import type {RootState} from "../../store/store.ts";

export const selectRecipes = (state: RootState) => {
  return state.recipes.data;
}
