import {recipes} from "../data/data.ts";
import type {recipe} from "../../features/recipes/types.ts";

export const loadRecipes = (): recipe[] => {
  const savedRecipes = localStorage.getItem("recipes");
  return savedRecipes ? (JSON.parse(savedRecipes) as recipe[]) : recipes;
};

export const saveRecipes = (newRecipes: recipe[]): void =>
  localStorage.setItem("recipes", JSON.stringify(newRecipes));
