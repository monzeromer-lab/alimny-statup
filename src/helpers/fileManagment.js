const multer = require("multer"),
    path = require("path"),
    fileSystem = require("fs")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.normalize('./src/public/images'));
    },
    filename: function (req, file, cb) {
        cb(null, "IMG-" + Date.now() + path.extname(file.originalname));
    }
});

module.exports.user_profile = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        let ext

        ext = path.extname(file.originalname);
        if (ext !== '.png' || ext !== '.jpg' || ext !== '.jpeg') {
            return callback(new Error('only images are allowed png or jpg or jpeg'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1000000 // 1mb
    }
});

module.exports.deleteFile = function (dir) {
    return new Promise((resolve, reject) => {
        fileSystem.unlink(dir, (err) => {
            if (err) {
                reject(err)
            }
            resolve("done")
        })
    });

}