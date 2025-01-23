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

const userData = require("../data/users");

// Hämta alla användare
const getAllUsers = async () => {
  const users = await userData.getAllUsers();
  if (users.length === 0) {
    throw new Error("No users found in the database.");
  }
  return users;
};

// Hämta en specifik användare
const getUserById = async (id) => {
  const user = await userData.getUserById(id);
  if (!user) {
    throw new Error(`User with ID ${id} not found.`);
  }
  return user;
};

// Uppdatera en användare
const updateUser = async (id, userDataToUpdate) => {
  try {
    // Kontrollera att namn, om det anges, inte är tomt
    if (userDataToUpdate.name && userDataToUpdate.name.trim() === "") {
      throw new Error("Name cannot be empty");
    }

    // Kontrollera att rollen, om den anges, är giltig
    if (userDataToUpdate.role) {
      const validRoles = ["admin", "customer"];
      if (!validRoles.includes(userDataToUpdate.role)) {
        throw new Error(
          `Invalid role: ${userDataToUpdate.role}. Valid roles are: ${validRoles.join(", ")}`,
        );
      }
    }

    // Kontrollera att kontosaldo, om det anges, inte blir negativt
    if (
      userDataToUpdate.account_balance !== undefined &&
      userDataToUpdate.account_balance < 0
    ) {
      throw new Error("Account balance cannot be negative");
    }

    // Kontrollera att betalningsmetod är giltig
    if (userDataToUpdate.preferred_payment_method) {
      const validMethods = ["prepaid", "autogiro"];
      if (!validMethods.includes(userDataToUpdate.preferred_payment_method)) {
        throw new Error(
          `Invalid payment method: ${userDataToUpdate.preferred_payment_method}. Valid methods are: ${validMethods.join(", ")}`,
        );
      }

      // Om autogiro används, säkerställ att autogirodetaljer anges
      if (
        userDataToUpdate.preferred_payment_method === "autogiro" &&
        (!userDataToUpdate.autogiro_details ||
          typeof userDataToUpdate.autogiro_details !== "string" ||
          userDataToUpdate.autogiro_details.trim() === "")
      ) {
        throw new Error(
          "Autogiro details are required for the autogiro payment method.",
        );
      }
    }

    // Uppdatera användaren
    const updatedUser = await userData.updateUser(id, userDataToUpdate);
    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};

// Ta bort en användare
const deleteUser = async (id) => {
  const deletedUser = await userData.deleteUser(id);
  if (!deletedUser) {
    throw new Error(`User with ID ${id} not found.`);
  }
  console.log(`User with ID ${id} successfully deleted.`);
  return deletedUser;
};

// Exportera alla funktioner
module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
