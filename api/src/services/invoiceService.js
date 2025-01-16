/**
 * src/services/invoiceService.js
 */

const invoiceData = require('../data/invoices');
const tripData = require('../data/trips');
const geoService = require('./geoService');
const settingService = require('./settingService');

const createInvoice = async (tripId, userId) => {
    try {
        // Säkerställ att nödvändiga parametrar skickats
        if (!tripId || !userId) {
            throw new Error('Both tripId and userId are required to create an invoice.');
        }

        // Hämta resan
        const trip = await tripData.getTripById(tripId);
        if (!trip) {
            throw new Error(`Trip with ID ${tripId} not found.`);
        }

        // Hämta inställningar
        const settings = await settingService.getSettings();
        if (!settings) {
            throw new Error('Settings not found.');
        }

        // Beräkna grundpris och rörlig taxa
        const basePrice = settings.base_price;
        const variablePrice = trip.duration * settings.price_per_minute;

        // Kontrollera rabatter
        let discount = 0;
        const isInParkingZone = await geoService.isInParkingZone(trip.start_location.coordinates);
        const isInChargingStation = await geoService.isInChargingStation(trip.start_location.coordinates);
        if (!isInParkingZone && !isInChargingStation) {
            discount = settings.start_discount;
        }

        // Kontrollera avgifter
        let fee = 0;
        const isEndInParkingZone = await geoService.isInParkingZone(trip.end_location.coordinates);
        const isEndInChargingStation = await geoService.isInChargingStation(trip.end_location.coordinates);
        if (!isEndInParkingZone && !isEndInChargingStation) {
            fee = settings.fee_amount;
        }

        // Beräkna totalbelopp
        const totalAmount = basePrice + variablePrice - discount + fee;

        // Skapa fakturan
        const invoiceDataInput = {
            user_id: userId,
            trip_id: tripId,
            base_price: basePrice,
            variable_price: variablePrice,
            discount: discount,
            fee: fee,
            total_amount: totalAmount,
            billing_date: new Date(), // Lägg till faktureringsdatum
        };

        const newInvoice = await invoiceData.addInvoice(invoiceDataInput);

        // Loggar för faktura
        console.log("New Invoice", newInvoice);
        console.log('Base price:', basePrice);
        console.log('Variable price:', variablePrice);
        console.log('Discount:', discount);
        console.log('Fee:', fee);
        console.log('Total amount:', totalAmount);

        return newInvoice;
    } catch (error) {
        console.error('Error creating invoice:', error.message);
        throw error;
    }
};

// Hämta alla fakturor
const getAllInvoices = async () => {
    const invoices = await invoiceData.getAllInvoices();
    if (!invoices || invoices.length === 0) {
        throw new Error('No invoices found.');
    }
    return invoices;
};

// Hämta en specifik faktura
const getInvoiceById = async (invoiceId) => {
    const invoice = await invoiceData.getInvoiceById(invoiceId);
    if (!invoice) {
        throw new Error(`Invoice with ID ${invoiceId} not found.`);
    }
    return invoice;
};

/**
 * Hämta alla fakturor för en specifik kund
 * @param {Number} userId - ID för kunden vars fakturor ska hämtas
 * @returns {Array} - Lista med fakturor
 */
const getInvoicesByUserId = async (userId) => {
    try {
        if (!userId) {
            throw new Error('User ID is required to fetch invoices.');
        }

        const invoices = await invoiceData.getInvoicesByUserId(userId);
        if (!invoices || invoices.length === 0) {
            throw new Error(`No invoices found for user with ID ${userId}`);
        }

        return invoices;
    } catch (error) {
        console.error(`Error fetching invoices for user ${userId}:`, error.message);
        throw error;
    }
};

/**
 * Markera faktura som betald och registrera betalmetod
 * @param {Number} invoiceId - ID för fakturan
 * @param {String} paymentMethod - Betalmetod ("prepaid" eller "autogiro")
 * @returns {Object} - Den uppdaterade fakturan
 */
const markInvoiceAsPaid = async (invoiceId, paymentMethod) => {
    try {
        // Validera betalmetod
        const validPaymentMethods = ['prepaid', 'autogiro'];
        if (!validPaymentMethods.includes(paymentMethod)) {
            throw new Error('Invalid payment method. Accepted values are "prepaid" or "autogiro".');
        }

        // Hämta fakturan för att säkerställa att den existerar
        const invoice = await invoiceData.getInvoiceById(invoiceId);
        if (!invoice) {
            throw new Error(`Invoice with ID ${invoiceId} not found.`);
        }

        // Kontrollera om fakturan redan är betald
        if (invoice.status === 'paid') {
            throw new Error(`Invoice with ID ${invoiceId} is already marked as paid.`);
        }

        // Uppdatera fakturan
        const updatedInvoice = await invoiceData.updateInvoice(invoiceId, {
            status: 'paid',
            payment_method: paymentMethod,
        });

        console.log(`Invoice ${invoiceId} marked as paid with payment method: ${paymentMethod}`);
        return updatedInvoice;
    } catch (error) {
        console.error(`Error marking invoice as paid: ${error.message}`);
        throw error;
    }
};

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    markInvoiceAsPaid,
    getInvoicesByUserId
};
