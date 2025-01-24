/**
 * tests/apiRoutes.test.js
 */

const request = require("supertest");
const express = require("express");
const apiRoutes = require("../routes/apiRoutes");

// Skapa en mockad Express-app för tester
let app;
let server;

beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/api", apiRoutes);
  
    // Starta en server för testerna (om det behövs)
    server = app.listen(4000); // Använd en ledig port för att undvika krockar
});
  
afterEach((done) => {
    server.close(done); // Säkerställ att servern stängs korrekt efter varje test
});

describe("API Routes", () => {
    describe("Root endpoint (/api)", () => {
      it("should return a welcome message and endpoints", async () => {
        const res = await request(app).get("/api");
  
        expect(res.status).toBe(200); // Kontrollera HTTP-status
        expect(res.headers["content-type"]).toContain("application/json"); // Kontrollera att JSON returneras
        expect(res.body).toHaveProperty("message", "Welcome to the Test API!");
        expect(res.body).toHaveProperty("endpoints");
        expect(res.body.endpoints).toEqual(
          expect.objectContaining({
            auth: "/auth",
            bikes: "/bike",
            city: "/city",
            invoices: "/invoice",
            stations: "/station",
            trips: "/trip",
            zones: "/zone",
            users: "/user",
            settings: "/setting",
          })
        );
      });
    });
});

describe("API Routes", () => {
  describe("Root endpoint (/api)", () => {
    it("should return a welcome message and endpoints", async () => {
      const res = await request(app).get("/api");

      expect(res.status).toBe(200); // Kontrollera HTTP-status
      expect(res.headers["content-type"]).toContain("application/json"); // Kontrollera att JSON returneras
      expect(res.body).toHaveProperty("message", "Welcome to the Test API!");
      expect(res.body).toHaveProperty("endpoints");
      expect(res.body.endpoints).toEqual(
        expect.objectContaining({
          auth: "/auth",
          bikes: "/bike",
          city: "/city",
          invoices: "/invoice",
          stations: "/station",
          trips: "/trip",
          zones: "/zone",
          users: "/user",
          settings: "/setting",
        })
      );
    });
  });
});
