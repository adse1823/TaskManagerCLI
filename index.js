const { addTask, listTasks, deleteTask, completeTask } = require('./taskManager');

const [,, command, ...args] = process.argv;

switch (command) {
  case 'add': {
    const title = args.join(' ');
    if (!title) {
      console.error('Usage: node index.js add "Task title"');
      process.exit(1);
    }
    const task = addTask(title);
    console.log(`Added task #${task.id}: ${task.title}`);
    break;
  }
  case 'list': {
    const tasks = listTasks();
    if (tasks.length === 0) {
      console.log('No tasks found.');
    } else {
      tasks.forEach(t => {
        const status = t.done ? '✅' : '⬜';
        console.log(`${status} #${t.id}: ${t.title}`);
      });
    }
    break;
  }
  case 'delete': {
    const id = parseInt(args[0], 10);
    if (isNaN(id)) {
      console.error('Usage: node index.js delete <id>');
      process.exit(1);
    }
    const removed = deleteTask(id);
    if (removed) {
      console.log(`Deleted task #${id}`);
    } else {
      console.error(`Task #${id} not found`);
      process.exit(1);
    }
    break;
  }
  case 'done': {
    const id = parseInt(args[0], 10);
    if (isNaN(id)) {
      console.error('Usage: node index.js done <id>');
      process.exit(1);
    }
    const completed = completeTask(id);
    if (completed) {
      console.log(`Task #${id} marked as done ✅`);
    } else {
      console.error(`Task #${id} not found`);
      process.exit(1);
    }
    break;
  }
  default:
    console.error('Commands: add "title" | list | delete <id> | done <id>');
    process.exit(1);
}
