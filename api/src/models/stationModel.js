const mongoose = require('mongoose');

const chargingStationSchema = new mongoose.Schema({
    charging_station_id: { type: Number, unique: true },
    location: {
        coordinates: {
            type: [[[Number]]],  // Array av koordinater
            required: true
        }
    },
    capacity: { type: Number, default: 0 },
    bikes_charging: { type: Number, default: 0 },
    city_id: Number,
});

module.exports = mongoose.model('Station', chargingStationSchema, 'charging_stations');