const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

//Defined paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const port = process.env.PORT || 3000;

//Initiates hbs and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Set up Static directory and Provides access to directories
app.use(express.static(publicDirectoryPath));

//Set up routings at specific URLs
app.get("/", function(req, res) {
  res.render("index", {
    title: "Weather",
    name: "Bryant"
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    title: "About Me",
    name: "Bryant"
  });
});

app.get("/help", function(req, res) {
  res.render("help", {
    helpText: "Help Information here...",
    title: "Help",
    name: "Bryant"
  });
});

app.get("/header", function(req, res) {
  res.render("header", {});
});

//Weather endpoint created
app.get("/weather", function(req, res) {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});
//Common Express pattern requiring search term entered by user
app.get("/products", function(req, res) {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/products", function(req, res) {
  res.send({
    products: []
  });
});

app.get("/help/*", function(req, res) {
  res.render("fourofour", {
    errorType: "404",
    errorMessage: "Help article not found."
  });
});

app.get("/help/*", function(req, res) {
  res.send("Help article not found");
});

app.get("*", function(req, res) {
  res.render("fourofour", {
    errorType: "404",
    name: "Bryant Crowe",
    errorMessage: "Page not found."
  });
});

//Start up server
app.listen(port, function() {
  console.log("Server is up on port " + port);
});
