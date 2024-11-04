import {
  updateParticipant,
  fetchParticipantsByEvent,
} from "../api/participantsApi.js";
import { fetchEvents } from "../api/eventsApi.js";
import { loadParticipants } from "../app.js";
import { renderEvents } from "./events.js";

// Function to render participants in the table
export function renderParticipants(participants, participantsTableBody) {
  participantsTableBody.innerHTML = ""; // Clear existing entries

  participants.forEach((participant) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${participant.name}</td>
        <td>${participant.email}</td>
        <td>${participant.event_name}</td>
        <td>
          <button class="updateButton" data-id="${participant.participant_id}">Update</button>
        </td>
      `;
    participantsTableBody.appendChild(row);
  });

  // Add event listeners for the update buttons
  document.querySelectorAll(".updateButton").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const participantId = e.target.dataset.id;
      const name = prompt("Enter new name:");
      const email = prompt("Enter new email:");
      const eventId = prompt("Enter new event ID:");
      if (name && email && eventId) {
        try {
          await updateParticipant(participantId, {
            name,
            email,
            event_id: eventId,
          });
          loadParticipants(); // Reload participants after update
          // Fetch the updated events and render them
          const events = await fetchEvents(); // Fetch updated events
          const eventsTableBody = document.querySelector("#eventsTableBody"); // Adjust to your actual events table body ID
          renderEvents(events, eventsTableBody); // Call your existing renderEvents function
        } catch (error) {
          console.error("Error updating participant:", error);
        }
      }
    });
  });
}

// Function to filter participants by event
export async function filterParticipantsByEvent(eventId) {
  const participantsTableBody = document.querySelector(
    "#participantsTableBody"
  ); // Adjust to your actual participants table body ID
  try {
    const participants = await fetchParticipantsByEvent(eventId);
    renderParticipants(participants, participantsTableBody);
  } catch (error) {
    console.error("Error fetching participants:", error);
  }
}

// Example function to initialize filtering
export async function initializeFiltering() {
  const eventSelect = document.getElementById("eventFilter"); // Adjust to your event dropdown ID
  eventSelect.addEventListener("change", (e) => {
    const selectedEventId = e.target.value;
    filterParticipantsByEvent(selectedEventId);
  });
}

// Function to populate the event dropdowns for both new participant form and filtering
export async function populateEventDropdowns() {
  const events = await fetchEvents();

  // Populate new participant dropdown
  const eventSelect = document.getElementById("eventSelect");
  eventSelect.innerHTML = ""; // Clear existing options
  events.forEach((event) => {
    const option = document.createElement("option");
    option.value = event.event_id; // Set value to event_id
    option.textContent = event.event_name; // Display event_name
    eventSelect.appendChild(option);
  });

  // Populate event filter dropdown
  const eventFilter = document.getElementById("eventFilter");
  eventFilter.innerHTML = ""; // Clear existing options
  events.forEach((event) => {
    const option = document.createElement("option");
    option.value = event.event_id; // Set value to event_id
    option.textContent = event.event_name; // Display event_name
    eventFilter.appendChild(option);
  });
}
