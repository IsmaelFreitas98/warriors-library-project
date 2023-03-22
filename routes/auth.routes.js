const express = require('express');
const router = express.Router();

const User = require("../models/User.model");

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

//GET
router.get("/signup", (req, res, next) => {
    res.render("auth/register");
});

router.get("/user-profile", (req, res, next) => {
    res.render("auth/user-profile");
});



//POST
router.post("/signup", (req, res, next) => {

    const {email, password} = req.body;

    bcryptjs.genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hash => {
        console.log(`Password hash: ${hash}`);

        return User.create({ email, passwordHash: hash});

        })
        .then( userFromDb => res.redirect("/user-profile"))
        .catch(error => next(error));
});



module.exports = router;