const db = require("../connection");
const { promisify } = require('util');

// Promisify the db.query method to use async/await
const query = promisify(db.query).bind(db);

const seed = async () => {
  try {
    // Drop existing tables in order
    await query(`DROP TABLE IF EXISTS event_participants;`);
    await query(`DROP TABLE IF EXISTS participants;`);
    await query(`DROP TABLE IF EXISTS events;`);
    await query(`DROP TABLE IF EXISTS locations;`);

    // Create new tables
    await query(`
      CREATE TABLE locations (
        location_id INT PRIMARY KEY,
        location_name VARCHAR(255) NOT NULL,
        capacity INT NOT NULL
      );
    `);
    await query(`CREATE TABLE events (
        event_id INT PRIMARY KEY,
        event_name VARCHAR(255) NOT NULL,
        event_date DATE NOT NULL,
        location_id INT,
        FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
      );
      `)
    await query(`
      CREATE TABLE participants (
        participant_id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE
      );
      `)
      await query(`
      CREATE TABLE event_participants (
        event_id INT,
        participant_id INT,
        PRIMARY KEY (event_id, participant_id),
        FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
        FOREIGN KEY (participant_id) REFERENCES participants(participant_id) ON DELETE CASCADE
      );`)

    // Insert seed data
    await query(`
      INSERT INTO locations (location_id, location_name, capacity) VALUES
      (1, 'Meeting Room 1', 15),
      (2, 'Meeting Room 2', 20);
    `);
    await query(`INSERT INTO events (event_id, event_name, event_date, location_id) VALUES
      (1, 'Tech meeting', '2024-10-20', 1),
      (2, 'Music festival', '2024-11-15', 1),
      (3, 'Art Sales', '2024-12-01', 2);
     `)
     await query(` INSERT INTO participants (participant_id, name, email) VALUES
      (1, 'John Doe', 'john@example.com'),
      (2, 'Jane Smith', 'jane@example.com'),
      (3, 'Alice Johnson', 'alice@example.com'),
      (4, 'Bob Brown', 'bob@example.com');
      `)
      await query(`INSERT INTO event_participants (event_id, participant_id) VALUES
      (1, 1),
      (1, 2),
      (2, 3),
      (3, 4);`)

    console.log("Database seeding completed successfully!");
  } catch (err) {
    console.error(err, "<<--seeding error");
  }
};

module.exports = seed;
