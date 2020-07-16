const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const timestamps = require('mongoose-timestamp');
const autopopulate = require('mongoose-autopopulate');

let appointmentModel = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true,
        autopopulate: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true,
        autopopulate: true
    },
    appointment_date: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    appointment_location: {
        type: Array,
        required: true
    },
    is_active_appointment: {
        type: Boolean,
        default: true
    },
    self: {
        type: Boolean,
        default: true,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'COMPLETED', 'REJECTED', 'EXPIRED'],
        default: 'PENDING',
        required: true
    },
    prescription: {
        type: Array,
        default: []
    },
    clinic_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CLINICS',
        required: true,
        autopopulate: true
    }


}, {
    collection: 'APPOINTMENTS'
});

appointmentModel.plugin(uniqueValidator);
appointmentModel.plugin(timestamps);
appointmentModel.plugin(autopopulate);

var APPOINTMENTS = mongoose.model('APPOINTMENTS', appointmentModel);
module.exports = appointmentModel;