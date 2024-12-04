const express = require("express");
const app = express();
const userController = require("./controllers/users");
const WorkoutController = require("./controllers/workouts");

const port = 3000;

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

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

// Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send(err);
});
app.listen(port, function () {
  console.log("Server is running on http://localhost:" + port);
});
