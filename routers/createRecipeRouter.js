const express = require("express");

const Recipe = require("../Schemas/recipeSchema");

const router = express.Router();

router.post("/", (req, res) => {
  const item = req.body;
  console.log("REQ.BODY", req.body);
  console.log(item);
  Recipe.create(item)
    .then(item => res.status(201).json("Saved New Recipe"))
    .catch(error => res.status(500).json("Error from server: $(error)"));
});

module.exports = router;
