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
  .get("/", function (req, res) {
    res.send("Hello World");
  })
  .get("/about", function (req, res) {
    res.send("About Us");
  })
  .use("/users", userController)
  .use("/workouts", WorkoutController);

app.listen(port, function () {
  console.log("Server is running on http://localhost:" + port);
});
