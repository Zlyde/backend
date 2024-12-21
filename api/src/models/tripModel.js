// src/models/tripModel.js

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose)

const tripSchema = new mongoose.Schema({
    trip_id: { 
        type: Number, 
        unique: true,
        immutable: true, // Förhindrar att man kan ändra detta värde
        index: true
    },
    user_id: { type: Number, required: true },
    bike_id: { type: Number, required: true },
    start_time: { type: Date, default: Date.now }, // Starttid sätts automatiskt vid skapande
    end_time: { type: Date, default: null }, // Standardvärde null, detta kan användas för att kontrollera om en resa är pågående eller avslutad.
    start_location: {
        coordinates: {
            type: [Number],  // Array av två koordinater
            required: true
        }
    },
    end_location: {
        coordinates: {
            type: [Number],  // Array av två koordinater
            required: true
        }
    },
    parking_fee: { type: Boolean, default: false },
    start_discount: { type: Boolean, default: false },
    total_cost: { type: Number, default: 0 },
    duration: { type: Number, default: 0 } // Duration i minuter
});

// Automatisk tilldelnign av ID
tripSchema.plugin(autoIncrement, {inc_field: 'trip_id'})

module.exports = mongoose.model('Trip', tripSchema, 'trips');