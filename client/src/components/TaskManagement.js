import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Alert, LinearProgress } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import api from "../services/api";
import TaskDialog from "./TaskDialog";
import TaskFilters from "./TaskFilters";
import TaskGrid from "./TaskGrid";

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    assignedTo: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, activeFilter]);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      setError("Failed to fetch tasks");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    if (activeFilter === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === activeFilter));
    }
  };

  const handleFilterChange = (event, newValue) => {
    setActiveFilter(newValue);
  };

  const handleOpenDialog = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignedTo: task.assignedTo || "",
      });
    } else {
      setEditingTask(null);
      setFormData({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        assignedTo: "",
      });
    }
    setDialogOpen(true);
    setError("");
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTask(null);
    setFormData({
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
      assignedTo: "",
    });
    setError("");
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.title) {
        setError("Title is required");
        return;
      }

      const submitData = {
        ...formData,
        assignedTo: formData.assignedTo ? parseInt(formData.assignedTo) : null,
      };

      if (editingTask) {
        await api.put(`/tasks/${editingTask.id}`, submitData);
        setSuccess("Task updated successfully");
      } else {
        await api.post("/tasks", submitData);
        setSuccess("Task created successfully");
      }

      fetchTasks();
      handleCloseDialog();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to save task");
      console.error("Error saving task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${taskId}`);
        setSuccess("Task deleted successfully");
        fetchTasks();
        setTimeout(() => setSuccess(""), 3000);
      } catch (error) {
        setError("Failed to delete task");
        console.error("Error deleting task:", error);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", mt: 2 }}>
        <LinearProgress />
        <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
          Loading tasks...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Task Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2 }}
        >
          Add Task
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <TaskFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        tasks={tasks}
      />

      <TaskGrid
        tasks={filteredTasks}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
      />

      <TaskDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        editingTask={editingTask}
        formData={formData}
        onInputChange={handleInputChange}
        error={error}
      />
    </Box>
  );
}

export default TaskManagement;
