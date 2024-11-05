
import {
  fetchBlacklist,
  addToBlacklist,
  removeFromBlacklist,
} from "../api/blacklistApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const blacklistTableBody = document.querySelector("#blacklistTable tbody");
  const newBlacklistForm = document.getElementById("newBlacklistForm");
  const ipInput = document.getElementById("ipInput");

  // Function to render the blacklist table
  const renderBlacklist = async () => {
    const {blacklist} = await fetchBlacklist();
    blacklistTableBody.innerHTML = ""; // Clear existing rows
    blacklist.forEach(({ ip_address, blocked_at }) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${ip_address}</td>
                <td>${new Date(blocked_at).toLocaleString()}</td>
                <td><button class="removeIpButton" data-ip="${ip_address}">Unblock</button></td>
            `;
      blacklistTableBody.appendChild(row);
    });

    // Add event listeners for unblock buttons
    const unblockButtons = document.querySelectorAll(".removeIpButton");
    unblockButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const ipAddress = button.getAttribute("data-ip");
        await removeFromBlacklist(ipAddress);
        renderBlacklist(); // Refresh the table
      });
    });
  };

  // Add event listener for the form submission
  newBlacklistForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ipAddress = ipInput.value;
    await addToBlacklist(ipAddress);
    ipInput.value = ""; // Clear input field
    renderBlacklist(); // Refresh the table
  });

  // Initial render of the blacklist
  renderBlacklist();
});
