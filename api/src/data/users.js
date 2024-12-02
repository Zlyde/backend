/**
 * src/data/users.js
 * Ansvar:
 * - Abstrahera all interaktion med datakällan (mockdata eller databas) för alla tabeller.
 * 
 * Uppgifter: 
 * - Hanterar datalogik för alla tabeller, inklusive:
 *   - Hämta data.
 *   - Lägga till ny data.
 *   - Uppdatera eller ta bort data (om det behövs senare).
 * - Skapar enhetliga funktioner som används av rutterna.
 * 
 * Syfte:
 * - Tillhandahåller ett enda lager för datalagring, vilket förenklar hantering och utveckling.
 * - Separera datalagring från API-logiken för att hålla koden modulär och lätt att ändra.
 * 
 */

const mockDatabase = require('../models/mockDatabase');

// Hämta alla cyklar
const getAllUsers = async () => {
    return mockDatabase.users; // Mockad data
};

// Hämta en specifik cykel
const getUserById = async (id) => {
    const user = mockDatabase.users.find((u) => u.user_id === parseInt(id));
    if (!user) throw new Error('User not found');
    return user;
};

// Lägg till en ny användare
const addUser = (user) => {
    const newUser = {
        ...user, // Kopiera all inkommande data
        user_id: mockDatabase.users.length + 1, // Generera ett nytt ID
    };
    mockDatabase.users.push(newUser);
    return newUser;
};

// Uppdatera en användare
const updateUser = async (id, userData) => {
    const index = mockDatabase.users.findIndex((user) => user.users_id === parseInt(id));
    if (index === -1) return null;
    mockDatabase.user[index] = { ...mockDatabase.users[index], ...userData };
    return mockDatabase.users[index];
};

// Ta bort en cykel
const deleteUser = async (id) => {
    const index = mockDatabase.users.findIndex((user) => user.user_id === parseInt(id));
    if (index === -1) return null;
    return mockDatabase.users.splice(index, 1)[0];
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};
