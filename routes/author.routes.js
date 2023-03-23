const express = require('express');
const Author = require('../models/Author.model');
const router = express.Router();
const isUserLoggedIn = require("../middleware/isLoggedIn");



router.get("/authors", isUserLoggedIn, (req, res, next) => {
    Author.find()
        .then((result) => {
            res.render("authors/author-list", {authors: result});
        }).catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;