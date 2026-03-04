import { pool } from "./db.js";
import { recipes } from "../../src/shared/data/data.ts";

const seed = async (): Promise<void> => {
  for (const recipe of recipes) {
    await pool.query(
      `INSERT INTO recipes (id, name, ingredients, description)
       VALUES ($1, $2, $3::jsonb, $4)
       ON CONFLICT (id) DO NOTHING`,
      [recipe.id, recipe.name, JSON.stringify(recipe.ingredients), recipe.description]
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
