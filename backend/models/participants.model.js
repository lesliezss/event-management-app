const db = require("../db/connection");

function selectAllParticipants() {
  return db
    .query(
      `
        SELECT participants.name, participants.email, events.event_name
        FROM participants
        LEFT JOIN event_participants ON participants.participant_id = event_participants.participant_id
        LEFT JOIN events ON event_participants.event_id = events.event_id
        `
    )
    .then(([result]) => {
      return result;
    });
}

function postNewParticipantModel(name, email, event_id) {
  console.log("model");
  let participantId;
  return db
    .query(
      `INSERT INTO participants (name, email)
         VALUES (?, ?)`,
      [name, email]
    )
    .then((result) => {
      participantId = result[0].insertId;
      return db.query(
        `INSERT INTO event_participants (participant_id, event_id) VALUES (?, ?)`,
        [participantId, event_id]
      );
    })
    .then(() => {
      // Return the new participant object
      return {
        participant_id: participantId,
        name,
        email,
      };
    });
}

module.exports = { selectAllParticipants, postNewParticipantModel };
