const {
  selectAllParticipants,
  postNewParticipantModel,
} = require("../models/participants.model");
const db = require("../db/connection");

exports.getAllParticipants = (req, res, next) => {
  selectAllParticipants()
    .then((participants) => {
      if (participants.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No events found`,
        });
      }

      res.status(200).send({ participants });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewParticipantController = (req, res, next) => {
  const { name, email, event_id } = req.body;
  if (!name || !email || !event_id) {
    return res.status(400).send({ msg: "All fields are required" });
  }
  // console.log("Checking event with ID:", event_id); // Log event_id being checked

  db.query(`SELECT * FROM events WHERE event_id = ?`, [event_id])
    .then((eventCheck) => {
      //event check
      if (!eventCheck[0] || eventCheck[0].length === 0) {
        return res.status(404).json({ msg: "Event not found" });
      }
      return postNewParticipantModel(name, email, event_id);
    })
    .then((newParticipant) => {
      if (newParticipant) {
        res.status(201).send({ newParticipant });
      }
    })
    .catch((err) => {
      next(err);
    });
};
