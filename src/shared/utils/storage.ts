import {recipes} from "../data/data.ts";

export const loadRecipes = () => {
  const savedRecipes = localStorage.getItem("recipes");
  return savedRecipes ? JSON.parse(savedRecipes) : recipes;
}

export const saveRecipes = (newRecipes) => localStorage.setItem("recipes", JSON.stringify(newRecipes));