const db = require("../connection");

const seed = () => {
    return (
      db
        .query(`DROP TABLE IF EXISTS event_participants;`)
        .then(() => {
          return db.query(`DROP TABLE IF EXISTS participants;`);
        })
        .then(() => {
          return db.query(`DROP TABLE IF EXISTS events;`);
        })
        .then(() => {
          return db.query(`DROP TABLE IF EXISTS locations;`);
        })
        .then(() => {
          return db.query(
            `CREATE TABLE locations (
                location_id INT PRIMARY KEY,
                location_name VARCHAR(255) NOT NULL,
                capacity INT NOT NULL
            );`
          );
        })
        .then(() => {
          return db.query(
            `CREATE TABLE events (
                event_id INT PRIMARY KEY AUTO_INCREMENT,
                event_name VARCHAR(255) NOT NULL,
                event_date DATE NOT NULL,
                location_id INT,
                FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
            );`
          );
        })
        .then(() => {
          return db.query(
            `CREATE TABLE participants (
                participant_id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL
            );`
          );
        })
        .then(() => {
          return db.query(
            `CREATE TABLE event_participants (
                event_id INT,
                participant_id INT,
                PRIMARY KEY (event_id, participant_id),
                FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
                FOREIGN KEY (participant_id) REFERENCES participants(participant_id) ON DELETE CASCADE
            );`
          );
        })
        // seeding data
        .then(() => {
          return db.query(
            `INSERT INTO locations (location_id, location_name, capacity) VALUES
                (1, 'Meeting Room 1', 8),
                (2, 'Meeting Room 2', 15),
                (3, 'Activity Centre', 20);`
          );
        })
        .then(() => {
          return db.query(
            `INSERT INTO events (event_name, event_date, location_id) VALUES
                ('Tech meeting', '2024-12-20', 1),
                ('Music festival', '2025-01-15', 3),
                ('Art Sales', '2024-12-01', 2);`
          );
        })
        .then(() => {
          return db.query(
            `INSERT INTO participants (name, email) VALUES
                ('John Doe', 'john@example.com'),
                ('Jane Smith', 'jane@example.com'),
                ('Alice Johnson', 'alice@example.com'),
                ('Bob Brown', 'bob@example.com'),
                ('Leslie Zhan', 'lesliezhan@example.com'),
                ('abc def', 'abcdef@example.com');`
          );
        })
        .then(() => {
          return db.query(
            `INSERT INTO event_participants (event_id, participant_id) VALUES
                (1, 1),
                (1, 2),
                (2, 3),
                (3, 4),
                (1, 5),
                (1, 6),
                (1, 3);`
          );
        })
        .catch((err) => {
          console.error(err, "<<--seeding error");
        })
    );
  };


module.exports = seed;
