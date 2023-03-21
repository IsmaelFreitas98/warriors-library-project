const express = require('express');
const Book = require('../models/Book.model');
const Author = require('../models/Author.model');
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
    .populate("author")
    .then((booksArr) => {

      res.render("books/books-list", {booksArr})
    })
    .catch(error => {
      console.log(error);
      next(error)
    });
});


router.get("/books/create", (req, res, next) => {

  Author.find()
    .then(authorsArr => {
      res.render("books/book-create", {authors: authorsArr});
    })
    .catch();

});

//POST
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

router.get("/books/:bookId/edit", (req, res, next) => {
  
  let bookDetails;
  
  Book.findById(req.params.bookId)
    .then(bookToEdit => {
      bookDetails = bookToEdit;

      return Author.find();
    })
    .then(authorsArr => {
      res.render("books/book-edit", {book: bookDetails, authors: authorsArr});
    })
    .catch(error => next(error)); 
      
})


//POST for edit
router.post("/books/:bookId/edit", (req, res, next) => {
  const {bookId} = req.params;
  const {title, description, author, rating} = req.body;
  const updatedBookInfo = {
    title,
    description,
    author,
    rating
  }

  Book.findByIdAndUpdate(bookId, updatedBookInfo, {new: true})
    .then(updatedBook => {
      res.redirect(`/books/${updatedBook.id}`);
    })
    .catch(error => next(error));
});

router.post("/books/:bookId/delete", (req, res, next) => {
  const {bookId} = req.params;

  Book.findByIdAndDelete(bookId)
    .then(() => {
      res.redirect("/books");
    })
    .catch(error => next(error));
});

router.get("/books/:bookId", (req, res, next) => {
  const {bookId} = req.params;

  Book.findById(bookId)
    .populate("author")
    .then((book) => {
      res.render("books/book-details", book);
    })
    .catch(error => {
      console.log(error);
      next(error)
    });
});


module.exports = router;
