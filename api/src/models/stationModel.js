// src/models/stationModel.js

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose)

const chargingStationSchema = new mongoose.Schema({
    charging_station_id: { 
        type: Number, 
        unique: true,
        immutable: true, // Förhindrar att man kan ändra detta värde
        index: true
    },
    location: {
        type: {
            type: String,
            enum: ['Polygon', 'MultiPolygon'], // För geojson geometrier
        },
        coordinates: {
            type: [[[Number]]], // Array för Polygon och MultiPolygon
        }
    },
    city_id: Number,
});

// Automatisk tilldelnign av ID
chargingStationSchema.plugin(autoIncrement, {inc_field: 'charging_station_id'})

// Skapa geospatialt index
chargingStationSchema.index({ location: '2dsphere' })

module.exports = mongoose.model('Station', chargingStationSchema, 'charging_stations');