import {Router} from "express";

export const recipesRouter = Router();

const recipes = [
  { id: 1, name: "Блины", ingredients: [], description: "..." }
];

const isValidIngredient = (value: unknown): boolean => {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as { id?: unknown; text?: unknown; tip?: unknown };

  return (
    typeof candidate.id === "number" &&
    typeof candidate.text === "string" &&
    (typeof candidate.tip === "string" || candidate.tip === null)
  );
};

recipesRouter.get("/", (_req, res) => {
  res.json(recipes);
});

recipesRouter.post("/", (req, res) => {
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

  recipes.push(newRecipe);

  return res.status(201).json(newRecipe);
});