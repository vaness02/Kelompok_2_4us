const mongoose = require('mongoose')

const productSchema = mongoose.Schema ({
    imagePath: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('product', productSchema, 'shop')