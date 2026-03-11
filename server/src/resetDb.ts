import { pool } from './db.js';

const resetDb = async (): Promise<void> => {
  await pool.query('DROP TABLE IF EXISTS recipes');

  await pool.query(`
    CREATE TABLE recipes (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      ingredients JSONB NOT NULL,
      description TEXT NOT NULL,
      author TEXT
    );
  `);

  console.log('DB reset completed');
  await pool.end();
};

resetDb().catch(async (error) => {
  console.error('DB reset failed:', error);
  await pool.end();
  process.exit(1);
});
