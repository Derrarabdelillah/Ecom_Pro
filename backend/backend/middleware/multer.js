const multer = require('multer');

const storage = multer.diskStorage({
    filename: function(req,file,callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max per file
        files: 4 // Max 4 files per upload
    }
});

module.exports = upload;