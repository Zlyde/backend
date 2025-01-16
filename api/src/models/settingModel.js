// src/models/settingModel.js

const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    base_price: { 
        type: Number, 
        required: true,
        index: true
    },
    price_per_minute: {
        type: Number,
        required: true,
        index: true
    },
    start_discount: {
        type: Number,
        required: true
    },
    fee_amount: {
        type: Number,
        required: true,
        min: [0, 'Fee amount cannot be less than 0'], 
        max: [100, 'Fee amount cannot be more than 100']
    },
    rules: {
        free_parking_duration: {
            type: Number,
            required: true
        },
        fine_for_wrong_parking: {
            type: Number,
            required: true
        },
        cancellation_policy: {
            type: String,
            required: true,
            enum: ['No charge if canceled within 5 minutes', 'Other policy options here']
        }
    }
});

module.exports = mongoose.model('Setting', settingSchema, 'app_settings');
