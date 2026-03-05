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
    "SELECT id, name, ingredients, description, author FROM recipes ORDER BY id ASC"
  );
  res.json(result.rows);
});

recipesRouter.post("/", async (req, res) => {
  const { name, ingredients, description, author } = req.body;

  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    !Array.isArray(ingredients) ||
    !ingredients.every(isValidIngredient) ||
    typeof description !== "string" ||
    (author !== undefined && author !== null && typeof author !== "string")
  ) {
    return res.status(400).json({
      message: "Invalid recipe payload"
    });
  }

  const id = Date.now();
  const normalizedAuthor =
    typeof author === "string" && author.trim().length > 0 ? author.trim() : null;

  const result = await pool.query(
    `INSERT INTO recipes (id, name, ingredients, description, author)
   VALUES ($1, $2, $3::jsonb, $4, $5)
   RETURNING id, name, ingredients, description, author`,
    [id, name.trim(), JSON.stringify(ingredients), description.trim(), normalizedAuthor]
  );

  return res.status(201).json(result.rows[0]);
});
