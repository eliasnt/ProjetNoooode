import express from 'express';
import movieRoutes from './routes/movie.route';
import dotenv from 'dotenv';
// @ts-ignore
import swaggerUi from 'swagger-ui-express';
// @ts-ignore
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger Documentation
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Rating API',
      version: '1.0.0',
      description: 'API pour noter des films (type Letterboxd)',
    },
  },
  apis: ['./src/routes/*.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', movieRoutes);

// Page d'accueil
app.get('/', (req, res) => {
  res.send(`
        <html>
            <head>
                <title>Movie Rating</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container text-center mt-5">
                    <h1>Bienvenue sur Movie Rating</h1>
                    <p>Classez vos films favoris comme sur Letterboxd !</p>
                    <a href="/api-docs" class="btn btn-primary">Voir la documentation de l'API</a>
                </div>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
