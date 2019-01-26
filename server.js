// Set up
var express = require("express");
var app = express(); // create our app w/ express
var mongoose = require("mongoose"); // mongoose for mongodb
// var MongoClient = require("mongodb").MongoClient;
var morgan = require("morgan"); // log requests to the console (express4)
var bodyParser = require("body-parser"); // pull information from HTML POST (express4)
var methodOverride = require("method-override"); // simulate DELETE and PUT (express4)
var cors = require("cors");

// Configuration
// mongoose.connect(
//   "mongodb://admin:password123@ds031193.mlab.com:31193/igrocer-backend",
//   { useNewUrlParser: true }
// );
const port = process.env.PORT || 27017;

mongoose.connect(
  "mongodb://admin:password123@ds031193.mlab.com:31193/igrocer-backend",
  { useNewUrlParser: true }
);
// mongoose.connect(
//   "mongodb://localhost:27017",
//   { useNewUrlParser: true }
// );

// mongoose.connect("mongodb://localhost/5000");

// mongoose.Promise = require("bluebird");

// MongoClient.connect(
//   "mongodb://localhost:5000"
//   // "mongodb://admin:password123@ds031193.mlab.com:31193/igrocer-backend"
//   {
//     useMongoClient: true
//     /* other options */
//   }
// );

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

// Models
// let Recipe = mongoose.model("Recipe", {
//   title: String,
//   instructions: [
//     {
//       text: String
//     }
//   ],

//   ingredients: [
//     {
//       id: Number,
//       item: String,
//       price: Number
//     }
//   ]
// });

// Routes

const createRecipeRouter = require("./routers/createRecipeRouter");
const findRecipeRouter = require("./routers/findRecipesRouter");

app.get("/", function(req, res) {
  res.send({ api: "up and at em" });
});

// Get recipes

app.use("/api/", findRecipeRouter);

// app.get("/api/recipes", function(req, res) {
//   console.log("fetching recipes");

//   // use mongoose to get all recipes in the database
//   Recipe.find(function(err, recipes) {
//     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//     if (err) res.send(err);

//     res.json(recipes); // return all recipes in JSON format
//   });
// });

// create recipe and send back all recipes after creation

app.use("/api/cr", createRecipeRouter);

// app.post("/api/recipes", function(req, res) {
//   console.log("creating recipe");

//   // create a recipe, information comes from request from Ionic
//   Recipe.create(
//     {
//       title: req.body.title,
//       instructions: req.body.description,
//       ingredients: req.body.ingredients,
//       done: false
//     },
//     function(err, recipe) {
//       if (err) res.send(err);

//       // get and return all the recipes after you create another
//       Recipe.find(function(err, recipes) {
//         if (err) res.send(err);
//         res.json(recipes);
//       });
//     }
//   );
// });

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
app.listen(port, () => console.log("API on port 5000"));
// console.log("App listening on port 8080");
