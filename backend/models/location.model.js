const db = require("../db/connection");


function selectAllLocations() {
    return db
      .query(
        `SELECT 
      l.location_name,
      l.capacity,
      COUNT(ep.participant_id) AS total_guests,
      ROUND((COUNT(ep.participant_id) / l.capacity) * 100, 2) AS occupancy_rate,
      CONCAT(COUNT(ep.participant_id), '/', l.capacity) AS guest_to_capacity
  FROM 
      locations AS l
  LEFT JOIN 
      events AS e ON l.location_id = e.location_id
  LEFT JOIN 
      event_participants AS ep ON e.event_id = ep.event_id
  GROUP BY 
      l.location_id;`
      )
      .then(([result]) => {
        return result;
      });
  }

  module.exports = {selectAllLocations}