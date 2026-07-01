import { Router } from 'express';
import { pool } from '../db';
import {
  generateRecipeCreatorToken,
  hashRecipeCreatorToken,
  isAdminTokenValid,
  isRecipeCreatorTokenValid,
} from '../recipeTokens';
import { createSlugBase, createUniqueSlug } from '../slug';

export const recipesRouter = Router();

type RecipeRow = {
  id: number | string;
  slug: string;
  name: string;
  ingredients: { text: string; tip: string | null }[];
  description: string;
  author: string | null;
  category: RecipeCategory | null;
};

type RecipeCategory = 'soups' | 'mains' | 'snacks' | 'sweets' | 'lunch' | 'pastry';

const recipeCategories = new Set<string>(['soups', 'mains', 'snacks', 'sweets', 'lunch', 'pastry']);

const normalizeRecipe = (recipe: RecipeRow) => ({
  ...recipe,
  id: Number(recipe.id),
});

const isValidRecipeCategory = (value: unknown): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && recipeCategories.has(value));

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
    'SELECT id, slug, name, ingredients, description, author, category FROM recipes ORDER BY id ASC',
  );
  res.json(result.rows.map((recipe) => normalizeRecipe(recipe as RecipeRow)));
});

recipesRouter.get('/:slug', async (req, res) => {
  const recipeSlug = req.params.slug;

  const result = await pool.query(
    `SELECT id, slug, name, ingredients, description, author, category
     FROM recipes
     WHERE slug = $1`,
    [recipeSlug],
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: 'Recipe not found',
    });
  }

  return res.json(normalizeRecipe(result.rows[0] as RecipeRow));
});

recipesRouter.post('/', async (req, res) => {
  const { name, ingredients, description, author, category } = req.body;

  if (
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    !Array.isArray(ingredients) ||
    !ingredients.every(isValidIngredient) ||
    typeof description !== 'string' ||
    (author !== undefined && author !== null && typeof author !== 'string') ||
    !isValidRecipeCategory(category)
  ) {
    return res.status(400).json({
      message: 'Invalid recipe payload',
    });
  }

  const normalizedAuthor =
    typeof author === 'string' && author.trim().length > 0 ? author.trim() : null;
  const normalizedCategory = typeof category === 'string' ? category : null;
  const baseSlug = createSlugBase(name);
  const existingSlugs = new Set(
    (await pool.query<{ slug: string }>('SELECT slug FROM recipes')).rows.map((row) => row.slug),
  );
  const slug = createUniqueSlug(baseSlug, existingSlugs);
  const creatorToken = generateRecipeCreatorToken();
  const creatorTokenHash = hashRecipeCreatorToken(creatorToken);

  const result = await pool.query(
    `INSERT INTO recipes (slug, name, ingredients, description, author, category, creator_token_hash)
   VALUES ($1, $2, $3::jsonb, $4, $5, $6, $7)
   RETURNING id, slug, name, ingredients, description, author, category`,
    [
      slug,
      name.trim(),
      JSON.stringify(ingredients),
      description.trim(),
      normalizedAuthor,
      normalizedCategory,
      creatorTokenHash,
    ],
  );

  return res.status(201).json({
    recipe: normalizeRecipe(result.rows[0] as RecipeRow),
    creatorToken,
  });
});

recipesRouter.delete('/:id', async (req, res) => {
  const recipeId = Number(req.params.id);
  const creatorToken = req.get('X-Recipe-Creator-Token');
  const adminToken = req.get('X-Admin-Token');

  if (Number.isNaN(recipeId)) {
    return res.status(400).json({
      message: 'Invalid recipe id',
    });
  }

  const recipeResult = await pool.query<{ creator_token_hash: string | null }>(
    `SELECT creator_token_hash
     FROM recipes
     WHERE id = $1`,
    [recipeId],
  );

  if (recipeResult.rowCount === 0) {
    return res.status(404).json({
      message: 'Recipe not found',
    });
  }

  const canDelete =
    isAdminTokenValid(adminToken) ||
    isRecipeCreatorTokenValid(creatorToken, recipeResult.rows[0].creator_token_hash);

  if (!canDelete) {
    return res.status(403).json({
      message: 'You do not have permission to delete this recipe',
    });
  }

  await pool.query(
    `DELETE FROM recipes
     WHERE id = $1`,
    [recipeId],
  );

  return res.status(204).send();
});
