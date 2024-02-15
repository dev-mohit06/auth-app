const mongoose = require('mongoose');
require('dotenv').config();


let dbInstance = undefined;

const connect = async () => {
    try {
        dbInstance = await mongoose.connect(`${process.env.DB_COONNECTION_STRING}`, {
            autoIndex: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

const getDbInstance = async () => {
    if (!dbInstance) {
        dbInstance = await connect();
    }
    return dbInstance;
}

module.exports = {
    connect,
    getDbInstance
}