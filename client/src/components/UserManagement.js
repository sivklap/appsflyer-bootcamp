import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Alert, LinearProgress } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import api from "../services/api";
import UserDialog from "./UserDialog";
import UserTable from "./UserTable";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        role: "user",
      });
    }
    setDialogOpen(true);
    setError("");
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      role: "user",
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
      if (!formData.name || !formData.email) {
        setError("Name and email are required");
        return;
      }

      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, formData);
        setSuccess("User updated successfully");
      } else {
        await api.post("/users", formData);
        setSuccess("User created successfully");
      }

      fetchUsers();
      handleCloseDialog();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to save user");
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${userId}`);
        setSuccess("User deleted successfully");
        fetchUsers();
        setTimeout(() => setSuccess(""), 3000);
      } catch (error) {
        setError("Failed to delete user");
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", mt: 2 }}>
        <LinearProgress />
        <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
          Loading users...
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
        <Typography variant="h4">User Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2 }}
        >
          Add User
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

      <UserTable
        users={users}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
      />

      <UserDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        editingUser={editingUser}
        formData={formData}
        onInputChange={handleInputChange}
        error={error}
      />
    </Box>
  );
}

export default UserManagement;
