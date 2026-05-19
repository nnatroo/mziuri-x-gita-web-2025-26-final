const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }

}, {timestamps: true});

userSchema.pre('save', async function () {
    try {
        if (!this.isModified('password')) return;
        this.password = await bcrypt.hash(this.password, 10);

    } catch (error) {
        console.log(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;