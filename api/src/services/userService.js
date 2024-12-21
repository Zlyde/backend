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
        throw new Error('No users found in the database.');
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

// // Lägg till en ny användare
// const addUser = async (user) => {
//     try {
//         // Kontrollera att e-post alltid anges
//         if (!user.email) {
//             throw new Error('Email is required');
//         }
        
//         // Kontrollera att e-post har rätt format
//         const emailRegex = /\S+@\S+\.\S+/;
//         if (!emailRegex.test(user.email)) {
//             throw new Error('Email format is invalid');
//         }

//         // Kontrollera att e-post är unik
//         const existingUser = await userData.getUserByEmail(user.email);
//         if (existingUser) {
//             throw new Error(`Email "${user.email}" is already registered.`);
//         }

//         // Kontrollera att antingen lösenord eller OAuth-ID finns
//         if (!user.password && !user.githubId) {
//             throw new Error('Either password or OAuth ID is required');
//         }

//         // Kontrollera lösenordets längd, om det angetts
//         if (user.password && user.password.length < 8) {
//             throw new Error('Password must be at least 8 characters long');
//         }

//         // Kontrollera att githubId, om det anges, är unikt
//         if (userDataToUpdate.githubId) {
//             const existingUser = await userData.getUserByGithubId(userDataToUpdate.githubId);
//             if (existingUser && existingUser.user_id !== id) {
//                 throw new Error(`GitHub ID "${user.githubId}" is already registered.`);
//             }
//         }

//         // Sätt kontosaldo till 0 vid skapandet av ny användare
//         user.account_balance = 0;

//         // Sätt roll till 'customer' om ingen roll anges
//         if (!user.role) {
//             user.role = 'customer';
//         }
        
//         // Kontrollera att rollen är giltig
//         const validRoles = ['admin', 'customer'];
//         if (!validRoles.includes(user.role)) {
//             throw new Error(`Invalid role: ${user.role}. Valid roles are: ${validRoles.join(', ')}`);
//         }

//         // Lägg till användaren
//         const newUser = await userData.addUser(user);
//         console.log(`User with ID ${newUser.user_id} successfully added.`);
//         return newUser;
//     } catch (error) {
//         console.error("Error adding user:", error.message);
//         throw error;
//     }
// };

// Uppdatera en användare
const updateUser = async (id, userDataToUpdate) => {
    try {
        // // Kontrollera att e-post, om den anges, har rätt format och är unik
        // if (userDataToUpdate.email) {
        //     const emailRegex = /\S+@\S+\.\S+/;
        //     if (!emailRegex.test(userDataToUpdate.email)) {
        //         throw new Error('Email format is invalid');
        //     }

        //     // Kontrollera att e-posten är unik om den ändras
        //     const emailConflict = await userData.getUserByEmail(userDataToUpdate.email);
        //     if (emailConflict && emailConflict.user_id !== id) {
        //         throw new Error(`Email '${userDataToUpdate.email}' is already registered to another user`);
        //     }
        // }

        // // Kontrollera att githubId, om det anges, är unikt
        // if (userDataToUpdate.githubId) {
        //     const githubConflict = await userData.getUserByGithubId(userDataToUpdate.githubId);
        //     if (githubConflict && githubConflict.user_id !== id) {
        //         throw new Error(`GitHub ID '${userDataToUpdate.githubId}' is already registered to another user`);
        //     }
        // }

        // // Kontrollera lösenordets längd, om det anges
        // if (userDataToUpdate.password && userDataToUpdate.password.length < 8) {
        //     throw new Error('Password must be at least 8 characters long');
        // }

        // Kontrollera att namn, om det anges, inte är tomt
        if (userDataToUpdate.name && userDataToUpdate.name.trim() === '') {
            throw new Error('Name cannot be empty');
        }

        // Kontrollera att rollen, om den anges, är giltig
        if (userDataToUpdate.role) {
            const validRoles = ['admin', 'customer'];
            if (!validRoles.includes(userDataToUpdate.role)) {
                throw new Error(`Invalid role: ${userDataToUpdate.role}. Valid roles are: ${validRoles.join(', ')}`);
            }
        }

        // Kontrollera att kontosaldo, om det anges, inte blir negativt
        if (userDataToUpdate.account_balance !== undefined && userDataToUpdate.account_balance < 0) {
            throw new Error('Account balance cannot be negative');
        }

        // Uppdatera användaren
        const updatedUser = await userData.updateUser(id, userDataToUpdate);
        if (!updatedUser) {
            throw new Error('User not found');
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
    // addUser,
    updateUser,
    deleteUser
};
