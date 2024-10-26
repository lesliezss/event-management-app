/* 
events
GET	/api/events	List all events
GET /api/events/search' search by event name

POST	/api/events	Create a new event
DELETE	/api/events/:id	Delete a specific event
GET	/api/events/:id	Get details of a specific event

locations
GET	/api/locations	List all locations

participants
GET	/api/participants	List all participants
POST	/api/participants	Create a new participant
PATCH
DELETE	/api/participants/:id	Delete a specific participant
GET  /api/participants/:event_id   filter participants by event


blacklist
POST	/api/blacklist	Add an IP to the blacklist
DELETE	/api/blacklist/:ip	Remove an IP from the blacklist
GET	/api/blacklist	Get a list of all blacklisted IPs
POST	/api/whitelist	Add an IP to the whitelist
*/

const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seed/seed");

beforeEach(() => seed());

afterAll(() => db.end());

describe("GET /api/events", () => {
  test("200 GET: response with an array of all events", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body }) => {
        const { events } = body;
        expect(events.length).toBe(3);
        events.forEach((event) => {
          expect(event).toMatchObject({
            event_name: expect.any(String),
            event_date: expect.any(String),
            location_name: expect.any(String),
            guest_number: expect.any(Number),
          });
        });
      });
  });
});

describe("GET /api/events/search", () => {
  test("200 GET: response with an array of matching events", () => {
    return request(app)
      .get("/api/events/search?name=Tech")
      .expect(200)
      .then(({ body }) => {
        const { events } = body;
        expect(events.length).toBeGreaterThan(0);
        events.forEach((event) => {
          expect(event).toMatchObject({
            event_name: expect.any(String),
            event_date: expect.any(String),
            location_name: expect.any(String),
            guest_number: expect.any(Number),
          });
        });
      });
  });

  test("404 GET: no events found", () => {
    return request(app)
      .get("/api/events/search?name=NonExistingEvent")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "No events found" });
      });
  });

  test("400 GET: bad request without name parameter", () => {
    return request(app)
      .get("/api/events/search")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "Please provide an event name to search.",
        });
      });
  });
});

describe("POST /api/events", () => {
  test("201 POST: add an event, response with the posted event", () => {
    const newEvent = {
      event_name: "New Event",
      event_date: "2025-01-01",
      location_id: 1,
    };
    return request(app)
      .post("/api/events")
      .send(newEvent)
      .expect(201)
      .then(({ body }) => {
        const { newEvent } = body;
        expect(newEvent).toMatchObject({
          event_id: expect.any(Number),
          event_name: "New Event",
          event_date: "2025-01-01T00:00:00.000Z",
          location_id: 1,
        });
      });
  });
  test("status 400: responds with an error message when fileds are not filled", () => {
    const newEvent = {
      event_name: "New Event",
      event_date: "2025-01-01",
    };
    return request(app)
      .post("/api/events")
      .send(newEvent)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("All fields are required");
      });
  });
  test("status 404: responds with an error message when locatin_id is invalid", () => {
    const newEvent = {
      event_name: "New Event",
      event_date: "2025-01-01",
      location_id: 999,
    };
    return request(app)
      .post("/api/events")
      .send(newEvent)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Location not found");
      });
  });
  test("status 400: should respond with an error if the event_date is invalid", () => {
    return request(app)
      .post("/api/events")
      .send({
        event_name: "New Event",
        event_date: "2026-01", // An invalid date format
        location_id: 1,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "Invalid date format",
        });
      });
  });
  test("status 400: should respond with an error if the event_date is in the past", () => {
    return request(app)
      .post("/api/events")
      .send({
        event_name: "Past Event",
        event_date: "2022-01-01", // A date in the past
        location_id: 1,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "Event date cannot be in the past",
        });
      });
  });
});
