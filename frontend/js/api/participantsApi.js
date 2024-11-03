const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api" // Local development
    : "http://0c9c87af8dddecca.assessment.munnich.it/api"; // Production link