import {fetchLocations} from "../api/locationsApi.js"

// Function to render locations in the table
function renderLocations(locations) {
    const locationsTableBody = document.getElementById('locationsTableBody');
    locationsTableBody.innerHTML = ''; // Clear existing entries

    locations.forEach(location => {
        const row = document.createElement('tr');
        
        // Create a cell for location name
        const locationCell = document.createElement('td');
        locationCell.textContent = location.location_name;
        row.appendChild(locationCell);
        
        // Create a cell for occupancy rate
        const occupancyRateCell = document.createElement('td');
        occupancyRateCell.textContent = location.occupancy_rate;
        // Add a warning if the occupancy rate is 80% or higher
        if (parseFloat(location.occupancy_rate) >= 80) {
            occupancyRateCell.style.color = 'red'; // Highlight in red
            occupancyRateCell.innerHTML += ' <strong>WARNING!</strong>';
        }
        row.appendChild(occupancyRateCell);
        
        // Create a cell for guest to capacity
        const guestToCapacityCell = document.createElement('td');
        guestToCapacityCell.textContent = location.guest_to_capacity;
        row.appendChild(guestToCapacityCell);

        // Append the row to the table body
        locationsTableBody.appendChild(row);
    });
}

// Function to initialize locations on page load
export async function initLocations() {
    const locations = await fetchLocations(); // Fetch locations
    renderLocations(locations); // Render locations in the table
}
