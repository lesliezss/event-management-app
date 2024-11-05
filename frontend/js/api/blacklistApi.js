const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api" // Local development
    : "http://0c9c87af8dddecca.assessment.munnich.it/api"; // Production link


// Fetch the blacklist
export const fetchBlacklist = async () => {
    const response = await fetch(`${API_BASE_URL}/blacklist`);
    if (!response.ok) {
        throw new Error('Failed to fetch blacklist');
    }
    return await response.json();
};

// Add an IP to the blacklist
export const addToBlacklist = async (ipAddress) => {
    const response = await fetch(`${API_BASE_URL}/blacklist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip_address: ipAddress }),
    });
    if (!response.ok) {
        throw new Error('Failed to add IP to blacklist');
    }
    return await response.json();
};

// Remove an IP from the blacklist
export const removeFromBlacklist = async (ipAddress) => {
    const response = await fetch(`${API_BASE_URL}/blacklist/${ipAddress}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to remove IP from blacklist');
    }
    return await response.json();
};
