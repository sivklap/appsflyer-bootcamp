const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const { mountSwagger } = require("./swagger");

const app = express();
const PORT = process.env.PORT || 5002;

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mountSwagger(app);

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.get("/api/health", (req, res) => {
  res.json({ message: "QueenB Server is running!", timestamp: new Date().toISOString(), status: "healthy" });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to QueenB API" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong!" });
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`📜 Swagger:  http://localhost:${PORT}/api/docs`);
});
