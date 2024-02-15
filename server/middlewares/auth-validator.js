const { body } = require('express-validator');
const User = require('../models/User');

exports.signupValidator = [
    body("fullname")
        .notEmpty().withMessage("Fullname is required")
        .isAlpha().withMessage("Fullname must be alphabets only")
        .isLength({ min: 3 }).withMessage("Fullname must be at least 3 characters long"),
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email address")
        .custom(async (email) => {
            // check if email is already in use
            const user = await User.findOne({ email });
            if (user) {
                return Error("Email is already in use");
            }
        }),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("profile_picture")
        .custom((profile_picture, { req }) => {
            if (!req.file) {
                throw new Error("Profile picture is required");
            }
            return true;
        })
]