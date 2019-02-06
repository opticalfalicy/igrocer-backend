// Set up
var express = require("express");
var app = express(); // create our app w/ express
var mongoose = require("mongoose"); // mongoose for mongodb
var morgan = require("morgan"); // log requests to the console (express4)
var bodyParser = require("body-parser"); // pull information from HTML POST (express4)
var methodOverride = require("method-override"); // simulate DELETE and PUT (express4)
var cors = require("cors");
const Recipe = require("./Schemas/recipeSchema");
// Configuration

const port = process.env.PORT || 27017;

mongoose.connect("mongodb://localhost:27017/recipes", {
  useNewUrlParser: true
});

app.use(morgan("dev")); // log every request to the console
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

var router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes

const createRecipeRouter = require("./routers/createRecipeRouter");
const findRecipeRouter = require("./routers/findRecipesRouter");

app.get("/", function(req, res) {
  res.send({ api: "up and at em" });
});

// Get recipes
app.use("/api/", findRecipeRouter);

// create recipe and send back all recipes after creation
app.use("/api/cr", createRecipeRouter);

// delete a recipe
app.delete("/api/recipes/:recipe_id", function(req, res) {
  Recipe.remove(
    {
      _id: req.params.recipe_id
    },
    function(err, recipe) {}
  );
});

// listen (start app with node server.js) ======================================
app.listen(port, () => console.log(`API on port ${port}`));
