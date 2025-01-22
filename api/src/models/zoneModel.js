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
        type: {
            type: String,
            enum: ['Polygon', 'MultiPolygon'],
        },
        coordinates: {
            type: [[[Number]]],
        }
    },
    color: {
        type: String,
    },
    city_id: Number,
    // is_free: { type: Boolean, default: false }
}, {timestamps: true});

// Automatisk tilldelnign av ID
parkingZoneSchema.plugin(autoIncrement, {inc_field: 'parking_zone_id'})

module.exports = mongoose.model('ParkingZone', parkingZoneSchema, 'parking_zones');