/**
 * tests/config/database.test.js
 */

const mongoose = require("mongoose");
const { getDb } = require("../config/database");

// Mocka Mongoose
jest.mock("mongoose");

// Testa att ansluta till databasen
describe("Database connection", () => {
    // Återställ mocken efter varje test
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    // Simulera en lyckad anslutning till databasen
    it("should connect to the database successfully", async () => {
        // Simulera lyckad anslutning
        mongoose.connect.mockResolvedValueOnce(); 
    
        // Anropa funktionen
        await getDb();
    
        // Kontrollera att mongoose.connect anropas med rätt parametrar
        expect(mongoose.connect).toHaveBeenCalledTimes(1);
        expect(mongoose.connect).toHaveBeenCalledWith(
        expect.stringContaining("mongodb+srv://"), // Kontrollera att DSN börjar med rätt format
        { dbName: process.env.DB_NAME }
        );
    });
    
    it("should handle connection errors gracefully", async () => {
        mongoose.connect.mockRejectedValueOnce(new Error("Connection failed"));
        const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});
    
        await getDb();
    
        expect(exitSpy).toHaveBeenCalledWith(1);
    
        exitSpy.mockRestore();
    });
});
