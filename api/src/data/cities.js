/**
 * src/data/cities.js
 * Ansvar:
 * - Abstrahera all interaktion med datakällan (mockdata eller databas) för Cities-tabellen.
 * 
 * Uppgifter: 
 * - Hanterar datalogik för Cities, inklusive:
 *   - Hämta data.
 *   - Lägga till ny data.
 *   - Uppdatera eller ta bort data.
 * - Skapar enhetliga funktioner som används av rutterna.
 * 
 * Syfte:
 * - Tillhandahåller ett enda lager för datalagring, vilket förenklar hantering och utveckling.
 * - Separera datalagring från API-logiken för att hålla koden modulär och lätt att ändra.
 */
const City = require('../models/cityModel')
const mockDatabase = require('../models/mockDatabase');

const useMockData = process.env.USE_MOCKDATA === 'true' || false;

// Hämta alla städer
const getAllCities = async () => {
    const cities = await City.find()
    // console.log("Result", cities)
    if (!cities) throw new Error("Faild to fetch cities")
    return cities
};

// Hämta en specifik stad
const getCityById = async (id) => {

    const city = await City.findById(id)
    return city
};

// Hämta en specifik stad
const getCityByQuery = async (query) => {

  const city = await City.findOne(query)
  return city
};

// Lägg till en ny stad
const addCity = async (city) => {

    const newCity = new City(city)
    console.log('Added city', newCity)
    return await newCity.save()
};

// Uppdatera en stad
const updateCity = async (id, cityData) => {
    const updatedCity = await City.findOneAndUpdate(
        { city_id: id },
        cityData,
        { new: true, runValidators: true }
    );
    if (!updatedCity) throw new Error('User not found');
    return updatedCity;
};

// Ta bort en stad
const deleteCity = async (id) => {
    const deletedCity = await City.findOneAndDelete({ city_id: id });
    if (!deletedCity) throw new Error('User not found');
    console.log(`City has been remove`)
    return deletedCity;

    // await City.deleteOne({ _id: id })
    // console.log(`City ${id} has been remove`)
    // return `City ${id} has been remove`
};

module.exports = {
    getAllCities,
    getCityById,
    addCity,
    updateCity,
    deleteCity,
    getCityByQuery
};
