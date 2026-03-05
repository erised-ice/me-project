import { pool } from "./db.js";
import { recipes } from "../../src/shared/data/data.ts";

const seed = async (): Promise<void> => {
  for (const recipe of recipes) {
    const author = "Seed data";

    await pool.query(
      `INSERT INTO recipes (id, name, ingredients, description, author)
       VALUES ($1, $2, $3::jsonb, $4, $5)
       ON CONFLICT (id) DO NOTHING`,
      [recipe.id, recipe.name, JSON.stringify(recipe.ingredients), recipe.description, author]
    );
  }

  console.log("Seed completed");
  await pool.end();
};

seed().catch(async (error) => {
  console.error("Seed failed:", error);
  await pool.end();
  process.exit(1);
});
