const mongoose = require('mongoose');

require('dotenv').config();
const uri = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Successfully connected to database');
    } catch (error) {
        console.error('MongoDB connection error: ', error);
    }
};

module.exports = connectDB;