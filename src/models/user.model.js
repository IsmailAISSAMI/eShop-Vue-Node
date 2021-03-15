const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    lastName: {
        type: String,
        lowercase: true,
        trim: true
    },
    firstName: {
        type: String,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    address: {
        street: {
            type: String,
            lowercase: true,
        },
        city:{
            type: String,
            lowercase: true,
        },
        country: {
            type: String,
            uppercase: true,
        },
        zip: Number //CP
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type:Boolean,
        default: 'false'
    },
    orders: [{
        type:Schema.Types.ObjectId, ref:'Order'
    }]
})

module.exports = mongoose.model('User', userSchema);