import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
} from "@mui/material";

function UserDialog({
  open,
  onClose,
  onSubmit,
  editingUser,
  formData,
  onInputChange,
  error,
}) {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          autoFocus
          margin="dense"
          label="Full Name"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={onInputChange("name")}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={onInputChange("email")}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel>Role</InputLabel>
          <Select
            value={formData.role}
            onChange={onInputChange("role")}
            label="Role"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {editingUser ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDialog;
