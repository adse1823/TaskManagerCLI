# TaskManagerCLI

A simple command-line task manager built with Node.js (no frameworks).

## Project Structure

```
TaskManagerCLI/
├── index.js          # CLI entry point, parses process.argv
├── taskManager.js    # Core task logic and file I/O
├── test.js           # Tests using Node's built-in assert module
├── tasks.json        # Persisted task data (auto-created at runtime)
└── CLAUDE.md         # This file
```

## Conventions

- No external dependencies — Node.js built-ins only (`fs`, `path`, `assert`)
- Tasks are stored in `tasks.json` as a JSON array
- Each task has the shape: `{ id: number, title: string, done: boolean }`
- IDs are auto-incremented based on the highest existing id

## CLI Usage

```bash
node index.js add "Task title"   # Add a new task
node index.js list               # List all tasks
node index.js delete <id>        # Delete task by id
```

## Running Tests

```bash
node test.js
```
