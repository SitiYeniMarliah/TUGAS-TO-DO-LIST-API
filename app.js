const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Array untuk menyimpan data tugas
let tasks = [];
let idCounter = 1; // Counter untuk ID tugas

// Route untuk membuat tugas baru (POST /tasks)
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }

    const newTask = {
        id: idCounter++,
        title,
        description,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Route untuk melihat daftar semua tugas (GET /tasks)
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Route untuk melihat tugas tertentu berdasarkan ID (GET /tasks/:id)
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
    }
    res.json(task);
});

// Route untuk mengupdate tugas berdasarkan ID (PUT /tasks/:id)
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
    }

    const { title, description, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
});

// Route untuk menghapus tugas berdasarkan ID (DELETE /tasks/:id)
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found.' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Menjalankan server
app.listen(port, () => {
    console.log(`To-Do List API is running on http://localhost:${port}`);
});
