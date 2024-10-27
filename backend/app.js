const express = require("express");

const {
  getAllEvents,
  getEventsByName,
  postNewEventController,
  deleteEventByIdController,
} = require("./controllers/events.controller");

const app = express();

app.use(express.json());

// events endpoints

app.get("/api/events", getAllEvents);
app.get("/api/events/search", getEventsByName);
app.post("/api/events", postNewEventController);
app.delete("/api/events/:event_id", deleteEventByIdController);

//mysql errors
app.use((err, req, res, next) => {
  if (err.code === "ER_BAD_FIELD_ERROR") {
    return res.status(400).send({ msg: "Invalid field in request" });
  }

  // Foreign key constraint failure
  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(400).send({ msg: "Foreign key constraint failed" });
  }

  // Syntax error in SQL query
  if (err.code === "ER_PARSE_ERROR") {
    return res.status(400).send({ msg: "SQL syntax error" });
  }

  // Default to passing error to next handler if no match
  next(err);
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
