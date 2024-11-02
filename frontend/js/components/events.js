
// Render events in the table
export function renderEvents(events, eventsTableBody) {
    eventsTableBody.innerHTML = ''; // Clear previous entries
    events.forEach(event => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${event.event_name}</td>
        <td>${new Date(event.event_date).toLocaleDateString()}</td>
        <td>${event.location_name}</td>
        <td>${event.guest_number}</td>
        <td><button class="deleteButton" data-id="${event.event_id}">Delete</button></td>
      `;
      eventsTableBody.appendChild(row);
    });
  }
  