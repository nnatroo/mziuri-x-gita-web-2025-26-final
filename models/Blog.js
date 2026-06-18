const mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 200,
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000,
        required: true
    },
    message: {
        type: String,
        trim: true,
        maxlength: 5000,
        required: true
    },
    imageUrl: {
        type: String,
        trim: true,
        default: '/images/post-image.png'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;