import { pool } from '../db';
import { recipes } from '../data/data';
import { createSlugBase, createUniqueSlug } from '../slug';

const seed = async (): Promise<void> => {
  const existingSlugs = new Set<string>();

  for (const recipe of recipes) {
    const author = null;
    const slug = createUniqueSlug(createSlugBase(recipe.name), existingSlugs);

    await pool.query(
      `INSERT INTO recipes (slug, name, ingredients, description, author)
       VALUES ($1, $2, $3::jsonb, $4, $5)`,
      [slug, recipe.name, JSON.stringify(recipe.ingredients), recipe.description, author],
    );
  }

  console.log('Seed completed');
  await pool.end();
};

seed().catch(async (error) => {
  console.error('Seed failed:', error);
  await pool.end();
  process.exit(1);
});
