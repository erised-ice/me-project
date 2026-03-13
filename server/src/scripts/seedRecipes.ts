import { pool } from '../db';
import { recipes } from '../data/data';

const seed = async (): Promise<void> => {
  for (const recipe of recipes) {
    const author = null;

    await pool.query(
      `INSERT INTO recipes (name, ingredients, description, author)
       VALUES ($1, $2::jsonb, $3, $4)`,
      [recipe.name, JSON.stringify(recipe.ingredients), recipe.description, author],
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
