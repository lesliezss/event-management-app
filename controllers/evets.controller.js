const {
  selectAllEvents,
  searchEventsByName,
} = require("../models/events.model");

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
