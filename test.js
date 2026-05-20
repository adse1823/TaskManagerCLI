const assert = require('assert');
const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Clean up before tests
function reset() {
  if (fs.existsSync(TASKS_FILE)) fs.unlinkSync(TASKS_FILE);
}

const { loadTasks, saveTasks, addTask, listTasks, deleteTask } = require('./taskManager');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  PASS: ${name}`);
    passed++;
  } catch (err) {
    console.log(`  FAIL: ${name}`);
    console.log(`        ${err.message}`);
    failed++;
  }
}

// --- loadTasks ---
reset();
test('loadTasks returns [] when tasks.json does not exist', () => {
  const tasks = loadTasks();
  assert.deepStrictEqual(tasks, []);
});

test('loadTasks returns saved tasks', () => {
  saveTasks([{ id: 1, title: 'Test', done: false }]);
  const tasks = loadTasks();
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].title, 'Test');
});

// --- saveTasks / loadTasks round-trip ---
reset();
test('saveTasks persists tasks to disk', () => {
  const data = [{ id: 1, title: 'Persist me', done: false }];
  saveTasks(data);
  const loaded = loadTasks();
  assert.deepStrictEqual(loaded, data);
});

// --- addTask ---
reset();
test('addTask creates a task with id, title, done:false', () => {
  const task = addTask('Buy milk');
  assert.strictEqual(task.title, 'Buy milk');
  assert.strictEqual(task.done, false);
  assert.strictEqual(typeof task.id, 'number');
});

test('addTask auto-increments id', () => {
  const t1 = addTask('First');
  const t2 = addTask('Second');
  assert.strictEqual(t2.id, t1.id + 1);
});

test('addTask persists task to disk', () => {
  reset();
  addTask('Persisted task');
  const tasks = loadTasks();
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].title, 'Persisted task');
});

// --- listTasks ---
reset();
test('listTasks returns all tasks', () => {
  addTask('Task A');
  addTask('Task B');
  const tasks = listTasks();
  assert.strictEqual(tasks.length, 2);
});

test('listTasks returns [] when no tasks', () => {
  reset();
  assert.deepStrictEqual(listTasks(), []);
});

// --- deleteTask ---
reset();
test('deleteTask removes task by id and returns true', () => {
  const task = addTask('To delete');
  const result = deleteTask(task.id);
  assert.strictEqual(result, true);
  assert.strictEqual(listTasks().length, 0);
});

test('deleteTask returns false for non-existent id', () => {
  reset();
  const result = deleteTask(999);
  assert.strictEqual(result, false);
});

test('deleteTask only removes the targeted task', () => {
  reset();
  addTask('Keep me');
  const target = addTask('Delete me');
  deleteTask(target.id);
  const tasks = listTasks();
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].title, 'Keep me');
});

// Cleanup
reset();

console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
