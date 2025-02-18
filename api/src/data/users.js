/**
 * src/data/users.js
 * Lager: "Data Layer"
 * 
 * Funktioner:
 * - Hämta alla användare
 * - Hämta en specifik användare baserat på userID
 * - Hämta en användare baserat på GitHub ID
 * - Hämta en användare baserat på e-post
 * - Uppdatera en användare
 * - Ta bort en användare
 */

const User = require("../models/userModel");

// Hämta alla användare
const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw new Error(error.message);
  }
};

const addUser = async (userData) => {
  try {
    const newUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    console.error("Error adding bike:", error.message);
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
    console.error(
      `Error fetching user by GitHub ID ${githubId}:`,
      error.message,
    );
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

const deleteUsersWithoutName = async () => {
  try {
    // Hitta och ta bort användare utan namn
    const result = await User.deleteMany({ name: { $in: [null, ""] } });
    console.log(`${result.deletedCount} users deleted without a name.`);
    return result;
  } catch (error) {
    console.error("Error deleting users without a name:", error.message);
    throw new Error(error.message);
  }
};

// Uppdatera en användare
const updateUser = async (id, userData) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_id: id }, // Anger vilket dokument som ska uppdateras
      { $set: userData }, // Anger vad som ska uppdateras
      { new: true, runValidators: true }, // Returnera det uppdaterade dokumentet och kör validering
    );
    if (!updatedUser) throw new Error("User not found");
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
    if (!deletedUser) throw new Error("User not found");
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
  updateUser,
  deleteUser,
  addUser,
  deleteUsersWithoutName
};

deleteUsersWithoutName()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });
