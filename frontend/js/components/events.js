import { fetchEvents } from '../api/eventsApi.js';

export function loadEvents() {
    fetchEvents().then((events) => {
        const eventsSection = document.getElementById("events");
        eventsSection.innerHTML = "<h2>Events Overview</h2>";

        events.forEach((event) => {
            const eventElement = document.createElement("div");
            eventElement.className = "event-item";
            eventElement.innerHTML = `<h3>${event.event_name}</h3>
                                       <p>Date: ${event.event_date}</p>
                                       <p>Location ID: ${event.location_id}</p>`;
            eventsSection.appendChild(eventElement);
        });
    });
}
