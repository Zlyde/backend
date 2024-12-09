/**
 * src/services/userService.js
 * Lager: "Service Layer"
 * 
 * Funktioner:
 * - Hämta alla användare
 * - Hämta detaljer om en specifik användare
 * - Lägga till en användare
 * - Uppdatera en användare
 * - Radera en användare
 */

const userData = require('../data/users');

// Hämta alla användare
const getAllUsers = async () => {
    const users = await userData.getAllUsers();
    if (users.length === 0) {
        throw new Error('No users found');
    }
    return users;
};

// Hämta en specifik användare
const getUserById = async (id) => {
    const user = await userData.getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

// Lägg till en ny användare
const addUser = async (user) => {
    return await userData.addUser(user);
};

// Uppdatera en användare
const updateUser = async (id, userDataToUpdate) => {
    const updatedUser = await userData.updateUser(id, userDataToUpdate);
    if (!updatedUser) {
        throw new Error('User not found');
    }
    return updatedUser;
};

// Ta bort en användare
const deleteUser = async (id) => {
    const deletedUser = await userData.deleteUser(id);
    if (!deletedUser) {
        throw new Error('User not found');
    }
    return deletedUser;
};

// Exportera alla funktioner
module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};
