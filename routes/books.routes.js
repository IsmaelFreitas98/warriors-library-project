const express = require('express');
const Book = require('../models/Book.model');
const router = express.Router();

/* GET home page */
router.get("/books", (req, res, next) => {
  const minRating = req.query.minRating;
  let filter;

  if(minRating){
    filter = {rating: {$gte: minRating}};
  } else {
    filter = {rating: {$gte: 1}};
  }
  
  Book.find(filter)
    .then((booksArr) => {

      res.render("books/books-list", {booksArr})
    })
    .catch(error => {
      console.log(error);
      next(error)
    });
});


router.get("/books/create", (req, res, next) => {
  res.render("books/book-create")
});

router.post("/books", (req, res) => {
  const bookDetails = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating
  }

  Book.create(bookDetails)
    .then(createdBook => res.redirect("/books"))
    .catch(error => {
      console.log(error);
      next(error)
    });

});

router.get("/books/:bookId", (req, res, next) => {
  const {bookId} = req.params;

  Book.findById(bookId)
    .then((book) => {
      res.render("books/book-details", book);
    })
    .catch(error => {
      console.log(error);
      next(error)
    });
});


module.exports = router;
