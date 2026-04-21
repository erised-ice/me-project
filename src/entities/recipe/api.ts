import type { Recipe } from './model/types.ts';

const API_URL = import.meta.env.VITE_API_URL;

export type CreateRecipePayload = Omit<Recipe, 'id'>;

export const getRecipesApi = async (): Promise<Recipe[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return await response.json();
};

export const getRecipeApi = async (recipeId: number): Promise<Recipe> => {
  const response = await fetch(`${API_URL}/${recipeId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch recipe');
  }

  return await response.json();
};

export const createRecipeApi = async (payload: CreateRecipePayload): Promise<Recipe> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create recipe');
  }

  return await response.json();
};

export const deleteRecipeApi = async (recipeId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${recipeId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete recipe');
  }
};
