// participants
// GET	/api/participants	List all participants

// POST	/api/participants	Create a new participant

// DELETE	/api/participants/:id	Delete a specific participant
// GET  /api/participants/:event_id   filter participants by event

const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seed/seed");

beforeEach(() => seed());

afterAll(() => db.end());

describe("GET /api/participants", () => {
  test("200 GET: response with an array of all participants", () => {
    return request(app)
      .get("/api/participants")
      .expect(200)
      .then(({ body }) => {
        const { participants } = body;
        expect(participants.length).toBeGreaterThan(0);
        participants.forEach((participant) => {
          expect(participant).toMatchObject({
            name: expect.any(String),
            email: expect.any(String),
            event_name: expect.any(String),
          });
        });
      });
  });
});

describe("POST /api/participants", () => {
  test("201 POST: add a participant, response with the posted participant", () => {
    const newParticipant = {
      name: "New Participants",
      email: "new@example.com",
      event_id: 2,
    };
    return request(app)
      .post("/api/participants")
      .send(newParticipant)
      .expect(201)
      .then(({ body }) => {
        const { newParticipant } = body;
        expect(newParticipant).toMatchObject({
          participant_id: expect.any(Number),
          name: "New Participants",
          email: "new@example.com",
        });
      });
  });
  test("status 400: responds with an error message when fileds are not filled", () => {
    const newParticipant = {
      name: "New Participants",
      email: "new@example.com",
    };
    return request(app)
      .post("/api/participants")
      .send(newParticipant)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("All fields are required");
      });
  });

  test("status 404: responds with an error message when event_id is invalid", () => {
    const newParticipant = {
      name: "New Participants",
      email: "new@example.com",
      event_id: 99,
    };
    return request(app)
      .post("/api/participants")
      .send(newParticipant)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Event not found");
      });
  });
});
