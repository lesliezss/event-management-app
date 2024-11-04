const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api" // Local development
    : "http://0c9c87af8dddecca.assessment.munnich.it/api"; // Production link

    export async function fetchParticipants() {
        const response = await fetch(`${API_BASE_URL}/participants`);
        if (!response.ok) {
          throw new Error('Failed to fetch participants');
        }
        return await response.json();
      }
      
      export async function addParticipant(participant) {
        const response = await fetch(`${API_BASE_URL}/participants`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(participant),
        });
        if (!response.ok) {
          throw new Error('Failed to add participant');
        }
        return await response.json();
      }
      
      export async function updateParticipant(participantId, participant) {
        const response = await fetch(`${API_BASE_URL}/participants/${participantId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(participant),
        });
        if (!response.ok) {
          throw new Error('Failed to update participant');
        }
        return await response.json();
      }
      