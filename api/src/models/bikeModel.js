const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    bike_id: Number,
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
    battery_level: Number,
    last_service_date: Date,
    parking_zone_id: {
        type: Number,
        default: null
    },
    charging_station_id: {
        type: Number,
        default: null
    }
}, { timestamps: true });

// Index för geografisk sökning
bikeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Bike', bikeSchema);