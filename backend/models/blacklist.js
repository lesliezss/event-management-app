const db = require("../db/connection");

// Add an IP to the blacklist
exports.addToBlacklist = async (ipAddress) => {
    const result = await db.query(
      "INSERT INTO blacklist (ip_address, blocked_at) VALUES (?, NOW())",
      [ipAddress]
    );
    return result.insertId; // Return the ID of the inserted record if needed
  };
  
  // Get all blacklisted IPs
  exports.getBlacklist = async () => {
    const result = await db.query("SELECT * FROM blacklist");
    return result[0];
  };
  
  // Remove an IP from the blacklist
  exports.removeFromBlacklist = async (ipAddress) => {
    const result = await db.query(
      "DELETE FROM blacklist WHERE ip_address = ?",
      [ipAddress]
    );
    return result[0].affectedRows > 0; // Return true if a row was deleted, otherwise false
  };