const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    HasAdminAccess:{
        type: Boolean,
        default: false
    },
    phone:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['superadmin','storekeeper','salesperson','user'],
        default: 'user'
    },
},
{timestamps: true}

);

//create model
const User = mongoose.model('User', userSchema);
module.exports = User;