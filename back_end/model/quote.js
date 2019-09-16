var mongoose = require('mongoose');
var QuoteSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    venderID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    freight: {
        type: Number,
        required: true,
    },
    cargoReadyDate: {
        type: Date,
        default: null,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    cargoDetails: {
        type: String,
        required: true,
    },
    submittedBy: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: 1,
    }
});
var Quote = mongoose.model('Quote', QuoteSchema);
module.exports = Quote;