const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const mongo = require("mongodb");

// Connect Mongoose Database
mongoose.connect("mongodb://localhost/nodekb");
// MongoClient.connect(url, { useNewUrlParser: true });
let db = mongoose.connection;

// Check Connection
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Check for DB errors
db.on("error", function (err) {
  console.log(err);
});

//  Init App
const app = express();

// Bring in Models
let Article = require("./models/article");

// Load View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", function (req, res) {
  // Grabbing all the articles from the db
  Article.find({}, function (err, articles) {
    if (err) {
      console.log(err);
    } else {
      // Render Template
      res.render("index", {
        title: "Articles",
        articles: articles,
      });
    }
  });
});

// Get Single Article
app.get("/article/:id", function (req, res) {
  // To get the id that's in the url use req.params
  Article.findById(req.params.id, function (err, article) {
    res.render("article", {
      article: article,
    });
  });
});

app.get("/articles/add", function (req, res) {
  res.render("add_article", {
    title: "Add Article",
  });
});

// Add Submit POST Route
// This route and the above route can have the same url as long as they are different types of requests(post/get)
app.post("/articles/add", function (req, res) {
  // Get the posts and submit them to the database
  console.log(req.body);
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      // Redirect post to homepage
      res.redirect("/");
    }
  });
});

// Start Server
app.listen(3000, function () {
  console.log("Server started on port 3000...");
});
