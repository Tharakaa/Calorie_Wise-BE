const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    minCalorie: {
        type: Number,
        required: true,
    },
    maxCalorie: {
        type: Number,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
})

exports.Category = mongoose.model('categories', categorySchema);
