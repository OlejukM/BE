const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceHistorySchema = new Schema({
    oldPrice: {
        type: Number,
        required: true
    },
    newPrice: {
        type: Number,
        required: true
    },
    changeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const DetailSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    partNumber: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    priceChangeHistory: [PriceHistorySchema] // Array of PriceHistorySchema objects
});

DetailSchema.pre('save', function(next) {
    const detail = this;

    if (detail.isModified('price')) {
        const priceHistoryEntry = {
            oldPrice: detail.price,
            newPrice: detail.price,
            changeDate: new Date()
        };

        detail.priceChangeHistory.push(priceHistoryEntry);

    }

    next();
});

const Detail = mongoose.model('Detail', DetailSchema);

module.exports = Detail;
