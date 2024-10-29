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


module.exports = { selectAllParticipants, postNewParticipantModel };
