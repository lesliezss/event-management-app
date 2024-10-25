const express = require("express");

const {getAllEvents} = require("./controllers/evets.controller")

const app = express();

app.use(express.json());

// events endpoints

app.get("/api/events", getAllEvents)


module.exports = app;
