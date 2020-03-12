const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

let currentReservations = [];
let waitList = [];

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/reserve", function(req, res) {
  res.sendFile(__dirname + "/public/reserve.html");
});

app.get("/tables", function(req, res) {
  res.sendFile(__dirname + "/public/tables.html");
});

app.post("/api/tables", function(req, res) {
  const newReservation = req.body;
  console.log(newReservation);

  if (currentReservations.length < 5) {
    currentReservations.push(newReservation);
    res.send(true);
  } else {
    waitList.push(newReservation);
    res.send(false);
  }
});

app.get("/api/tables", function(req, res) {
  res.json(currentReservations);
});

app.get("/api/waitlist", function(req, res) {
  res.json(waitList);
});

app.post("/api/clear", function(req, res) {
  currentReservations = [];
  waitList = [];

  res.end();
});

app.listen(PORT, function() {
  console.log("App listening to port 3000");
});
