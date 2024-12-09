const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password_hash: { type: String, required: true },
    account_balance: { type: Number, default: 0 }, 
    created_at: { type: Date, default: Date.now },
    oauth_id: { type: String, default: null },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
});

module.exports = mongoose.model('User', userSchema);