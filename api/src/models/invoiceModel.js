/**
 * src/models/invoiceModel.js
 */

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const invoiceSchema = new mongoose.Schema({
    invoice_id: { 
        type: Number, 
        unique: true,
        immutable: true, // Förhindrar att man kan ändra detta värde
        index: true
    },
    user_id: { type: Number, required: true },
    trip_id: { type: Number, required: true },
    base_price: { type: Number, required: true },
    variable_price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },
    total_amount: { type: Number, required: true },
    billing_date: { 
        type: Date, 
        default: Date.now // Sätts automatiskt till aktuellt datum vid skapande
    },
    status: { 
        type: String, 
        enum: ['unpaid', 'paid'], 
        default: 'unpaid' 
    },
    payment_method: { 
        type: String, 
        enum: ['prepaid', 'autogiro', null], 
        default: null 
    }
}, { timestamps: true });

// Automatisk tilldelning av ID
invoiceSchema.plugin(autoIncrement, { inc_field: 'invoice_id' });

module.exports = mongoose.model('Invoice', invoiceSchema, 'invoices');
