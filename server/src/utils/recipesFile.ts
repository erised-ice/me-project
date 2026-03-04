import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

type Ingredient = {
  id: number;
  text: string;
  tip: string | null;
};

export type Recipe = {
  id: number;
  name: string;
  ingredients: Ingredient[];
  description: string;
};

const RECIPES_FILE_PATH = resolve(process.cwd(), "src/data/recipes.json");

export const readRecipes = async (): Promise<Recipe[]> => {
  const fileContent = await readFile(RECIPES_FILE_PATH, "utf-8");
  return JSON.parse(fileContent) as Recipe[];
};

export const writeRecipes = async (recipes: Recipe[]): Promise<void> => {
  await writeFile(RECIPES_FILE_PATH, JSON.stringify(recipes, null, 2), "utf-8");
};