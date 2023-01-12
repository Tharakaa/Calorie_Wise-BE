const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'items'
        }
    ]
})

exports.User = mongoose.model('users', userSchema);
