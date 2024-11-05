# event-management-app

This is an Event Management application that allows users to manage events, participants, locations, and blacklists. It includes features for adding, viewing, and removing events, managing participants, checking occupancy rates, and maintaining a blacklist for IP addresses.

## Technologies Used

- Node.js
- Express.js
- MySQL
- HTML/CSS/JavaScript

## Connecting to database

The project connects to the provided database using the provided credentials. The credentials are stored in .env file, which is added to the .gitignore file.

## Database seeding

The database is seeded using a samll set of data. To simplify the development process, this set of data is used as both the test data and the development data. As the project grows, it would be better to create a test data set and seprate the data into seprate data files rather than in seed.js.

## API information doc

API information is stored in API_DOCS.md, where you can view the API route, description, requirements and example return.

## Start the backend application

```bash
npm start
```

## API base URL

The API base URL is determined dynamically based on the environment. Here’s how it works:

const API_BASE_URL =
window.location.hostname === "localhost" ||
window.location.hostname === "127.0.0.1"
? "http://localhost:3000/api" // Local development
: "http://0c9c87af8dddecca.assessment.munnich.it/api"; // Production link
