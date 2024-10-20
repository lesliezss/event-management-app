/* 
Method	Endpoint	Description
POST	/api/events	Create a new event
GET	/api/events	List all events
GET	/api/events/:id	Get details of a specific event
PUT	/api/events/:id	Update an event
DELETE	/api/events/:id	Delete a specific event
POST	/api/locations	Create a new location
GET	/api/locations	List all locations
GET	/api/locations/:id	Get details of a specific location
PUT	/api/locations/:id	Update a location
DELETE	/api/locations/:id	Delete a specific location
POST	/api/participants	Create a new participant
GET	/api/participants	List all participants
GET	/api/participants/:id	Get details of a specific participant
PUT	/api/participants/:id	Update a participant
DELETE	/api/participants/:id	Delete a specific participant
GET	/api/events?date=YYYY-MM-DD	Filter events by date



POST	/api/blacklist	Add an IP to the blacklist
DELETE	/api/blacklist/:ip	Remove an IP from the blacklist
GET	/api/blacklist	Get a list of all blacklisted IPs
POST	/api/whitelist	Add an IP to the whitelist


*/

const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");


beforeEach(() => seed());

afterAll(() => db.end());