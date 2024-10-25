/* 
events
GET	/api/events	List all events
POST	/api/events	Create a new event
PATCH  /api/events/:id	Update an event
DELETE	/api/events/:id	Delete a specific event
GET /api/events/search' search by event name
GET	/api/events/:id	Get details of a specific event

locations
GET	/api/locations	List all locations

participants
GET	/api/participants	List all participants
POST	/api/participants	Create a new participant
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
          const {events} = body;
          expect(events.length).toBe(3);
          events.forEach((event) => {
            expect(event).toMatchObject({
              event_name: expect.any(String),
              event_date: expect.any(String),
              location_name: expect.any(String),
              guest_number: expect.any(Number)
            });
          });
        });
    })
})