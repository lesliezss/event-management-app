const express = require("express");


const app = express();

app.use(express.json());

// events endpoints

app.get("api/events", getAllEvents)


module.exports = app;
