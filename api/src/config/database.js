// src/config/database.js

const mongo = require('mongodb').MongoClient;
require('dotenv').config(); // Laddar miljövariabler från .env-filen

const database = {
    getDb: async function getDb(collectionName) {
        // DSN för MongoDB Atlas
        let dsn = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@${process.env.CLUSTER_URL}/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`;

        // Om NODE_ENV är 'test', använd lokal testdatabas
        if (process.env.NODE_ENV === 'test') {
            dsn = 'mongodb://localhost:27017/test';
        }

        // Anslut till databasen
        const client = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Hämta databasinstansen
        const db = await client.db(process.env.DB_NAME);

        // Hämta specifik collection om angiven
        const collection = collectionName ? await db.collection(collectionName) : null;

        // Returnera databas, collection och klient
        return {
            db: db,
            collection: collection,
            client: client,
        };
    },
};

module.exports = database;