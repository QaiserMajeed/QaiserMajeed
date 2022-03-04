const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./app/utils/logger/logger");
// const logResponseBody = require("./app/controllers/middleware/logger");
require("dotenv").config();
// Initialize app
const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "https://portal.trygobeyond.com"
    // "https://gobeyond-backend.herokuapp.com"
  );
  // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Import port from .env file
const port = process.env.PORT || 4400;
// bodyParser middleware
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
  req.path ? logger.info(req.path) : null;
  Object.keys(req.params).length !== 0 ? logger.info(req.params) : null;
  Object.keys(req.body).length !== 0 ? logger.info(req.body) : null;
  next();
});
// Load view Engine
app.set("view engine", "ejs");
// call image middleware
app.use(express.static("public"));
// app.use(logResponseBody);
// require db
require("./config/db");

app.get("/", async (req, res) => {
  res.render("404", {
    message: `Go Beyond server started on port ${port}...`,
  });
});
app.use(require("./app/utils/swagger/swagger"));
// Call api routes
app.use("/", require("./app/components/router"));
app.use("/superadmin", require("./app/components/admin-router"));
app.use("/partner", require("./app/components/partner-router"));
// handle 404 not found error
app.use((req, res) => {
  res.status(404);
  // respond with html page
  if (req.accepts("ejs")) {
    res.render("404", { message: req.url });
    return;
  }
  // respond with json
  if (req.accepts("json")) {
    res.send({ error: true, message: "Not Found... Please check app url" });
    return;
  }
  // default to plain-text
  res.type("txt").send("Not Found");
});

// Listen app
app.listen(port, () =>
  logger.info(`GoBeyond server started on port ${port}...`)
);

module.exports = app;
