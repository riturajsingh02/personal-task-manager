const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'tasks.json');

// Middleware
app.use(cors());
app.use(express.json());

// Default tasks to fall back to if file doesn't exist
const defaultTasks = [
  {
    id: crypto.randomUUID(),
    title: 'Set up project repository',
    description: 'Initialize Git repo and push initial commit',
    priority: 'high',
    dueDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    completed: false,
    createdAt: new Date().toISOString(),
    order: 0,
  },
  {
    id: crypto.randomUUID(),
    title: 'Design system components',
    description: 'Build reusable button, input, and card components',
    priority: 'medium',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    completed: false,
    createdAt: new Date().toISOString(),
    order: 1,
  },
  {
    id: crypto.randomUUID(),
    title: 'Write unit tests',
    description: 'Cover core utilities with Jest',
    priority: 'low',
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    completed: true,
    createdAt: new Date().toISOString(),
    order: 2,
  },
];

// Helper to read tasks from file
function readTasks() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading tasks.json:', error);
  }
  return defaultTasks;
}

// Helper to write tasks to file
function saveTasks(tasksToSave) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasksToSave, null, 2));
  } catch (error) {
    console.error('Error writing to tasks.json:', error);
  }
}

// Root route for a friendly welcome message
app.get('/', (req, res) => {
  res.send('✅ Personal Task Manager Backend API is running!');
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: crypto.randomUUID(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

// Update or Toggle a task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });
  
  tasks[index] = { ...tasks[index], ...req.body };
  saveTasks(tasks);
  res.json(tasks[index]);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  let tasks = readTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});