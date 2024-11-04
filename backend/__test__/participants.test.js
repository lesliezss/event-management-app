// participants
// GET	/api/participants	List all participants
// POST	/api/participants	Create a new participant
//Patch /api/participants/:participant_id
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
            participant_id: expect.any(Number),
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

describe("PATCH /api/participants/participant_id", () => {
  test("200 PATCH: updates an existing participant's details and responds with the updated participant", () => {
    const updatedParticipantDetails = {
      name: "Updated Name",
      email: "updatedemail@example.com",
      event_id: 1,
    };

    return request(app)
      .patch("/api/participants/2")
      .send(updatedParticipantDetails)
      .expect(200)
      .then(({ body }) => {
        const { updatedParticipant } = body;
        expect(updatedParticipant).toMatchObject({
          participant_id: "2",
          name: "Updated Name",
          email: "updatedemail@example.com",
        });
      });
  });

  test("status 400: responds with an error message when no updated fields", () => {
    const updatedParticipantDetails = {};

    return request(app)
      .patch("/api/participants/1")
      .send(updatedParticipantDetails)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("All fields are required");
      });
  });
  test("status 400: responds with an error message when passed an invalid participant id", () => {
    const updatedParticipantDetails = {
      name: "Updated Name",
      email: "updatedemail@example.com",
      event_id: 1,
    };

    return request(app)
      .patch("/api/participants/notAnId")
      .send(updatedParticipantDetails)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid participant id");
      });
  });
  test("status 404: responds with an error message when passed a participant id that does not in the database", () => {
    const updatedParticipantDetails = {
      name: "Updated Name",
      email: "updatedemail@example.com",
      event_id: 1,
    };

    return request(app)
      .patch("/api/participants/99")
      .send(updatedParticipantDetails)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No participant found with id: 99");
      });
  });

  test("status 404: responds with an error message when event_id is invalid", () => {
    const updatedParticipantDetails = {
      name: "Updated Name",
      email: "updatedemail@example.com",
      event_id: 99,
    };

    return request(app)
      .patch("/api/participants/1")
      .send(updatedParticipantDetails)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Event not found");
      });
  });
});

describe("GET api/participants/:event_id", () => {
  test("200 GET: response with an array of partiipants at a event", () => {
    return request(app)
      .get("/api/participants/1")
      .expect(200)
      .then(({ body }) => {
        const { participants } = body;
        expect(participants.length).toBeGreaterThan(0);
        participants.forEach((participant) => {
          expect(participant).toMatchObject({
            event_id: expect.any(Number),
            event_name: expect.any(String),
            name: expect.any(String),
            email: expect.any(String),
          });
        });
      });
  });
  test("status:400, responds with an error message when passed a bad session ID", () => {
    return request(app)
      .get("/api/participants/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid event ID");
      });
  });
  test("status 404, responds with an error message when passed a session_id that's not in the database", () => {
    return request(app)
      .get("/api/participants/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No participants found for event id: 999");
      });
  });
});
