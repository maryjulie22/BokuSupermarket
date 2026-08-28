const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const productSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
size: {
    type: String,
    required: true
},
description:{
    type: String,
    required: true
},
price:{
    type: Number,
    required: true
},
quantity:{
    type: Number,
    required: true
 },
 image: {
    type: String,
    required: false
  }
},
{timestamps: true}

);

//create model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;