/**
 * src/data/bikes.js
 */

const Bike = require('../models/bikeModel');

// Hämta alla cyklar
const getAllBikes = async () => {
    try {
        const bikes = await Bike.find();
        return bikes;
    } catch (error) {
        console.error("Error fetching bikes:", error.message);
        throw new Error(error.message);
    }
};

// Hämta en specifik cykel baserat på bike_id
const getBikeById = async (id) => {
    try {
        const bike = await Bike.findOne({ bike_id: id });
        return bike;
    } catch (error) {
        console.error(`Error fetching bike by ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

// Lägg till en ny cykel
const addBike = async (bikeData) => {
    try {
        const newBike = new Bike(bikeData);
        return await newBike.save();
    } catch (error) {
        console.error("Error adding bike:", error.message);
        throw new Error(error.message);
    }
};

// Uppdatera en cykel
const updateBike = async (id, bikeData) => {
    try {
        const updatedBike = await Bike.findOneAndUpdate(
            { bike_id: id },
            { $set: bikeData },
            { new: true, runValidators: true }
        );
        if (!updatedBike) throw new Error(`Bike with ID ${id} not found`);
        return updatedBike;
    } catch (error) {
        console.error(`Error updating bike with ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

// Ta bort en cykel
const deleteBike = async (id) => {
    try {
        const deletedBike = await Bike.findOneAndDelete({ bike_id: id });
        if (!deletedBike) throw new Error(`Bike with ID ${id} not found`);
        return deletedBike;
    } catch (error) {
        console.error(`Error deleting bike with ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

module.exports = {
    getAllBikes,
    getBikeById,
    addBike,
    updateBike,
    deleteBike
};