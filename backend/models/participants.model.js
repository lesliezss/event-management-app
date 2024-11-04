const db = require("../db/connection");

function selectAllParticipants() {
  return db
    .query(
      `
        SELECT participants.participant_id, participants.name, participants.email, events.event_name
        FROM participants
        LEFT JOIN event_participants ON participants.participant_id = event_participants.participant_id
        LEFT JOIN events ON event_participants.event_id = events.event_id
        `
    )
    .then(([result]) => {
      return result;
    });
}

async function postNewParticipantModel(name, email, event_id) {
  let participantId;

  try {
    // Insert participant into `participants` table
    const [participantResult] = await db.query(
      `INSERT INTO participants (name, email) VALUES (?, ?)`,
      [name, email]
    );

    // Check for successful insertion
    if (!participantResult.insertId) {
      throw new Error("Failed to insert participant");
    }

    // Get the insert ID for the new participant
    participantId = participantResult.insertId;

    // Insert into `event_participants` with the new participant ID
    const [eventParticipantResult] = await db.query(
      `INSERT INTO event_participants (participant_id, event_id) VALUES (?, ?)`,
      [participantId, event_id]
    );

    // Return the new participant object if all inserts succeeded
    return {
      participant_id: participantId,
      name,
      email,
    };
  } catch (error) {
    console.error("Error in postNewParticipantModel:", error);
    throw error; // Re-throw error for controller to handle
  }
}

function updateParticipant(name, email, event_id, participant_id) {
  return db
    .query(
      `UPDATE participants 
       SET name = ?, email = ? 
       WHERE participant_id = ?`,
      [name, email, participant_id]
    )
    .then(([result]) => {

      if (result.affectedRows === 0) {
        throw {
          status: 404,
          msg: `No participant found with id: ${participant_id}`,
        };
      }

      return db.query(
        `UPDATE event_participants 
         SET event_id = ? 
         WHERE participant_id = ?`,
        [event_id, participant_id]
      );
    })
    .then(([result]) => {
      if (result.affectedRows === 0) {
        throw { status: 404, msg: "Participant-event association not found" };
      }
     
      return {
        participant_id: participant_id,
        name,
        email,
      };
    })}


function selectParticipantsByEvent (event_id){
return db.query(`
  SELECT events.event_name, participants.participant_id, participants.name, participants.email, event_participants.event_id
  FROM participants
  INNER JOIN event_participants
  ON participants.participant_id = event_participants.participant_id
  LEFT JOIN events
  ON events.event_id = event_participants.event_id
  WHERE event_participants.event_id = ?`, [event_id])
  .then(([result])=>{
    return result
  })
}


module.exports = {
  selectAllParticipants,
  postNewParticipantModel,
  updateParticipant,
  selectParticipantsByEvent
};
