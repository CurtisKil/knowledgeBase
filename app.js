const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// Connect Mongoose Database
mongoose.connect("mongodb://localhost/nodekb");
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

// FIGURE OUT WHY ARTICLE 3 IS NOT SHOWING UP IN

app.get("/articles/add", function (req, res) {
  res.render("add_article", {
    title: "Add Article",
  });
});

// Start Server
app.listen(3000, function () {
  console.log("Server started on port 3000...");
});
