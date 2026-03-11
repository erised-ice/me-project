import type { recipe } from './types.ts';

const API_URL = import.meta.env.VITE_API_URL;

export type CreateRecipePayload = Omit<recipe, 'id'>;

export const getRecipesApi = async (): Promise<recipe[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return (await response.json()) as recipe[];
};

export const createRecipeApi = async (payload: CreateRecipePayload): Promise<recipe> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create recipe');
  }

  return (await response.json()) as recipe;
};
