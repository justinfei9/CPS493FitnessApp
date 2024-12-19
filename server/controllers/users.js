const model = require("../model/users");
const express = require("express");
const router = express.Router();

router
  .get("/", function (req, res, next) {
    model
      .getAll()
      .then((x) => res.send(x))
      .catch(next);
  })
  .get("/search", function (req, res, next) {
    const query = req.query.q;
    model
      .search(query)
      .then((x) => res.send(x))
      .catch(next);
  })
  .get("/:id", function (req, res, next) {
    const id = req.params.id;
    model
      .get(+id)
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/", function (req, res, next) {
    model
      .add(req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .patch("/:id", function (req, res, next) {
    const id = req.params.id;
    model
      .update(+id, req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .delete("/:id", function (req, res, next) {
    const id = req.params.id;
    model
      .remove(+id)
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/seed", (req, res, next) => {
    model
      .seed()
      .then((x) => res.send(x))
      .catch(next);
  });

module.exports = router;
