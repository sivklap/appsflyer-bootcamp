import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import TaskCard from "./TaskCard";

function TaskGrid({ tasks, onEdit, onDelete }) {
  return (
    <Grid container spacing={3}>
      {tasks.map((task) => (
        <Grid item xs={12} sm={6} md={4} key={task.id}>
          <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
      {tasks.length === 0 && (
        <Grid item xs={12}>
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="text.secondary">
              No tasks found for the selected filter
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

export default TaskGrid;
