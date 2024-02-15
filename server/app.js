const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { connect } = require('./utils/db.util');
const User = require('./models/User');
const router = require('./routes/index'); 
const error_handler = require('./utils/error-handler.util');

const app = express();

const startServer = async () => {
    try {
        await connect();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use('/api',router);
        app.use(error_handler);
        app.listen(process.env.APP_PORT, process.env.APP_HOST, console.log(`Server is running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`));
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

startServer();