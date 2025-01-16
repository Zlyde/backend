/**
 * src/data/invoices.js
 */

const Invoice = require('../models/invoiceModel');

// Hämta alla fakturor
const getAllInvoices = async () => {
    try {
        const invoices = await Invoice.find();
        return invoices;
    } catch (error) {
        console.error("Error fetching invoices:", error.message);
        throw new Error(error.message);
    }
};

// Hämta specifik faktura baserat på invoice_id
const getInvoiceById = async (invoiceId) => {
    try {
        const invoice = await Invoice.findOne({ invoice_id: invoiceId });
        if (!invoice) throw new Error(`Invoice with ID ${invoiceId} not found`);
        return invoice;
    } catch (error) {
        console.error(`Error fetching invoice by ID ${invoiceId}:`, error.message);
        throw new Error(error.message);
    }
};

// Hämta specifik faktura baserat på user_id
const getInvoicesByUserId = async (userId) => {
    try {
        const invoices = await Invoice.find({ user_id: userId });
        return invoices;
    } catch (error) {
        console.error(`Error fetching invoices for user ${userId}:`, error.message);
        throw error;
    }
};

// Skapa en ny faktura
const addInvoice = async (invoiceData) => {
    try {
        const newInvoice = new Invoice(invoiceData);
        console.log("Added invoice", newInvoice);
        return await newInvoice.save();
    } catch (error) {
        console.error("Error adding invoice:", error.message);
        throw new Error(error.message);
    }
};

// Uppdatera en faktura
const updateInvoice = async (invoiceId, invoiceDataToUpdate) => {
    try {
        const updatedInvoice = await Invoice.findOneAndUpdate(
            { invoice_id: invoiceId },
            { $set: invoiceDataToUpdate },
            { new: true, runValidators: true }
        );
        if (!updatedInvoice) throw new Error(`Invoice with ID ${invoiceId} not found`);
        return updatedInvoice;
    } catch (error) {
        console.error(`Error updating invoice with ID ${invoiceId}:`, error.message);
        throw new Error(error.message);
    }
};

module.exports = {
    getAllInvoices,
    getInvoiceById,
    getInvoicesByUserId,
    addInvoice,
    updateInvoice
};
