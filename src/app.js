const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Register all routes below
app.use("/api/v1/", (req, res) => res.send("Welcome to lets cook API..."))


// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// error handler middleware
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ message: err.message, success: false });
});

// NB: Server listening is not done here, rather in ../bin/www.ts

module.exports = app