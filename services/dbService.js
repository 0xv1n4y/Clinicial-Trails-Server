const mongoose = require('mongoose');
require('dotenv').config();

const connectMongodb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONDODB_URL);
        console.log(`Mongodb Connected: ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure 
    }
}

module.exports = { connectMongodb }