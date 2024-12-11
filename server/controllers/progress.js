const progressModel = require("../model/progress"); // Import the progress model
const express = require("express");
const app = express.Router();

app
  // Get all progress entries
  .get("/", function (req, res, next) {
    progressModel
      .getAll()
      .then((progress) => res.send(progress))
      .catch(next);
  })

  // Get progress by ID
  .get("/:id", function (req, res, next) {
    const id = req.params.id;
    progressModel
      .get(+id) // Convert the ID to a number
      .then((progress) => res.send(progress))
      .catch(next);
  })

  // Create a new progress entry
  .post("/", function (req, res, next) {
    progressModel
      .add(req.body) // Assuming progress data is in the request body
      .then((progress) => res.send(progress))
      .catch(next);
  })

  // Update a progress entry by ID
  .patch("/:id", function (req, res, next) {
    const id = req.params.id;
    progressModel
      .update(+id, req.body) // Convert the ID to a number and use the request body to update the progress
      .then((progress) => res.send(progress))
      .catch(next);
  })

  // Delete a progress entry by ID
  .delete("/:id", function (req, res, next) {
    const id = req.params.id;
    progressModel
      .remove(+id) // Convert the ID to a number
      .then((progress) => res.send(progress))
      .catch(next);
  });

module.exports = app; // Export the router
