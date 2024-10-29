export function fetchEvents() {
    return fetch("/api/events")
        .then((response) => response.json())
        .catch((error) => console.error("Error fetching events:", error));
}
