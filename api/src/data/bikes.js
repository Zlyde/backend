/**
 * src/data/bikes.js
 */

const Bike = require('../models/bikeModel');

// Hämta alla cyklar
const getAllBikes = async () => {
    const bikes = await Bike.find();
    if (!bikes.length) throw new Error('No bikes found');
    return bikes;
};

// Hämta en specifik cykel baserat på bike_id
const getBikeById = async (id) => {
    const bike = await Bike.findOne({ bike_id: id });
    if (!bike) throw new Error('Bike not found');
    return bike;
};

// Lägg till en ny cykel
const addBike = async (bikeData) => {
    const newBike = new Bike(bikeData);
    return await newBike.save();
};

// Uppdatera en cykel
const updateBike = async (id, bikeData) => {
    const updatedBike = await Bike.findOneAndUpdate(
        { bike_id: id },
        bikeData,
        { new: true, runValidators: true }
    );
    if (!updatedBike) throw new Error('Bike not found');
    return updatedBike;
};

// Ta bort en cykel
const deleteBike = async (id) => {
    const deletedBike = await Bike.findOneAndDelete({ bike_id: id });
    if (!deletedBike) throw new Error('Bike not found');
    return deletedBike;
};

module.exports = {
    getAllBikes,
    getBikeById,
    addBike,
    updateBike,
    deleteBike
};