const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../services/tasksService");

// GET /api/tasks - Get all tasks
router.get("/", (req, res) => {
  const { status, priority } = req.query;
  let filteredTasks = getAllTasks(status, priority);
  res.json(filteredTasks);
});

// GET /api/tasks/:id - Get task by ID
router.get("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = getTaskById(taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// POST /api/tasks - Create new task
router.post("/", (req, res) => {
  const { title, description, priority = "medium", assignedTo } = req.body;

  const result = createTask({
    title,
    description,
    priority,
    assignedTo,
  });

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  res.status(201).json(result.task);
});

// PUT /api/tasks/:id - Update task
router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const { title, description, status, priority, assignedTo } = req.body;

  const result = updateTask({
    taskId,
    title,
    description,
    status,
    priority,
    assignedTo,
  });
  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }

  res.json(result.task);
});

// DELETE /api/tasks/:id - Delete task
router.delete("/:id", (req, res) => {
  const result = deleteTask(req.params.id);

  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }

  res.status(204).send();
});

module.exports = router;
