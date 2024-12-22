// src/models/userModel.js

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = new mongoose.Schema({
    user_id: { 
        type: Number, 
        unique: true,
        immutable: true, // Förhindrar att man kan ändra detta värde
        index: true
    },
    name: { 
        type: String,
    },
    email: { 
        type: String,
        unique: true,
        sparse: true,
        match: [/\S+@\S+\.\S+/, 'Email format is invalid'],
        index: true 
    },
    password: { 
        type: String,
        minlength: [8, 'Password must be at least 8 characters long'],
        required: function () {
            return !this.githubId; // Endast krav om OAuth-ID saknas
        }
    },
    account_balance: { 
        type: Number, 
        default: 0,
        min: [0, 'Account balance cannot be negative']
    }, 
    githubId: { 
        type: String,
        unique: true,
        sparse: true, // Tillåter att fältet är null och validerar unikt fält valideras endast om fältet är ifyllt
        index: true 
    }, 
    role: { 
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer',
        index: true
    },
}, {timestamps: true});

// Automatisk tilldelnign av ID
userSchema.plugin(autoIncrement, {inc_field: 'user_id'})

module.exports = mongoose.model('User', userSchema);
