import { Router, Request, Response } from 'express';
// @ts-ignore
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

// Route pour récupérer tous les films
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM movies');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des films' });
  }
});

export default router;
