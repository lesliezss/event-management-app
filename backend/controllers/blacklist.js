// controllers/blacklistController.js
const {addToBlacklist, getBlacklist, removeFromBlacklist} = require('../models/blacklist');

// Add an IP to the blacklist
exports.addIpToBlacklist = async (req, res) => {
    const { ip_address } = req.body;
  
    if (!ip_address) {
      return res.status(400).json({ error: "IP address is required." });
    }
  
    try {
      await addToBlacklist(ip_address);
      res.status(201).json({ message: "IP address added to blacklist." });
    } catch (error) {
      console.error("Error adding IP to blacklist:", error);
      res.status(500).json({ error: "Failed to add IP to blacklist." });
    }
  };
  
  // Get all blacklisted IPs
  exports.getBlacklist = async (req, res) => {
    try {
      const blacklist = await getBlacklist();
      res.status(200).json({ blacklist });
    } catch (error) {
      console.error("Error fetching blacklist:", error);
      res.status(500).json({ error: "Failed to retrieve blacklist." });
    }
  };
  
  // Remove an IP from the blacklist
  exports.removeIpFromBlacklist = async (req, res) => {
    const { ip_address } = req.params;
  
    try {
      const wasRemoved = await removeFromBlacklist(ip_address);
      if (wasRemoved) {
        res.status(200).json({ message: "IP address removed from blacklist." });
      } else {
        res.status(404).json({ error: "IP address not found in blacklist." });
      }
    } catch (error) {
      console.error("Error removing IP from blacklist:", error);
      res.status(500).json({ error: "Failed to remove IP from blacklist." });
    }
  };