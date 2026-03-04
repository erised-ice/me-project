import {Router} from "express";
import {pool} from "../db";

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
  const result = await pool.query(
    "SELECT id, name, ingredients, description FROM recipes ORDER BY id ASC"
  );
  res.json(result.rows);
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

  const id = Date.now();

  const result = await pool.query(
    `INSERT INTO recipes (id, name, ingredients, description)
   VALUES ($1, $2, $3::jsonb, $4)
   RETURNING id, name, ingredients, description`,
    [id, name.trim(), JSON.stringify(ingredients), description.trim()]
  );

  return res.status(201).json(result.rows[0]);
});