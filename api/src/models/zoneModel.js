const mongoose = require('mongoose');

const parkingZoneSchema = new mongoose.Schema({
    parking_zone_id: { type: Number, unique: true },
    location: {
        coordinates: {
            type: [[[Number]]],  // Array av koordinater
            required: true
        }
    },
    capacity: { type: Number, default: 0 },
    current_bikes: { type: Number, default: 0 },
    city_id: Number,
    is_free: { type: Boolean, default: false }
});

module.exports = mongoose.model('ParkingZone', parkingZoneSchema, 'parking_zones');