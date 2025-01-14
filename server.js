const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const {DB_HOST, PORT = 3000} = process.env;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use(express.static("public"));

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

const {createErrorReq} = require("./helpers");
app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  const {statusText, codeErr, messageDescr, dataDescr} = createErrorReq(
    status,
    message
  );

  res.status(status).json({
    status: statusText,
    code: codeErr,
    message: messageDescr,
    data: dataDescr,
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
