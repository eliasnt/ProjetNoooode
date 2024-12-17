import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration de la connexion PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Ranking API',
      version: '1.0.0',
      description: 'API pour classer vos films préférés',
    },
  },
  apis: ['./src/routes/*.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Page d'accueil
app.get('/', (req: Request, res: Response) => {
  res.status(200).send(`
        <html>
            <head>
                <title>Movie Ranking App</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container text-center mt-5">
                    <h1 class="display-4">Bienvenue sur Movie Ranking</h1>
                    <p class="lead">Classez vos films préférés avec notre application.</p>
                    <hr />
                    <a href="/api/movies" class="btn btn-primary">Voir les Films</a>
                </div>
            </body>
        </html>
    `);
});

// Exemple de route CRUD (lecture des films)
app.get('/api/movies', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM movies');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des films' });
  }
});
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
