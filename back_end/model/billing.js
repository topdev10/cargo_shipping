var mongoose = require('mongoose');
var BillingSchema = new mongoose.Schema({
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
    billDate: {
        type: Date,
        required: true,
        default: new Date(),
    },
    status: {
        type: Number,
        required: true,
        default: 1,
    }
});
var Billing = mongoose.model('Billing', BillingSchema);
module.exports = Billing;