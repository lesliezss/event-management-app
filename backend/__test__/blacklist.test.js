const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seed/seed");

beforeEach(() => seed());

afterAll(() => db.end());

describe("Blacklist API Endpoints", () => {
  // Test adding an IP to the blacklist
  describe("POST /api/blacklist", () => {
    test("201 POST: adds an IP to the blacklist and responds with a success message", () => {
      return request(app)
        .post("/api/blacklist")
        .send({ ip_address: "123.45.67.89" })
        .expect(201)
        .then(({ body }) => {
          expect(body).toEqual({ message: "IP address added to blacklist." });
        });
    });

    test("400 POST: returns an error when IP address is missing", () => {
      return request(app)
        .post("/api/blacklist")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.error).toBe("IP address is required.");
        });
    });
  });

  // Test fetching all blacklisted IPs
  describe("GET /api/blacklist", () => {
    test("200 GET: retrieves an array of all blacklisted IPs", async () => {
      // Adding IPs for the test
      await db.query(
        "INSERT INTO blacklist (ip_address) VALUES ('123.45.67.89'), ('98.76.54.32')"
      );

      return request(app)
        .get("/api/blacklist")
        .expect(200)
        .then(({ body }) => {
          const { blacklist } = body;
          expect(blacklist.length).toBeGreaterThan(0);
          blacklist.forEach((entry) => {
            expect(entry).toMatchObject({
              ip_address: expect.any(String),
              blocked_at: expect.any(String),
            });
          });
        });
    });
  });

  // Test removing an IP from the blacklist
  describe("DELETE /api/blacklist/:ip_address", () => {
    test("200 DELETE: removes an IP from the blacklist and responds with a success message", async () => {
      // add the IP to the blacklist so it exists
      await request(app)
        .post("/api/blacklist")
        .send({ ip_address: "192.168.1.1" })
        .expect(201);

      return request(app)
        .delete("/api/blacklist/192.168.1.1")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            message: "IP address removed from blacklist.",
          });
        });
    });

    test("404 DELETE: returns an error when trying to remove a non-existing IP", () => {
      return request(app)
        .delete("/api/blacklist/111.111.111.111")
        .expect(404)
        .then(({ body }) => {
          expect(body.error).toBe("IP address not found in blacklist.");
        });
    });
  });
});
