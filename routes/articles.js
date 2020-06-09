const express = require("express");
const router = express.Router();

// Bring in Article Model
let Article = require("../models/article");

// Add an Article
router.get("/add", function (req, res) {
  res.render("add_article", {
    title: "Add Article",
  });
});

// Add Submit POST Route
// This route and the above route can have the same url as long as they are different types of requests(post/get)
router.post("/add", function (req, res) {
  // Set Some Rules
  req.checkBody("title", "Title is required").notEmpty();
  req.checkBody("author", "Author is required").notEmpty();
  req.checkBody("body", "Body is required").notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    res.render("add_article", {
      title: "Add Article",
      errors: errors,
    });
  } else {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.user._id;
    article.body = req.body.body;

    article.save(function (err) {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash("success", "Article Added");
        res.redirect("/");
      }
    });
  }
});

// Load Edit Form
router.get("/edit/:id", function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    res.render("edit_article", {
      article: article,
    });
  });
});

// Update route is very similar to add route
// Update Submit Post Route
router.post("/edit/:id", function (req, res) {
  // Get the posts and submit them to the database
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = { _id: req.params.id };

  Article.update(query, article, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash("success", "Article Updated");
      // Redirect post to homepage
      res.redirect("/");
    }
  });
});

// Delete Route
router.delete("/:id", function (req, res) {
  let query = { _id: req.params.id };

  Article.remove(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.send("Success");
  });
});

// Get Single Article
router.get("/:id", function (req, res) {
  // To get the id that's in the url use req.params
  Article.findById(req.params.id, function (err, article) {
    res.render("article", {
      article: article,
    });
  });
});

// Access Router From Outside
module.exports = router;
