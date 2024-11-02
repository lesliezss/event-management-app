const express = require("express");
const cors = require("cors");

const {
  getAllEvents,
  getEventsByName,
  postNewEventController,
  deleteEventByIdController,
} = require("./controllers/events.controller");
const { getAllLocations } = require("./controllers/location.controller");
const {
  getAllParticipants,
  postNewParticipantController,
  patchParticipant,
} = require("./controllers/participants.controller");

const app = express();

app.use(express.json());
app.use(cors()); // Allow all origins by default (for development)

// events endpoints

app.get("/api/events", getAllEvents);
app.get("/api/events/search", getEventsByName);
app.post("/api/events", postNewEventController);
app.delete("/api/events/:event_id", deleteEventByIdController);

// locations endpoints

app.get("/api/locations", getAllLocations);

// participants endpoints

app.get("/api/participants", getAllParticipants);
app.post("/api/participants", postNewParticipantController);
app.patch("/api/participants/:participant_id", patchParticipant);

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
