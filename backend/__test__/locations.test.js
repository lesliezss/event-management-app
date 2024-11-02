// locations
// GET	/api/locations	List all locations

const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seed/seed");

beforeEach(() => seed());

afterAll(() => db.end());

describe("GET /api/locations", () => {
  test("200 GET: response with an array of all locations", () => {
    return request(app)
      .get("/api/locations")
      .expect(200)
      .then(({ body }) => {
        const { locations } = body;
        expect(locations.length).toBe(3);
        locations.forEach((location) => {
          expect(location).toMatchObject({
            location_id: expect.any(Number),
            location_name: expect.any(String),
            capacity: expect.any(Number),
            occupancy_rate: expect.any(String),
            guest_to_capacity: expect.any(String),
          });
        });
      });
  });
});