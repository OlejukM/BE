const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplySchema = new Schema({
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    detail: {
        type: Schema.Types.ObjectId,
        ref: 'Detail',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Supply = mongoose.model('Supply', SupplySchema);

module.exports = Supply;