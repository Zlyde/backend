/**
 * src/data/users.js
 */

const User = require('../models/userModel');

// Hämta alla användare
const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw new Error(error.message);
    }
};

// Hämta en specifik användare baserat på userID
const getUserById = async (id) => {
    try {
        return await User.findOne({ user_id: id });
    } catch (error) {
        console.error(`Error fetching user by ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

// Hämta en användare baserat på GitHub ID
const getUserByGithubId = async (githubId) => {
    try {
        return await User.findOne({ githubId }); // Returnerar null om ingen användare hittas
    } catch (error) {
        console.error(`Error fetching user by GitHub ID ${githubId}:`, error.message);
        throw new Error(error.message);
    }
};

// Hämta en användare baserat på e-post
const getUserByEmail = async (email) => {
    try {
        return await User.findOne({ email }); // Returnerar null om ingen match
    } catch (error) {
        console.error(`Error fetching user by email ${email}:`, error.message);
        throw new Error(error.message);
    }
};

// // Lägg till en ny användare
// const addUser = async (userData) => {
//     try {
//         const newUser = new User(userData);
//         return await newUser.save();
//     } catch (error) {
//         console.error("Error adding user:", error.message);
//         throw new Error(error.message);
//     }
// };

// Uppdatera en användare
const updateUser = async (id, userData) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { user_id: id }, // Anger vilket dokument som ska uppdateras
            { $set: userData }, // Anger vad som ska uppdateras
            { new: true, runValidators: true } // Returnera det uppdaterade dokumentet och kör validering
        );
        if (!updatedUser) throw new Error('User not found');
        return updatedUser;
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

// Ta bort en användare
const deleteUser = async (id) => {
    try {
        const deletedUser = await User.findOneAndDelete({ user_id: id });
        if (!deletedUser) throw new Error('User not found');
        return deletedUser;
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error.message);
        throw new Error(error.message);
    }
};

// Exportera funktioner
module.exports = {
    getAllUsers,
    getUserById,
    getUserByGithubId,
    getUserByEmail,
    // addUser,
    updateUser,
    deleteUser
};