const multer = require('multer');
const {CloudinaryStorage}= require('multer-storage-cloudinary');
const cloudinary = require('../Config/cloudinary');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: 'BokkuSupermarket', // Specify the folder name in Cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg'], // Specify allowed file formats
    },
});

const upload = multer({ storage: storage });
