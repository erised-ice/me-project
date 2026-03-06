import express from 'express';
import cors from 'cors';
import { recipesRouter } from './routes/recipes';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/recipes', recipesRouter);
