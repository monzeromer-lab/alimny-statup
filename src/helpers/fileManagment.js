const multer = require("multer"),
    path = require("path"),
    fileSystem = require("fs")

const image_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.normalize('./public/images'))
    },
    filename: function (req, file, cb) {
        cb(null, "IMG-" + Date.now() + path.extname(file.originalname))
    }
})

const file_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.normalize('./public/files'))
    },
    filename: function (req, file, cb) {
        cb(null, "FILE-" + Date.now() + path.extname(file.originalname))
    }
})

const video_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.normalize('./public/videos'))
    },
    filename: function (req, file, cb) {
        cb(null, "VID-" + Date.now() + path.extname(file.originalname))
    }
})

module.exports.deleteFile = function (dir) {
    return new Promise((resolve, reject) => {
        fileSystem.unlink(dir, function(err) {
            if(err && err.code == 'ENOENT') {
                resolve("unavailable")
            } else if (err) {
                throw new Error("Error occurred while trying to remove file")
            } else {
                resolve("removed")
            }
        });
    });

}

module.exports.upload_video = multer({
    storage: video_storage
})

module.exports.upload_file = multer({
    storage: file_storage,
    limits: {
        fileSize: 10000000 // 10mb
    }
})

module.exports.upload_image = multer({
    storage: image_storage,
    fileFilter: (req, file, callback) => {
        let ext
        ext = path.extname(file.originalname);
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' && file.fieldname === "profile") {
            callback(null, true)
        } else {
            return callback(new Error('only images are allowed png or jpg or jpeg '))
        }

    },
    limits: {
        fileSize: 2000000 // 2mb
    }
})