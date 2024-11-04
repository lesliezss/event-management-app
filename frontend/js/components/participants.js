import { updateParticipant } from '../api/participantsApi.js';

// Function to render participants in the table
export function renderParticipants(participants, participantsTableBody) {
  participantsTableBody.innerHTML = ''; // Clear existing entries

  participants.forEach(participant => {
    const row = document.createElement('tr');
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
  document.querySelectorAll('.updateButton').forEach(button => {
    button.addEventListener('click', async (e) => {
      const participantId = e.target.dataset.id;
      const name = prompt('Enter new name:');
      const email = prompt('Enter new email:');
      const eventId = prompt('Enter new event ID:');
      if (name && email && eventId) {
        try {
          await updateParticipant(participantId, { name, email, event_id: eventId });
          loadParticipants(); // Reload participants after update
        } catch (error) {
          console.error('Error updating participant:', error);
        }
      }
    });
  });
}

// Function to populate the event dropdown for new participant form
export async function populateEventDropdown() {
  const events = await fetchEvents();
  const eventSelect = document.getElementById('eventSelect');

  // Clear existing options
  eventSelect.innerHTML = '';

  // Add an option for each event
  events.forEach(event => {
    const option = document.createElement('option');
    option.value = event.event_id; // Set value to event_id
    option.textContent = event.event_name; // Display event_name
    eventSelect.appendChild(option);
  });
}
