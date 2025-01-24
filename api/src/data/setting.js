/**
 * src/data/setting.js
 * Lager: "Data Layer"
 * 
 * Funktioner:
 * - Hämta inställningar (det enda dokumentet)
 * - Uppdatera inställningar
 * - Återställ inställningar till standardvärden
 */

const Setting = require("../models/settingModel");

// Hämta inställningar (det enda dokumentet)
const getSettings = async () => {
  try {
    const settings = await Setting.findOne(); // Hämta det enda dokumentet
    if (!settings) {
      throw new Error("Settings document not found in the database.");
    }
    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error.message);
    throw new Error(error.message);
  }
};

// Uppdatera inställningar
const updateSettings = async (settingsToUpdate) => {
  try {
    const updatedSettings = await Setting.findOneAndUpdate(
      {}, // Tomt filter eftersom det bara finns ett dokument
      { $set: settingsToUpdate },
      { new: true, runValidators: true }, // Returnera det uppdaterade dokumentet och kör validering
    );
    if (!updatedSettings) {
      throw new Error("Settings document not found.");
    }
    return updatedSettings;
  } catch (error) {
    console.error("Error updating settings:", error.message);
    throw new Error(error.message);
  }
};

// Återställ inställningar till standardvärden
const resetSettings = async () => {
  const defaultSettings = {
    base_price: 10,
    price_per_minute: 2.5,
    start_discount: 5,
    fee_amount: 15,
    rules: {
      free_parking_duration: 15,
      fine_for_wrong_parking: 50,
      cancellation_policy: "No charge if canceled within 5 minutes",
    },
  };

  try {
    const resetSettings = await Setting.findOneAndUpdate(
      {}, // Tomt filter för att matcha det enda dokumentet
      { $set: defaultSettings },
      { new: true, upsert: true }, // Skapa dokumentet om det inte finns
    );
    return resetSettings;
  } catch (error) {
    console.error("Error resetting settings:", error.message);
    throw new Error(error.message);
  }
};

// Exportera funktioner
module.exports = {
  getSettings,
  updateSettings,
  resetSettings,
};
