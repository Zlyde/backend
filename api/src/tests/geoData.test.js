/**
 * tests/geoData.test.js
 */

const geoData = require('../data/geoData');
const Bike = require('../models/bikeModel');
const City = require('../models/cityModel');
const ChargingStation = require('../models/stationModel');
const ParkingZone = require('../models/zoneModel');

jest.mock('../models/bikeModel');
jest.mock('../models/cityModel');
jest.mock('../models/stationModel');
jest.mock('../models/zoneModel');

describe('geoData', () => {
    // Resetta alla mockfunktioner efter varje test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('isPointWithinGeometry', () => {
        it('should return true if the point is within the geometry', () => {
            const geometry = { coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]] };
            const pointCoords = [0.5, 0.5];

            const result = geoData.isPointWithinGeometry(geometry, pointCoords);

            expect(result).toBe(true); // Kontrollera att punkten är inom området
        });

        it('should return false if the point is outside the geometry', () => {
            const geometry = { coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]] };
            const pointCoords = [2, 2];

            const result = geoData.isPointWithinGeometry(geometry, pointCoords);

            expect(result).toBe(false); // Kontrollera att punkten är utanför området
        });

        it('should throw an error if geometry is invalid', () => {
            const invalidGeometry = { coordinates: null };
            const pointCoords = [0.5, 0.5];

            expect(() => geoData.isPointWithinGeometry(invalidGeometry, pointCoords)).toThrowError();
        });
    });

    describe('getBikesWithinArea', () => {
        it('should return bikes within the given geometry area', async () => {
            const mockGeometry = {
                type: 'Polygon',
                coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]],
            };
            const mockBikes = [{ id: 1, location: [0.5, 0.5] }, { id: 2, location: [0.6, 0.6] }];

            // Mocka Bike.find för att returnera mockBikes
            Bike.find.mockResolvedValue(mockBikes);

            const bikes = await geoData.getBikesWithinArea(mockGeometry);

            expect(bikes).toEqual(mockBikes); // Kontrollera att rätt cyklar returneras
            expect(Bike.find).toHaveBeenCalledWith({
                location: { $geoWithin: { $geometry: mockGeometry } },
            });
        });

        it('should throw an error if Bike.find fails', async () => {
            const mockGeometry = {
                type: 'Polygon',
                coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]],
            };

            // Mocka Bike.find för att kasta ett fel
            Bike.find.mockRejectedValue(new Error('Database error'));

            await expect(geoData.getBikesWithinArea(mockGeometry)).rejects.toThrow('Database error');
        });
    });

    describe('getBikesInDefinedArea', () => {
        it('should return bikes within the defined area', async () => {
            const mockId = '1';
            const mockModel = City;
            const mockType = 'City';
            const mockArea = { city_id: 1, boundary: { type: 'Polygon', coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]] } };
            const mockBikes = [{ id: 1, location: [0.5, 0.5] }, { id: 2, location: [0.6, 0.6] }];

            // Mocka City.findOne för att returnera mockArea
            City.findOne.mockResolvedValue(mockArea);

            // Mocka Bike.find för att returnera mockBikes
            Bike.find.mockResolvedValue(mockBikes);

            const bikes = await geoData.getBikesInDefinedArea(mockId, mockModel, mockType);

            expect(bikes).toEqual(mockBikes); // Kontrollera att rätt cyklar returneras
            expect(City.findOne).toHaveBeenCalledWith({ city_id: mockId });
            expect(Bike.find).toHaveBeenCalledWith({
                location: { $geoWithin: { $geometry: mockArea.boundary } },
            });
        });

        it('should throw an error if the area is not found', async () => {
            const mockId = '1';
            const mockModel = City;
            const mockType = 'City';

            // Mocka City.findOne för att returnera null
            City.findOne.mockResolvedValue(null);

            await expect(geoData.getBikesInDefinedArea(mockId, mockModel, mockType)).rejects.toThrow(`City with ID ${mockId} not found`);
        });   

        it('should throw an error if the area does not have a defined boundary or location', async () => {
            const mockId = '1';
            const mockModel = City;
            const mockType = 'City';
            const mockArea = { city_id: 1 };

            // Mocka City.findOne för att returnera mockArea
            City.findOne.mockResolvedValue(mockArea);

            await expect(geoData.getBikesInDefinedArea(mockId, mockModel, mockType)).rejects.toThrow(`City with ID ${mockId} does not have a defined boundary or location`);
        });

        it('should throw an error if City.findOne fails', async () => {
            const mockId = '1';
            const mockModel = City;
            const mockType = 'City';

            // Mocka City.findOne för att kasta ett fel
            City.findOne.mockRejectedValue(new Error('Database error'));

            await expect(geoData.getBikesInDefinedArea(mockId, mockModel, mockType)).rejects.toThrow('Database error');
        });
    });

    describe('getBikesInCity', () => {
        it('should return bikes within the city area', async () => {
            const mockId = '1';
            const mockArea = { city_id: 1, boundary: { type: 'Polygon', coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]] }};
            const mockBikes = [{ id: 1, location: [0.5, 0.5] }, { id: 2, location: [0.6, 0.6] }];

            // Mocka City.findOne för att returnera mockArea
            City.findOne.mockResolvedValue(mockArea);

            // Mocka Bike.find för att returnera mockBikes
            Bike.find.mockResolvedValue(mockBikes);

            const bikes = await geoData.getBikesInCity(mockId);

            expect(bikes).toEqual(mockBikes); // Kontrollera att rätt cyklar returneras
            expect(City.findOne).toHaveBeenCalledWith({ city_id: mockId });
            expect(Bike.find).toHaveBeenCalledWith({
                location: { $geoWithin: { $geometry: mockArea.boundary } },
            });
        });

        it('should throw an error if City.findOne fails', async () => {
            const mockId = '1';

            // Mocka City.findOne för att kasta ett fel
            City.findOne.mockRejectedValue(new Error('Database error'));

            await expect(geoData.getBikesInCity(mockId)).rejects.toThrow('Database error');
        });
    });

    describe('getBikesInChargingStation', () => {      
        it('should return bikes within the charging station area', async () => {
            const mockId = '1';
            const mockArea = { charging_station_id: 1, location: { type: 'Point', coordinates: [0.5, 0.5] }};
            const mockBikes = [{ id: 1, location: [0.5, 0.5] }, { id: 2, location: [0.6, 0.6] }];

            // Mocka ChargingStation.findOne för att returnera mockArea
            ChargingStation.findOne.mockResolvedValue(mockArea);

            // Mocka Bike.find för att returnera mockBikes
            Bike.find.mockResolvedValue(mockBikes);

            const bikes = await geoData.getBikesInChargingStation(mockId);

            expect(bikes).toEqual(mockBikes); // Kontrollera att rätt cyklar returneras
            expect(ChargingStation.findOne).toHaveBeenCalledWith({ charging_station_id: mockId });
            expect(Bike.find).toHaveBeenCalledWith({
                location: { $geoWithin: { $geometry: { type: 'Point', coordinates: mockArea.location.coordinates } } },
            });
        });

        it('should throw an error if ChargingStation.findOne fails', async () => {
            const mockId = '1';

            // Mocka ChargingStation.findOne för att kasta ett fel
            ChargingStation.findOne.mockRejectedValue(new Error('Database error'));

            await expect(geoData.getBikesInChargingStation(mockId)).rejects.toThrow('Database error');
        });
    });

    describe('getBikesInParkingZone', () => {
        it('should return bikes within the parking zone area', async () => {
            const mockId = '1';
            const mockArea = { parking_zone_id: 1, boundary: { type: 'Polygon', coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]] }};
            const mockBikes = [{ id: 1, location: [0.5, 0.5] }, { id: 2, location: [0.6, 0.6] }];

            // Mocka ParkingZone.findOne för att returnera mockArea
            ParkingZone.findOne.mockResolvedValue(mockArea);

            // Mocka Bike.find för att returnera mockBikes
            Bike.find.mockResolvedValue(mockBikes);

            const bikes = await geoData.getBikesInParkingZone(mockId);

            expect(bikes).toEqual(mockBikes); // Kontrollera att rätt cyklar returneras
            expect(ParkingZone.findOne).toHaveBeenCalledWith({ parking_zone_id: mockId });
            expect(Bike.find).toHaveBeenCalledWith({
                location: { $geoWithin: { $geometry: mockArea.boundary } },
            });
        });

        it('should throw an error if ParkingZone.findOne fails', async () => {
            const mockId = '1';

            // Mocka ParkingZone.findOne för att kasta ett fel
            ParkingZone.findOne.mockRejectedValue(new Error('Database error'));

            await expect(geoData.getBikesInParkingZone(mockId)).rejects.toThrow('Database error');
        });
    });
});