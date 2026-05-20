const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

function loadTasks() {
  if (!fs.existsSync(TASKS_FILE)) return [];
  const data = fs.readFileSync(TASKS_FILE, 'utf8');
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

function addTask(title) {
  const tasks = loadTasks();
  const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const task = { id, title, done: false };
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

function listTasks() {
  return loadTasks();
}

function deleteTask(id) {
  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  saveTasks(tasks);
  return true;
}

function completeTask(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return false;
  task.done = true;
  saveTasks(tasks);
  return true;
}

module.exports = { loadTasks, saveTasks, addTask, listTasks, deleteTask, completeTask };
