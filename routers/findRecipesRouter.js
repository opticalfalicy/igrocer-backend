const express = require("express");

const Recipe = require("../Schemas/recipeSchema");

const router = express.Router();

router.route("/").get((req, res) => {
  // const item = req.body;
  // console.log('')
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

// app.get("/api/recipes", function(req, res) {
//   console.log("fetching recipes");

//   // use mongoose to get all recipes in the database
//   Recipe.find(function(err, recipes) {
//     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//     if (err) res.send(err);

//     res.json(recipes); // return all recipes in JSON format
//   });
// });

module.exports = router;
