var mongoose = require('mongoose');
var QuoteSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    venderID: {
        type: String,
        required: true,
    },
    submittedBy: {
        type: String,
        required: true,
    },
    shipmentName: {
        type: String,
        required: true,
    },
    freightMethod: {
        type: Number,
        required: true,
    },
    shipmentType: {
        type: Number,
        required: true,
    },
    containerType: {
        type: Number,
        required: true,
    },
    incoterms: {
        type: Number,
        required: true,
    },
    originAddress: {
        type: String,
        required: true,
    },
    originPort: {
        type: Number,
        required: true,
    },
    pickupReadyDate: {
        type: Date,
        required: true,
    },
    delieverToLocation: {
        type: Boolean,
        required: true,
    },
    destAddress: {
        type: String,
        required: true,
    },
    destPort: {
        type: Number,
        required: true,
    },
    targetDeliveryDate: {
        type: Date,
        required: true,
    },
    cargoUnit: {
        type: Boolean,
        required: true,
    },
    ispackageDetails: {
        type: Boolean,
        required: true,
    },
    cargoweight: {
        type: Number,
        required: true,
    },
    cargovolume: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    haveBattery: {
        type: Boolean,
        required: true,
    },
    haveHazardous: {
        type: Boolean,
        required: true,
    },
    haveLiquids: {
        type: Boolean,
        required: true,
    },
    haveNothing: {
        type: Boolean,
        required: true,
    },
    instruction: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
});
var Quote = mongoose.model('Quote', QuoteSchema);
module.exports = Quote;