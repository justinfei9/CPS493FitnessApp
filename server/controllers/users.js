const model = require("../model/users");
const express = require("express");
const app = express.Router();

app
  .get("/", function (req, res, next) {
    res.send(model.getAll());
  })
  .get("/:id", function (req, res, next) {
    const id = req.params.id;
    const user = model.get(+id);
    res.send(user);
  })
  .post("/", function (req, res, next) {
    const user = model.add(req.body);
    res.send(user);
  })
  .patch("/:id", function (req, res, next) {
    const id = req.params.id;
    const user = model.update(+id, req.body);
    res.send(user);
  })
  .delete("/:id", function (req, res, next) {
    const id = req.params.id;
    const ret = model.remove(+id);
    res.send(ret);
  });

module.exports = app; // Export the router
