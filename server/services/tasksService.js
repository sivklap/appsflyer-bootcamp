const { tasks } = require("../data/tasksData");

function getAllTasks(status, priority) {
  let filteredTasks = tasks;

  if (status) {
    filteredTasks = filteredTasks.filter((task) => task.status === status);
  }

  if (priority) {
    filteredTasks = filteredTasks.filter((task) => task.priority === priority);
  }

  return filteredTasks;
}

function getTaskById(taskId) {
  const task = tasks.find((t) => t.id === parseInt(taskId));
  if (!task) {
    return null;
  }
  return task;
}

function createTask({ title, description, priority = "medium", assignedTo }) {
  if (!title) {
    return { success: false, error: "Title is required" };
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
  return { success: true, task: newTask };
}

function updateTask({
  taskId,
  title,
  description,
  status,
  priority,
  assignedTo,
}) {
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return { success: false, error: "Task not found" };
  }

  let currTask = tasks[taskIndex];
  currTask = {
    ...currTask,
    title,
    description,
    status,
    priority,
    assignedTo,
  };

  tasks[taskIndex] = currTask;

  return { success: true, task: currTask };
}

function deleteTask(taskId) {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(taskId));

  if (taskIndex === -1) {
    return { success: false, error: "Task not found" };
  }

  tasks.splice(taskIndex, 1);
  return { success: true };
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
