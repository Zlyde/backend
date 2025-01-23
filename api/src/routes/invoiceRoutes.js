/**
 * src/routes/invoiceRoutes.js
 */

const express = require("express");
const router = express.Router();
const invoiceService = require("../services/invoiceService");

// GET: Hämta alla fakturor
router.get("/", async (req, res) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Hämta en specifik faktura
router.get("/:invoiceId", async (req, res) => {
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.invoiceId);
    res.status(200).json(invoice);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// GET: Hämta alla fakturor för en specifik användare
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const invoices = await invoiceService.getInvoicesByUserId(userId);
    res.status(200).json(invoices);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// POST: Skapa en ny faktura
router.post("/create", async (req, res) => {
  const { tripId, userId } = req.body;
  try {
    const newInvoice = await invoiceService.createInvoice(tripId, userId);
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Markera en faktura som betald
router.put("/pay/:invoiceId", async (req, res) => {
  const { paymentMethod } = req.body;
  try {
    const updatedInvoice = await invoiceService.markInvoiceAsPaid(
      req.params.invoiceId,
      paymentMethod,
    );
    res.status(200).json(updatedInvoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
