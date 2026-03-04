import { pool } from "./db.js";

const initDb = async (): Promise<void> => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS recipes (
      id BIGINT PRIMARY KEY,
      name TEXT NOT NULL,
      ingredients JSONB NOT NULL,
      description TEXT NOT NULL
    );
  `);

  console.log("DB initialized");
  await pool.end();
};

initDb().catch((error) => {
  console.error("Failed to initialize DB:", error);
  process.exit(1);
});