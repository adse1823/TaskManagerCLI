# Task Manager CLI — Multi-Agent Coding Project

A beginner-friendly project for learning multi-agent coding with Claude Code in VS Code.

---

## What This Project Is

A simple command-line Task Manager app built using a **multi-agent workflow**:

- **Agent 1 (Architect)** — Designs the structure
- **Agent 2 (Builder)** — Writes the code
- **Agent 3 (Tester)** — Writes and runs tests

---

## Project Structure

```
task-manager/
├── CLAUDE.md         # Shared rules and context for all agents
├── index.js          # CLI entry point
├── taskManager.js    # Core logic (add, list, delete tasks)
├── tasks.json        # Data storage (auto-created)
├── test.js           # Tests
└── README.md         # You are here
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [VS Code](https://code.visualstudio.com/) with the Claude Code extension

### Installation

```bash
# Clone or create the project folder
mkdir task-manager
cd task-manager
npm init -y
```

---

## Usage

```bash
# Add a task
node index.js add "Buy milk"

# List all tasks
node index.js list

# Delete a task by ID
node index.js delete 1
```

---

## Running Tests

```bash
node test.js
```

Expected output:
```
✅ addTask works
✅ listTasks count works
✅ deleteTask works
✅ loadTasks handles missing file

🎉 All tests passed!
```

---

## Multi-Agent Workflow

This project is built using Claude Code in VS Code with a multi-agent approach.

### Option 1 — Single Orchestrating Agent (Recommended for beginners)

Paste this into your Claude Code panel:

```
You are building a simple Task Manager CLI app in this folder.

Work through these steps autonomously:
1. Create CLAUDE.md with project conventions
2. Implement taskManager.js (loadTasks, saveTasks, addTask, listTasks, deleteTask)
3. Implement index.js with CLI commands: add, list, delete
4. Write tests in test.js using Node's built-in assert module
5. Run tests with: node test.js — fix and retry until all pass

Complete all steps without asking for input.
```

### Option 2 — Multiple Agent Panels (Parallel work)

1. Open Claude Code panel in VS Code
2. Press `Cmd+Shift+P` → `Claude: New Chat` to open a second panel
3. Assign each panel a different role (Builder, Tester, Reviewer)

---

## How Agents Communicate

Agents share information through files — not direct conversation:

| File | Purpose |
|---|---|
| `CLAUDE.md` | Shared rules every agent reads automatically |
| `taskManager.js` | Builder writes it, Tester reads it |
| `tasks.json` | Runtime data storage |

---

## Key Concepts Learned

| Concept | Description |
|---|---|
| **Orchestrator pattern** | One agent plans and delegates to others |
| **File-based communication** | Agents share state through files |
| **Self-healing loop** | Tester agent runs tests, Debugger fixes failures |
| **CLAUDE.md** | Project-wide context injected into every agent |
| **Separation of concerns** | Each agent has one focused job |

---

## Next Steps

- Add a `done` command to mark tasks complete: `node index.js done 1`
- Add a Reviewer agent that checks code quality before tests run
- Try running Builder and Tester agents in parallel using two Claude Code panels

---

## Resources

- [Claude Code Docs](https://docs.claude.com)
- [Multi-agent coding guide](https://docs.claude.com/en/docs/build-with-claude/agents)