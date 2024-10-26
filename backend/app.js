const express = require("express");

const {
  getAllEvents,
  getEventsByName,
  postNewEventController,
} = require("./controllers/events.controller");

const app = express();

app.use(express.json());

// events endpoints

app.get("/api/events", getAllEvents);
app.get("/api/events/search", getEventsByName);
app.post("/api/events", postNewEventController);

//psql errors
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});
//custom errors
app.use((err, req, res, next) => {
  if (err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

module.exports = app;
