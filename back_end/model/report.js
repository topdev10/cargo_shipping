var mongoose = require('mongoose');
var ReportSchema = new mongoose.Schema({
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
    reportDate: {
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
var Report = mongoose.model('Report', ReportSchema);
module.exports = Report;