const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String
  },
  instructions: [
    {
      text: {
        type: String
      }
    }
  ],
  ingredients: [
    {
      id: { type: Number },
      item: { type: String },
      price: { type: Number }
    }
  ]
});

module.exports = mongoose.model("Recipe", recipeSchema, "recipes");
