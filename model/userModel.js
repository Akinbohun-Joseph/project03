const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    gmail: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        country:{
            type: String,
        },
        phoneNuumber: {
            type: String,
        },
        street:{
            type: String,
        },
        bio: {
            type: String,
        }
    }
},
    {
        timestamps: true
    }

)
module.exports = mongoose.model('user', userModel)