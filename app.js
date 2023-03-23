// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

require('./config/session.config')(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "library-project";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;


const checkLoggin = (req, res, next) => {
    res.locals.currentUser = req.session.currentUser;
    next()
};

//
// ROUTES
//

app.use("/", checkLoggin, require("./routes/index.routes"));
app.use("/", checkLoggin, require("./routes/auth.routes"));
app.use("/", checkLoggin, require("./routes/book.routes"));
app.use("/", checkLoggin, require("./routes/author.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
