"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./models");
const usersRoute = require("./routes/user");
const coursesRoute = require("./routes/course");
const cors = require("cors");
//! Sequelize Authenticate
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "*** DB Connection Successful ***"
    );
  })
  .then(() => sequelize.sync())
  .catch((err) => {
    console.error(
      "Unable to connect to the database:",
      err
    );
  });

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING ===
  "true";

// Create Express app
const app = express();

// Enable CORS
app.use(cors());

//* Setup request body JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup morgan which gives us http request logging
app.use(morgan("dev"));

// TODO setup your api routes here
app.use("/api/users", usersRoute);
app.use("/api/courses", coursesRoute);

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    errors: "Route Not Found",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(
      `Global error handler: ${JSON.stringify(
        err.stack
      )}`
    );
  }

  if (err.errors.length) {
    console.log(
      "[API][Global][Array] Error: ",
      err
    );
    const errorMessages = err.errors.map(
      (err) => err.message
    );
    return res.status(err.status || 500).json({
      errors: errorMessages,
    });
  } else {
    console.log(
      "[API][Global][Non Array] Error: ",
      err
    );
    return res.status(err.status || 500).json({
      errors: err,
    });
  }
});

// set our port
app.set("port", process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(
    `*** Express server is listening on port ${
      server.address().port
    } ***`
  );
});