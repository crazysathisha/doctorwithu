const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const timestamps = require('mongoose-timestamp');
const autopopulate = require('mongoose-autopopulate');

let reportsModel = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true,
        autopopulate: true
    },
    reports: {
        type: Array,
        default: []
    }


}, {
    collection: 'REPORTS'
});

reportsModel.plugin(uniqueValidator);
reportsModel.plugin(timestamps);
reportsModel.plugin(autopopulate);

var REPORTS = mongoose.model('REPORTS', reportsModel);
module.exports = reportsModel;