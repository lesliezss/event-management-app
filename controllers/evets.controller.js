const { selectAllEvents } = require("../models/events.model");

exports.getAllEvents = (req, res, next) => {
  selectAllEvents()
    .then((events) => {
      res.status(200).send({ events });
    })
    .catch((err) => {
      next(err);
    });
};
