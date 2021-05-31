const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Mohamed Mohiey" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "help message",
    name: "Mohamed Mohiey",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Mohamed Mohiey" });
});

app.get("/weather", (req, res) => {
  if (req.query.address) {
    geocode(req.query.address, (err, data) => {
      if (err) return res.send({ error: err });
      forecast(data.longitude, data.latitude, (err, forecastData) => {
        if (err) return res.send({ error: err });
        return res.send({
          forecast: forecastData,
          location: data.location,
          address: req.query.address,
        });
      });
    });
  } else return res.send({ error: "Please, provide an address" });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Not Found",
    error: "Help article not found",
    name: "Mohamed Mohiey",
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: "Not Found",
    error: "Page not found",
    name: "Mohamed Mohiey",
  });
});
const port = process.env.PORT || 1998;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
