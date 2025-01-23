/**
 * src/routes/settingRoutes.js
 * Lager: "Route Layer"
 * 
 * Funktioner:
 * - GET /settings: Hämta inställningar
 * - PUT /settings: Uppdatera inställningar
 * - POST /settings/reset: Återställ inställningar till standardvärden
 */

const express = require('express');
const router = express.Router();
const settingService = require('../services/settingService');

// GET: Hämta inställningar
router.get('/', async (req, res) => {
    try {
        const settings = await settingService.getSettings();
        res.status(200).json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// PUT: Uppdatera inställningar
router.put('/', async (req, res) => {
    try {
        const settingsToUpdate = req.body;
        const updatedSettings = await settingService.updateSettings(settingsToUpdate);
        res.status(200).json(updatedSettings);
    } catch (error) {
        console.error('Error updating settings:', error.message);
        res.status(400).json({ error: error.message }); // Bad Request om valideringen misslyckas
    }
});

// PUT: Återställ inställningar till standardvärden
router.put('/reset', async (req, res) => {
    try {
        const resetSettings = await settingService.resetSettings();
        res.status(200).json(resetSettings);
    } catch (error) {
        console.error('Error resetting settings:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
