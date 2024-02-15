const asyncWrapper = require('../utils/async-wrapper.util');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const status_codes = require('http-status-codes')
const ApiResponse = require('../utils/api-response.util');
const { putProfilePicture } = require('../utils/s3-handler.util');

exports.signup = asyncWrapper(async (req, res, next) => {

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(status_codes.StatusCodes.BAD_REQUEST).json({ errors: result.mapped() });
    }

    const { username, email, password } = req.body;
    const profile_picture = `${Date.now()}-${req.file.originalname}.${req.file.mimtype}`;

    let url = await putProfilePicture(profile_picture, req.body.mimtype);

    const user = new User({
        username,
        email,
        password,
        profile_picture
    });



    await user.save();

    res.status(status_codes.StatusCodes.CREATED).json(
        new ApiResponse(
            status_codes.StatusCodes.CREATED,
            {
                profile_picture_url: url
            },
            "user created successfully"
        )
    );
    
});