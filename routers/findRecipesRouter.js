const express = require("express");

const Recipe = require("../Schemas/recipeSchema");

const router = express.Router();

router.route("/").get((req, res) => {
  Recipe.find({})
    .populate("recipes")
    .then(recipes => {
      if (recipes.length === 0) {
        res.status(404).jsson({ error: "no recipes found" });
      } else {
        res.status(200).json(recipes);
      }
    })
    .catch(error => res.status(500).json(`Error from server: $(error)`));
});

module.exports = router;
