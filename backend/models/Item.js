// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes whitespace from both ends of a string
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Price cannot be negative
    },
    quantity: {
        type: Number,
        required: true,
        min: 0, // Quantity cannot be negative
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Item model from the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
