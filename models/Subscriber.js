const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const subscriberSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});


const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
