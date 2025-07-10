import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { Assignment, CheckCircle, Schedule } from "@mui/icons-material";

function TaskFilters({ activeFilter, onFilterChange, tasks }) {
  const getFilterCount = (status) => {
    if (status === "all") return tasks.length;
    return tasks.filter((task) => task.status === status).length;
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
      <Tabs
        value={activeFilter}
        onChange={onFilterChange}
        aria-label="task filter tabs"
      >
        <Tab
          label={`All (${getFilterCount("all")})`}
          value="all"
          icon={<Assignment />}
          iconPosition="start"
        />
        <Tab
          label={`Pending (${getFilterCount("pending")})`}
          value="pending"
          icon={<Schedule />}
          iconPosition="start"
        />
        <Tab
          label={`In Progress (${getFilterCount("in-progress")})`}
          value="in-progress"
          icon={<Schedule />}
          iconPosition="start"
        />
        <Tab
          label={`Completed (${getFilterCount("completed")})`}
          value="completed"
          icon={<CheckCircle />}
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
}

export default TaskFilters;
