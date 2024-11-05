const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api" // Local development
    : "http://0c9c87af8dddecca.assessment.munnich.it/api"; // Production link

export async function fetchLocations() {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.locations;
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
}
