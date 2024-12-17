const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = []; // In-memory array to store todos

app.get('/api/todos', (req, res) => res.json(todos));
app.post('/api/todos', (req, res) => {
    const todo = { id: Date.now(), ...req.body };
    todos.push(todo);
    res.status(201).json(todo);
});
app.put('/api/todos/:id', (req, res) => {
    const index = todos.findIndex(todo => todo.id == req.params.id);
    if (index !== -1) {
        todos[index] = { ...todos[index], ...req.body };
        res.json(todos[index]);
    } else {
        res.status(404).send('Todo not found');
    }
});
app.delete('/api/todos/:id', (req, res) => {
    todos = todos.filter(todo => todo.id != req.params.id);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
