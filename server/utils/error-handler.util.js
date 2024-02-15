const status_codes = require('http-status-codes');

const error_handler = (err,req,res,next) => {
    console.error(err);
    res.status(status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
        error: err.message,
    });
}

module.exports = error_handler;