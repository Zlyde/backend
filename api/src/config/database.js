// src/config/database.js

const mongoose = require('mongoose');
require('dotenv').config(); // Laddar miljövariabler från .env-filen

const getDb = async () => {
    // DSN för MongoDB Atlas
    const dsn = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@${process.env.CLUSTER_URL}/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`;

    try {
        // Anslut till databasen med Mongoose
        await mongoose.connect(dsn, {
            dbName: process.env.DB_NAME,
        });

        // const City = mongoose.model('Station');
    
        // City.collection.dropIndex('charging_station_id_1', (err, result) => {
        //   if (err) {
        //     console.log('Error dropping index:', err);
        //   } else {
        //     console.log('Index dropped successfully:', result);
        //   }
        // });

        console.log('Successfully connected to the database.');
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Avsluta vid fel
    }
};

module.exports = { getDb };