import { pool } from './db.js';
import { createSlugBase, createUniqueSlug } from './slug.js';

const initDb = async (): Promise<void> => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS recipes (
      id BIGSERIAL PRIMARY KEY,
      slug TEXT UNIQUE,
      name TEXT NOT NULL,
      ingredients JSONB NOT NULL,
      description TEXT NOT NULL,
      author TEXT
    );
  `);

  await pool.query('ALTER TABLE recipes ADD COLUMN IF NOT EXISTS slug TEXT');

  const recipesWithoutSlug = await pool.query<{ id: string; name: string }>(
    `SELECT id, name
     FROM recipes
     WHERE slug IS NULL OR slug = ''
     ORDER BY id ASC`,
  );

  const existingSlugs = new Set(
    (
      await pool.query<{ slug: string }>(
        `SELECT slug
         FROM recipes
         WHERE slug IS NOT NULL AND slug <> ''`,
      )
    ).rows.map((row) => row.slug),
  );

  for (const recipe of recipesWithoutSlug.rows) {
    const slug = createUniqueSlug(createSlugBase(recipe.name), existingSlugs);

    await pool.query('UPDATE recipes SET slug = $1 WHERE id = $2', [slug, recipe.id]);
  }

  await pool.query('ALTER TABLE recipes ALTER COLUMN slug SET NOT NULL');
  await pool.query('CREATE UNIQUE INDEX IF NOT EXISTS recipes_slug_unique_idx ON recipes (slug)');

  console.log('DB initialized');
  await pool.end();
};

initDb().catch((error) => {
  console.error('Failed to initialize DB:', error);
  process.exit(1);
});
