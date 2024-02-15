const routes = require('express').Router();
const { signup } = require('../controllers/authcontrollers');
const { signupValidator } = require('../middlewares/auth-validator');
const User = require('../models/User');
const fileChecker = require('../utils/file-handler.util');


routes.post('/signup',fileChecker.single("profile_picture"),signupValidator,signup);
// routes.post('/signin');

module.exports = routes;