const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api" // Local development
    : "http://0c9c87af8dddecca.assessment.munnich.it/api"; // Production link

export function fetchEvents() {
  return fetch(`${API_BASE_URL}/events`)
    .then((response) => {
      if (!response.ok) {
        console.log("api ok");
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => data.events) // Return the events array
    .catch((error) => console.error("Error fetching events:", error));
}

// Search events
export async function searchEvents(query) {
  const response = await fetch(
    `${API_BASE_URL}/events/search?name=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.events;
}

// Create a new event
export async function createEvent(newEvent) {
  await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEvent),
  });
}

// get locations
export async function fetchLocations() {
    const response = await fetch(`${API_BASE_URL}/locations`);
    if (!response.ok) {
        throw new Error('Failed to fetch locations');
    }
    const data = await response.json();
    return data.locations; // Assuming your API returns an object with a 'locations' key
}


// Delete an event
export async function deleteEvent(eventId) {
  try {
    // console.log(`Deleting event with ID: ${eventId}`); // Debugging line

    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: "DELETE",
    });

    // If the response status indicates success but has no content
    if (response.status === 204) {
      // No content returned on successful deletion
      return; // Just return without parsing
    }

    // If the response is not OK, attempt to parse it for error messages
    if (!response.ok) {
      const errorData = await response.json(); // Attempt to parse error response
      throw new Error(errorData.message || "Failed to delete the event");
    }

    // Optionally return the parsed response if needed
    return response.json();
  } catch (error) {
    console.error("Error in deleteEvent function:", error);
    throw error; // Re-throw the error to propagate up
  }
}
