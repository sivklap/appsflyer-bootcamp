const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const { mountSwagger } = require("./swagger");

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mountSwagger(app);

app.use("", usersRouter);
app.use("", authRouter);

app.get("/health", (req, res) => {
  res.json({ 
    message: "QueenB Server is running!", 
    timestamp: new Date().toISOString(), 
    status: "healthy",
    database: "MongoDB"
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to QueenB API" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong!", message: err.message });
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Swagger: ${process.env.SERVER_URL}/docs`);
});
