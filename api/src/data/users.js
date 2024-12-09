/**
 * src/data/users.js
 * Ansvar:
 * - Abstrahera all interaktion med datakällan (mockdata eller databas).
 * 
 * Syfte:
 * - Tillhandahåller ett enda lager för datalagring, vilket förenklar hantering och utveckling.
 * - Separera datalagring från API-logiken för att hålla koden modulär och lätt att ändra.
 */

const User = require('../models/userModel');
const mockDatabase = require('../models/mockDatabase');

// För att använda mockdata, lägg till denna rad till .env filen:
// USE_MOCKDATA=true

// Kontrollera om mockdata ska användas, false by default om inget värde angetts i .env.
const useMockData = process.env.USE_MOCKDATA === 'true' || false;

// Hämta alla användare
const getAllUsers = async () => {
    if (useMockData) return mockDatabase.users;  // Mockad data
    const users = await User.find();  // MongoDB
    if (!users.length) throw new Error('No users found');
    return users;
};

// Hämta en specifik användare
const getUserById = async (id) => {
    if (useMockData) {
        const user = mockDatabase.users.find((u) => u.user_id === parseInt(id));
        if (!user) throw new Error('User not found');
        return user;
    }
    const user = await User.findOne({ user_id: id });  // MongoDB
    if (!user) throw new Error('User not found');
    return user;
};

// Lägg till en ny användare
const addUser = async (userData) => {
    if (useMockData) {
        const newUser = {
            ...userData, 
            user_id: mockDatabase.users.length + 1,
        };
        mockDatabase.users.push(newUser);
        return newUser;
    }
    const newUser = new User(userData);  // MongoDB
    return await newUser.save();
};

// Uppdatera en användare
const updateUser = async (id, userData) => {
    if (useMockData) {
        const index = mockDatabase.users.findIndex((user) => user.user_id === parseInt(id));
        if (index === -1) return null;
        mockDatabase.users[index] = { ...mockDatabase.users[index], ...userData };
        return mockDatabase.users[index];
    }
    const updatedUser = await User.findOneAndUpdate(
        { user_id: id },
        userData,
        { new: true, runValidators: true }
    );
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
};

// Ta bort en användare
const deleteUser = async (id) => {
    if (useMockData) {
        const index = mockDatabase.users.findIndex((user) => user.user_id === parseInt(id));
        if (index === -1) return null;
        return mockDatabase.users.splice(index, 1)[0];
    }
    const deletedUser = await User.findOneAndDelete({ user_id: id });
    if (!deletedUser) throw new Error('User not found');
    return deletedUser;
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};