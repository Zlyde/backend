// src/models/bikeModel.js

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose)

const bikeSchema = new mongoose.Schema({
    bike_id: { 
        type: Number, 
        unique: true,
        immutable: true, // Förhindrar att man kan ändra detta värde
        index: true
    },    
    status: {
        type: String,
        enum: ['available', 'in-use', 'charging', 'maintenance'],
        default: 'available'
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number], // Longitude, Latitude
            default: [0, 0]
        }
    },
    battery_level: {
        type: Number,
        default: 100, // Defaultvärde
        min: [0, 'Battery level cannot be less than 0'], // Minimumvärde
        max: [100, 'Battery level cannot be more than 100'] // Maximumvärde
    },
    last_service_date: Date,
    // parking_zone_id: {
    //     type: Number,
    //     default: null
    // },
    // charging_station_id: {
    //     type: Number,
    //     default: null
    // }
}, { timestamps: true });

// Automatisk tilldelnign av ID
bikeSchema.plugin(autoIncrement, {inc_field: 'bike_id'})

// Index för geografisk sökning
bikeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Bike', bikeSchema);