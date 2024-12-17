const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

app.use(express.json());

// Dummy data (you can replace this with actual data from a database)
let learningPackages = [
  { id: 1, title: 'Learn TypeScript', description: 'TypeScript basics' },
  { id: 2, title: 'Learn NodeJs', description: 'NodeJs backend' },
  { id: 3, title: 'Learn HTML', description: 'HTML basics' },
  { id: 4, title: 'Learn Angular', description: 'Angular framework' },
];

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LearningPackage API',
      version: '1.0.0',
      description: 'API for managing learning packages',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route for listing all todos
/**
 * @swagger
 * /api/package-summaries:
 *   get:
 *     summary: Retrieve a summary of all todos (id and title only)
 *     responses:
 *       200:
 *         description: A list of todo summaries
 */
app.get('/api/package-summaries', (req, res) => {
  const summaries = learningPackages.map(pkg => ({
    id: pkg.id,
    title: pkg.title,
  }));
  res.json(summaries);
});

// Route for searching todos by title and description
/**
 * @swagger
 * /api/package-summaries/search:
 *   get:
 *     summary: Search for todos by title, description, or tag
 *     parameters:
 *       - in: query
 *         name: title
 *         description: Title of the todo
 *       - in: query
 *         name: description
 *         description: Description of the todo
 *     responses:
 *       200:
 *         description: A list of matching todo summaries
 */
app.get('/api/package-summaries/search', (req, res) => {
  const { title, description } = req.query;

  // Filter todos based on query parameters
  const results = learningPackages.filter(pkg => {
    let match = true;

    if (title && !pkg.title.toLowerCase().includes(title.toLowerCase())) {
      match = false;
    }

    if (description && !pkg.description.toLowerCase().includes(description.toLowerCase())) {
      match = false;
    }

    return match;
  });

  const summaries = results.map(pkg => ({
    id: pkg.id,
    title: pkg.title,
  }));

  res.json(summaries);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Swagger docs available at http://localhost:3000/api-docs');
});
