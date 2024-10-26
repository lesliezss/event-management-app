const {
  selectAllEvents,
  searchEventsByName,
  postNewEvent,
} = require("../models/events.model");
const dayjs = require("dayjs");
const db = require("../db/connection");

exports.getAllEvents = (req, res, next) => {
  selectAllEvents()
    .then((events) => {
      if (events.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No events found`,
        });
      }
      res.status(200).send({ events });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getEventsByName = (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).send({
      msg: "Please provide an event name to search.",
    });
  }
  return searchEventsByName(name, next)
    .then((events) => {
      if (events.length === 0) {
        return res.status(404).send({ msg: "No events found" });
      }
      res.status(200).send({ events });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewEventController = (req, res, next) => {
  const { event_name, event_date, location_id } = req.body;
  //check all inputs are completed
  if (!event_name || !event_date || !location_id) {
    return res.status(400).send({ msg: "All fields are required" });
  }
  //check valid date

  if (
    !dayjs(event_date, "YYYY-MM-DD", true).isValid() ||
    event_date.length !== 10
  ) {
    return res.status(400).json({ msg: "Invalid date format" });
  } else if (dayjs(event_date).isBefore(dayjs())) {
    // Check if the date is in the past
    return res.status(400).json({ msg: "Event date cannot be in the past" });
  }

  db.query(`SELECT * FROM locations WHERE location_id = ?`, [location_id])
    .then((locationCheck) => {
      //location check
      if (locationCheck[0].length === 0) {
        return res.status(404).json({ msg: "Location not found" });
      }

      return postNewEvent(event_name, event_date, location_id);
    })
    .then((newEvent) => {
      if (newEvent) {
        res.status(201).send({ newEvent });
      }
    })
    .catch((err) => {
      next(err);
    });
};
