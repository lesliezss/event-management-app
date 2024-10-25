const db = require("../db/connection");

function selectAllEvents() {
    return db
      .query(`
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
      .then(([rows ]) => {
        if (rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: `No events found`,
          });
        } else {
          return rows;
        }
      })
  }

  module.exports = {selectAllEvents}