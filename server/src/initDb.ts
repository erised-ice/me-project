import { pool } from "./db.js";

const initDb = async (): Promise<void> => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS recipes (
      id BIGINT PRIMARY KEY,
      name TEXT NOT NULL,
      ingredients JSONB NOT NULL,
      description TEXT NOT NULL,
      author TEXT
    );
  `);

  // Ensure old environments also get the new column.
  await pool.query(`
    ALTER TABLE recipes
    ADD COLUMN IF NOT EXISTS author TEXT;
  `);

  console.log("DB initialized");
  await pool.end();
};

initDb().catch((error) => {
  console.error("Failed to initialize DB:", error);
  process.exit(1);
});
