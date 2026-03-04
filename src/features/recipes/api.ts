import type { recipe } from "./types.ts";

const API_URL = "http://localhost:3001/recipes";

export type CreateRecipePayload = Omit<recipe, "id">;

type ApiRecipe = Omit<recipe, "id"> & { id: number | string };

const normalizeRecipe = (item: ApiRecipe): recipe => ({
  ...item,
  id: Number(item.id),
});

export const getRecipesApi = async (): Promise<recipe[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = (await response.json()) as ApiRecipe[];
  return data.map(normalizeRecipe);
};

export const createRecipeApi = async (
  payload: CreateRecipePayload
): Promise<recipe> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create recipe");
  }

  const data = (await response.json()) as ApiRecipe;
  return normalizeRecipe(data);
};