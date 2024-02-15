const multer = require('multer');

const multerStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.match(/^image\/(png|jpeg|gif)$/)) {
        cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'),false);
    } else {
        cb(null,true);
    }
}

const fileChecker = multer({
    storage: multerStorage,
    fileFilter
});

module.exports = fileChecker