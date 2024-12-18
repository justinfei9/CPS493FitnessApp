const express = require("express");
const app = express();
const userController = require("./controllers/users");
const WorkoutController = require("./controllers/workouts");
const progressController = require("./controllers/progress");

const port = 3000;

// Middleware

app.use((req, res, next) => {
  console.log("CORS Middleware: ", req.method, req.url);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());
app.use(express.static(__dirname + "/dist"));

// Controllers
//i want to add a print statement to debug when these are called

app
  .use(
    "/api/v1/users",
    (req, res, next) => {
      console.log("User Controller called");
      next();
    },
    userController
  )
  .use(
    "/api/v1/workouts",
    (req, res, next) => {
      console.log("Workout Controller called");
      next();
    },
    WorkoutController
  )
  .use(
    "/api/v1/progress",
    (req, res, next) => {
      console.log("Progress Controller called");
      next();
    },
    progressController
  )
  .get("/", function (req, res, next) {
    res.send("Hello World!");
  })
  .get("/about", function (req, res, next) {
    res.send("About Us");
  })
  .get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });

// Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send(err);
});
app.listen(port, function () {
  console.log("Server is running on http://localhost:" + port);
});
