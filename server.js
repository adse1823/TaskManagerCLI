const express = require('express');
const path = require('path');
const { loadTasks, addTask, completeTask, deleteTask } = require('./taskManager');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/tasks', (req, res) => {
  res.json(loadTasks());
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = addTask(title.trim());
  res.status(201).json(task);
});

app.patch('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const ok = completeTask(id);
  if (!ok) return res.status(404).json({ error: 'Task not found' });
  res.json({ success: true });
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const ok = deleteTask(id);
  if (!ok) return res.status(404).json({ error: 'Task not found' });
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Task Manager running at http://localhost:3000');
});
