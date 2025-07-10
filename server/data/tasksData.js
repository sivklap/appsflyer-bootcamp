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

module.exports = {
  tasks,
};
