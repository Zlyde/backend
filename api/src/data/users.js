/**
 * src/data/users.js
 */

const User = require('../models/userModel');

// Hämta alla användare
const getAllUsers = async () => {
    const users = await User.find();
    if (!users.length) throw new Error('No users found');
    return users;
};

// Lägg till en ny användare
const addUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

// Hämta en specifik användare
const getUserById = async (id) => {
    const user = await User.findOne({ user_id: id });
    if (!user) throw new Error('User not found');
    return user;
};

// Uppdatera en användare
const updateUser = async (id, userData) => {
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
    const deletedUser = await User.findOneAndDelete({ user_id: id });
    if (!deletedUser) throw new Error('User not found');
    return deletedUser;
};

// Exportera funktioner
module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};