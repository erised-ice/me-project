import {Router} from "express";
import {readRecipes, writeRecipes} from "../utils/recipesFile";

export const recipesRouter = Router();

const isValidIngredient = (value: unknown): boolean => {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as { id?: unknown; text?: unknown; tip?: unknown };

  return (
    typeof candidate.id === "number" &&
    typeof candidate.text === "string" &&
    (typeof candidate.tip === "string" || candidate.tip === null)
  );
};

recipesRouter.get("/", async (_req, res) => {
  const recipes = await readRecipes();
  res.json(recipes);
});

recipesRouter.post("/", async (req, res) => {
  const { name, ingredients, description } = req.body;

  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    !Array.isArray(ingredients) ||
    !ingredients.every(isValidIngredient) ||
    typeof description !== "string"
  ) {
    return res.status(400).json({
      message: "Invalid recipe payload"
    });
  }

  const newRecipe = {
    id: Date.now(),
    name: name.trim(),
    ingredients,
    description: description.trim()
  };

  const recipes = await readRecipes();
  recipes.push(newRecipe);
  await writeRecipes(recipes);

  return res.status(201).json(newRecipe);
});