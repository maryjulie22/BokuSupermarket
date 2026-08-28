// const multer = require('multer');
// const {CloudinaryStorage}= require('multer-storage-cloudinary');
// const cloudinary = require('../Config/cloudinary');


// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//     folder: 'BokuSupermarket', // Specify the folder name in Cloudinary
//     allowed_formats: ['jpg', 'png', 'jpeg','gif'], // Specify allowed file formats
//     transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional: Resize the image
// },
// });

// const upload = multer({ storage: storage });
// module.exports = upload;

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../Config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'BokuSupermarket'
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;