import { Router } from 'express';
import { pool } from '../db';

export const recipesRouter = Router();

type RecipeRow = {
  id: number | string;
  name: string;
  ingredients: { text: string; tip: string | null }[];
  description: string;
  author: string | null;
};

const normalizeRecipe = (recipe: RecipeRow) => ({
  ...recipe,
  id: Number(recipe.id),
});

const isValidIngredient = (value: unknown): boolean => {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as { text?: unknown; tip?: unknown };

  return (
    typeof candidate.text === 'string' &&
    (typeof candidate.tip === 'string' || candidate.tip === null)
  );
};

recipesRouter.get('/', async (_req, res) => {
  const result = await pool.query(
    'SELECT id, name, ingredients, description, author FROM recipes ORDER BY id ASC',
  );
  res.json(result.rows.map((recipe) => normalizeRecipe(recipe as RecipeRow)));
});

recipesRouter.post('/', async (req, res) => {
  const { name, ingredients, description, author } = req.body;

  if (
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    !Array.isArray(ingredients) ||
    !ingredients.every(isValidIngredient) ||
    typeof description !== 'string' ||
    (author !== undefined && author !== null && typeof author !== 'string')
  ) {
    return res.status(400).json({
      message: 'Invalid recipe payload',
    });
  }

  const normalizedAuthor =
    typeof author === 'string' && author.trim().length > 0 ? author.trim() : null;

  const result = await pool.query(
    `INSERT INTO recipes (name, ingredients, description, author)
   VALUES ($1, $2::jsonb, $3, $4)
   RETURNING id, name, ingredients, description, author`,
    [name.trim(), JSON.stringify(ingredients), description.trim(), normalizedAuthor],
  );

  return res.status(201).json(normalizeRecipe(result.rows[0] as RecipeRow));
});

recipesRouter.delete('/:id', async (req, res) => {
  const recipeId = Number(req.params.id);

  if (Number.isNaN(recipeId)) {
    return res.status(400).json({
      message: 'Invalid recipe id',
    });
  }

  const result = await pool.query(
    `DELETE FROM recipes
     WHERE id = $1
     RETURNING id`,
    [recipeId],
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'Recipe not found',
    });
  }

  return res.status(204).send();
});
