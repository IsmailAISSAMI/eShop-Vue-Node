const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type:String,
        unique: true
    },
    priceHT: Number,
    description: String,
    category: String     
})

module.exports = mongoose.model('Product', productSchema);