const express = require("express");
const router = express.Router();

// Mock data - in a real app, this would be a database
let tasks = [
  {
    id: 1,
    title: "Set up project structure",
    description: "Create the initial project structure with client and server",
    status: "completed",
    priority: "high",
    createdAt: new Date("2024-01-01"),
    assignedTo: 1,
  },
  {
    id: 2,
    title: "Implement user authentication",
    description: "Add login and registration functionality",
    status: "in-progress",
    priority: "high",
    createdAt: new Date("2024-01-02"),
    assignedTo: 2,
  },
  {
    id: 3,
    title: "Design dashboard UI",
    description: "Create the main dashboard interface with Material UI",
    status: "pending",
    priority: "medium",
    createdAt: new Date("2024-01-03"),
    assignedTo: 3,
  },
];

// GET /api/tasks - Get all tasks
router.get("/", (req, res) => {
  const { status, priority } = req.query;
  let filteredTasks = tasks;

  if (status) {
    filteredTasks = filteredTasks.filter((task) => task.status === status);
  }

  if (priority) {
    filteredTasks = filteredTasks.filter((task) => task.priority === priority);
  }

  res.json(filteredTasks);
});

// GET /api/tasks/:id - Get task by ID
router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// POST /api/tasks - Create new task
router.post("/", (req, res) => {
  const { title, description, priority = "medium", assignedTo } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: Math.max(...tasks.map((t) => t.id)) + 1,
    title,
    description,
    status: "pending",
    priority,
    createdAt: new Date(),
    assignedTo,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - Update task
router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, description, status, priority, assignedTo } = req.body;
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title,
    description,
    status,
    priority,
    assignedTo,
  };

  res.json(tasks[taskIndex]);
});

// DELETE /api/tasks/:id - Delete task
router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

module.exports = router;
