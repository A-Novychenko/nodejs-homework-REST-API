const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const {DB_HOST, PORT = 3000} = process.env;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const contactsRouter = require("./api");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api", contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/tasks",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
