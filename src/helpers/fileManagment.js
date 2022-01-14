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

module.exports.user_profile = multer({
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
        fileSize: 1000000 // 1mb
    }
})

module.exports.deleteFile = function (dir) {
    return new Promise((resolve, reject) => {
        fileSystem.unlink(dir, (err) => {
            if (err) {
                throw new Error(err)
            }
            resolve("done")
        })
    });

}