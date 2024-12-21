// src/models/zoneModel.js

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose)

const parkingZoneSchema = new mongoose.Schema({
    parking_zone_id: { 
        type: Number, 
        unique: true,
        immutable: true, // Förhindrar att man kan ändra detta värde
        index: true
    },
    location: {
        coordinates: {
            type: [[[Number]]],  // Array av koordinater
            required: true
        }
    },
    // capacity: { type: Number, default: 0 },
    // current_bikes: { type: Number, default: 0 },
    // city_id: Number,
    // is_free: { type: Boolean, default: false }
});

// Automatisk tilldelnign av ID
parkingZoneSchema.plugin(autoIncrement, {inc_field: 'parking_zone_id'})

module.exports = mongoose.model('ParkingZone', parkingZoneSchema, 'parking_zones');