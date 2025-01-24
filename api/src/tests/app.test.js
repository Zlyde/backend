/**
 * tests/app.test.js
 * Testar funktionaliteten i App.js
 */

const request = require("supertest");
const { startServer, stopServer, app } = require("../app");

describe("App.js", () => {
  beforeAll(async () => {
    await startServer(); // Starta servern innan testerna
  });

  afterAll(async () => {
    await stopServer(); // Stäng servern efter testerna
  });

  describe("Server initialization", () => {
    it("should start the server and respond with the API root", async () => {
      const res = await request(app).get("/api/v1");

      expect(res.status).toBe(200); // Kontrollera att servern svarar korrekt
      expect(res.headers["content-type"]).toContain("application/json"); // Kontrollera att JSON returneras
      expect(res.body).toHaveProperty("message", "Welcome to the Test API!");
    });
  });

  describe("API versioning", () => {
    it("should handle API routes using the version prefix", async () => {
      const res = await request(app).get("/api/v1/auth");

      expect([200, 404]).toContain(res.status); // Kontrollera att route fungerar eller saknas
    });
  });
});