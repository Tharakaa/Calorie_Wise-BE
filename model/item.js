const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    score: {
        type: Number
    },
    calorie: {
        type: Number
    },
    protein: {
        type: Number
    },
    fat: {
        type: Number
    },
    carbohydrate: {
        type: Number
    },
    fiber: {
        type: Number
    },
    calcium: {
        type: Number
    },
})

exports.Item = mongoose.model('Item', itemSchema);
