// src/models/tripModel.js

const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    trip_id: { type: Number, unique: true },
    user_id: { type: Number, required: true },
    bike_id: { type: Number, required: true },
    start_time: Date,
    end_time: Date,
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
    duration: { type: Number, default: 0 }
});

module.exports = mongoose.model('Trip', tripSchema, 'trips');