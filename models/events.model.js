const db = require("../db/connection");

function selectAllEvents() {
  return db
    .query(
      `
        SELECT
          event_name,
          event_date,
          locations.location_name,
          COUNT(event_participants.participant_id) AS guest_number
        FROM events
        LEFT JOIN locations
        ON events.location_id = locations.location_id
        LEFT JOIN event_participants ON events.event_id = event_participants.event_id
        GROUP BY events.event_id, events.event_name, events.event_date, locations.location_name
       `
    )
    .then(([results]) => {
      return results;
    });
}

function searchEventsByName(name) {
  return db
    .query(
      `
        SELECT
            event_name,
            event_date,
            locations.location_name,
            COUNT(event_participants.participant_id) AS guest_number
        FROM events
        LEFT JOIN locations ON events.location_id = locations.location_id
        LEFT JOIN event_participants ON events.event_id = event_participants.event_id
        WHERE event_name LIKE ?
        GROUP BY events.event_id, events.event_name, events.event_date, locations.location_name
    `,
      [`%${name}%`]
    ) // Use wildcards to allow for partial matching
    .then(([result]) => {
      return result;
    });
}

function postNewEvent(event_name, event_date, location_id) {
  return db
    .query(
      `INSERT INTO events (event_name, event_date, location_id)
       VALUES (?, ?, ?)
       RETURNING *`,
      [event_name, event_date, location_id]
    )
    .then(([result]) => {
      return result[0];
    })
}



module.exports = { selectAllEvents, searchEventsByName, postNewEvent };
