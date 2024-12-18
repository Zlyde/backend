const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = new mongoose.Schema({
    user_id: { type: Number, unique: true  },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    account_balance: { type: Number, default: 0 }, 
    githubId: { type: String },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
}, {timestamps: true});

userSchema.plugin(autoIncrement, {inc_field: 'user_id'})

module.exports = mongoose.model('User', userSchema);