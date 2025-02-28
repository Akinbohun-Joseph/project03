const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({

    idNumber: {
        type: String, required: true
    },
    address: {
         type: String, required: true
         },
    user: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true
     }, // One-to-one with User

     
},
{
    timestamps: true
}
);

module.exports = mongoose.model('KYCModel', kycSchema);
