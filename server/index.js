const express = require("express");
const app = express();
const userController = require("./controllers/users");
const WorkoutController = require("./controllers/workouts");

const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname + "/dist"));

// Controllers
app
  .get("/", function (req, res, next) {
    res.send("Hello World");
  })
  .get("/about", function (req, res, next) {
    res.send("About Us");
  })
  .use("/api/v1/users", userController)
  .use("/api/v1/workouts", WorkoutController)
  .get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
app.listen(port, function () {
  console.log("Server is running on http://localhost:" + port);
});
