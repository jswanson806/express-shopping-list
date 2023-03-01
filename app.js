const express = require("express");
const shoppingList = require("./fakeDb");
const shoppingRoutes = require("./shopping-routes");
const morgan = require("morgan");
const ExpressError = require("./expressError");

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use('/items', shoppingRoutes)

module.exports = app;