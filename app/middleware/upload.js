const util = require("util");
const multer = require("multer");
var path = require('path');
const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './app/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return callback(new Error('Only csv are allowed'))
        }
        callback(null, true)
    },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;