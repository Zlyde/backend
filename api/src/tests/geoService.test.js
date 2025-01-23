/**
 * tests/geoService.test.js
 */

const geoService = require('../services/geoService');
const geoData = require('../data/geoData');

jest.mock('../data/geoData', () => ({
    getBikesInCity: jest.fn(),
    getBikesInChargingStation: jest.fn(),
    getBikesInParkingZone: jest.fn(),
    isPointWithinGeometry: jest.fn(),
}));

describe('geoService', () => {
    // Resetta alla mockfunktioner efter varje test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getBikesInCity', () => {
        // Testar att funktionen returnerar cyklar när ett giltigt cityId skickas in
        it('should return bikes when valid cityId is provided', async () => {
            // Skapa ett cityId
            const cityId = '123';
            // Mockar cyklar som ska returneras från geoData
            const mockBikes = [{ id: 1 }, { id: 2 }];
            geoData.getBikesInCity.mockResolvedValue(mockBikes);

            // Anropa funktionen getBikesInCity i geoService
            const bikes = await geoService.getBikesInCity(cityId);

            // Förvänta oss att funktionen returnerar mockBikes
            expect(bikes).toEqual(mockBikes);
            // Förvänta oss att funktionen anropar getBikesInCity i geoData med cityId
            expect(geoData.getBikesInCity).toHaveBeenCalledWith(cityId);
        });

        // Testar att funktionen kastar ett fel om cityId är ogiltigt
        it('should throw an error if cityId is invalid', async () => {
            // Sätter cityId till null för att testa att funktionen kastar ett fel
            const cityId = null;

            await expect(geoService.getBikesInCity(cityId)).rejects.toThrow('City ID is invalid');
        });

        // Testar att funktionen kastar ett fel om inga cyklar hittas
        it('should throw an error if no bikes are found', async () => {
            // Skapa ett cityId
            const cityId = '123';
            // Mocka att inga cyklar hittas
            geoData.getBikesInCity.mockResolvedValue([]);

            // Förvänta oss att funktionen kastar ett fel
            await expect(geoService.getBikesInCity(cityId)).rejects.toThrow('No bikes found in city with ID 123');
        });
    });

    // Testar att funktionen returnerar cyklar när ett giltigt stationId skickas in
    describe('getBikesInChargingStation', () => {
        // Testar att funktionen returnerar cyklar när ett giltigt stationId skickas in
        it('should return bikes when valid stationId is provided', async () => {
            // Skapa ett stationId
            const stationId = '456';
            // Mockar cyklar som ska returneras från geoData
            const mockBikes = [{ id: 1 }, { id: 2 }];
            geoData.getBikesInChargingStation.mockResolvedValue(mockBikes);

            // Anropa funktionen getBikesInChargingStation i geoService
            const bikes = await geoService.getBikesInChargingStation(stationId);

            // Förvänta oss att funktionen returnerar mockBikes
            expect(bikes).toEqual(mockBikes);
            expect(geoData.getBikesInChargingStation).toHaveBeenCalledWith(stationId);
        });

        // Testar att funktionen kastar ett fel om stationId är ogiltigt
        it('should throw an error if stationId is invalid', async () => {
            // Sätter stationId till null för att testa att funktionen kastar ett fel
            const stationId = null;
            await expect(geoService.getBikesInChargingStation(stationId)).rejects.toThrow('Charging station ID is invalid');
        });

        // Testar att funktionen kastar ett fel om inga cyklar hittas
        it('should throw an error if no bikes are found', async () => {
            // Skapa ett stationId
            const stationId = '456';
            // Mockar cyklar som ska returneras från geoData
            geoData.getBikesInChargingStation.mockResolvedValue([]);

            // Förvänta oss att funktionen kastar ett fel
            await expect(geoService.getBikesInChargingStation(stationId)).rejects.toThrow(
                'No bikes found in charging station with ID 456'
            );
        });
    });

    // Testar att funktionen returnerar cyklar när ett giltigt zoneId skickas in
    describe('getBikesInParkingZone', () => {
        // Testar att funktionen returnerar cyklar när ett giltigt zoneId skickas in
        it('should return bikes when valid zoneId is provided', async () => {
            // Skapa ett zoneId
            const zoneId = '789';
            // Mockar cyklar som ska returneras från geoData
            const mockBikes = [{ id: 1 }, { id: 2 }];
            geoData.getBikesInParkingZone.mockResolvedValue(mockBikes);

            const bikes = await geoService.getBikesInParkingZone(zoneId);

            expect(bikes).toEqual(mockBikes);
            expect(geoData.getBikesInParkingZone).toHaveBeenCalledWith(zoneId);
        });
        
        // Testar att funktionen kastar ett fel om zoneId är ogiltigt
        it('should throw an error if zoneId is invalid', async () => {
            // Sätter zoneId till null för att testa att funktionen kastar ett fel
            const zoneId = null;
            await expect(geoService.getBikesInParkingZone(zoneId)).rejects.toThrow('Parking zone ID is invalid');
        });

        // Testar att funktionen kastar ett fel om inga cyklar hittas
        it('should throw an error if no bikes are found', async () => {
            // Skapa ett zoneId
            const zoneId = '789';
            // Mockar att inga cyklar hittas
            geoData.getBikesInParkingZone.mockResolvedValue([]);

            // Förvänta oss att funktionen kastar ett fel
            await expect(geoService.getBikesInParkingZone(zoneId)).rejects.toThrow('No bikes found in parking zone with ID 789');
        });
    });
});
