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
    boundary: {
        type: {
            type: String,
            enum: ['Polygon', 'MultiPolygon'],
        },
        coordinates: {
            type: [[[Number]]],
        }
    },
    capacity: { 
        type: Number, 
        default: 0, 
        min: [0, 'Capacity cannot be less than 0'], 
        max: [50, 'Capacity cannot be more than 50'] 
    },
    current_bikes: { 
        type: Number, 
        default: 0,
        min: [0, 'Current bikes cannot be less than 0'], 
        validate: {
            validator: function(value) {
                return value <= this.capacity;
            },
            message: 'Current bikes cannot exceed capacity'
        }
    },
    color: {
        type: String,
    }
    // city_id: Number,
    // is_free: { type: Boolean, default: false }
}, {timestamps: true});

// Automatisk tilldelnign av ID
parkingZoneSchema.plugin(autoIncrement, {inc_field: 'parking_zone_id'})

module.exports = mongoose.model('ParkingZone', parkingZoneSchema, 'parking_zones');