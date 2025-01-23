/**
 * src/services/settingService.js
 * Lager: "Service Layer"
 *
 * Funktioner:
 * - Hämta inställningar
 * - Uppdatera inställningar
 * - Återställ inställningar till standardvärden
 */

const settingData = require("../data/setting");

// Hämta inställningar
const getSettings = async () => {
  const settings = await settingData.getSettings();
  if (!settings) {
    throw new Error("Settings document not found.");
  }
  return settings;
};

// Uppdatera inställningar
const updateSettings = async (settingsToUpdate) => {
  try {
    // Validera base_price
    if (
      settingsToUpdate.base_price !== undefined &&
      settingsToUpdate.base_price < 0
    ) {
      throw new Error("Base price cannot be negative.");
    }

    // Validera price_per_minute
    if (
      settingsToUpdate.price_per_minute !== undefined &&
      settingsToUpdate.price_per_minute < 0
    ) {
      throw new Error("Price per minute cannot be negative.");
    }

    // Validera rules, om de anges
    if (settingsToUpdate.rules) {
      const { free_parking_duration, fine_for_wrong_parking } =
        settingsToUpdate.rules;
      if (free_parking_duration !== undefined && free_parking_duration < 0) {
        throw new Error("Free parking duration cannot be negative.");
      }
      if (fine_for_wrong_parking !== undefined && fine_for_wrong_parking < 0) {
        throw new Error("Fine for wrong parking cannot be negative.");
      }
    }

    // Uppdatera inställningarna
    const updatedSettings = await settingData.updateSettings(settingsToUpdate);
    return updatedSettings;
  } catch (error) {
    console.error("Error updating settings:", error.message);
    throw error;
  }
};

// Återställ inställningar till standardvärden
const resetSettings = async () => {
  try {
    const resetSettings = await settingData.resetSettings();
    console.log("Settings have been reset to default values.");
    return resetSettings;
  } catch (error) {
    console.error("Error resetting settings:", error.message);
    throw error;
  }
};

// Exportera alla funktioner
module.exports = {
  getSettings,
  updateSettings,
  resetSettings,
};
