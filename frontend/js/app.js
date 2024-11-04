import {
  fetchEvents,
  searchEvents,
  createEvent,
  deleteEvent,
  fetchLocations,
} from "./api/eventsApi.js";
import { renderEvents } from "./components/events.js";

import { fetchParticipants, addParticipant } from "./api/participantsApi.js";
import {
  renderParticipants,
  populateEventDropdowns,
  initializeFiltering,
} from "./components/participants.js";

// EVENTS

document.addEventListener("DOMContentLoaded", async () => {
  const eventsTableBody = document.getElementById("eventsTableBody");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const newEventForm = document.getElementById("newEventForm");

  // Load initial events when the page is loaded
  await loadEvents();

  // Event listener for search functionality
  searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query) {
      const events = await searchEvents(query);
      renderEvents(events, eventsTableBody);
    } else {
      await loadEvents(); // Reload all events if search input is empty
    }
  });

  // populates the dropdown
  async function populateLocationDropdown() {
    const locations = await fetchLocations(); // Fetch locations
    const locationSelect = document.getElementById("locationSelect"); // Reference to your select element

    // Clear existing options (if any)
    locationSelect.innerHTML = "";

    // Create an option for each location
    locations.forEach((location) => {
      const option = document.createElement("option");
      option.value = location.location_id; // Set the value to location_id
      option.textContent = location.location_name; // Display location_name
      locationSelect.appendChild(option);
    });
  }

  // Call this function to populate the dropdown
  populateLocationDropdown();

  // Event listener for adding a new event
  newEventForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const locationSelect = document.getElementById("locationSelect");
    const locationId = locationSelect.value; // Get selected location_id
    const newEvent = {
      event_name: document.getElementById("eventName").value,
      event_date: document.getElementById("eventDate").value,
      location_id: locationId,
    };
    await createEvent(newEvent);
    newEventForm.reset();
    await loadEvents(); // Reload events to show the newly added event
  });

  // Function to load and render events
  async function loadEvents() {
    const events = await fetchEvents(); // Fetch the events from the API
    renderEvents(events, eventsTableBody); // Render the events in the table
  }

  // Event listener for delete buttons (delegated to the table body)
  eventsTableBody.addEventListener("click", async (e) => {
    if (e.target.classList.contains("deleteButton")) {
      const eventId = e.target.dataset.id; // Get the ID of the event to delete
      try {
        await deleteEvent(eventId); // Call the delete event API
        await loadEvents(); // Reload events after deletion to refresh the list
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  });
});

// PARTICIPANTS

// Load participants and render them in the table
export async function loadParticipants() {
  try {
    const { participants } = await fetchParticipants();
    const participantsTableBody = document.getElementById(
      "participantsTableBody"
    );
    renderParticipants(participants, participantsTableBody);
  } catch (error) {
    console.error("Error loading participants:", error);
  }
}

// Handle "Add New Participant" form submission
document
  .getElementById("newParticipantForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("participantName").value;
    const email = document.getElementById("participantEmail").value;
    const eventId = document.getElementById("eventSelect").value;

    try {
      await addParticipant({ name, email, event_id: eventId });
      loadParticipants(); // Reload participants after adding a new one
      document.getElementById("newParticipantForm").reset(); // Clear the form
    } catch (error) {
      console.error("Error adding participant:", error);
    }
  });

// Initialize the participants table and dropdown on page load
loadParticipants();
populateEventDropdowns();
initializeFiltering(); // Initialize event filtering
