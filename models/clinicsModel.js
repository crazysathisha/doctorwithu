const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const timestamps = require('mongoose-timestamp');
const autopopulate = require('mongoose-autopopulate');

let clinicsModel = new mongoose.Schema({

    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true,
        autopopulate: true
    },
    clinicName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    availability: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        coordinates: {
            type: [Number],
            required: true
        },
        type: {
            type: String,
            default: "Point"
        }
    },
    is_active: {
        type: Boolean,
        default: true
    },
    clinic_images: {
        type: Array,
        default: []
    },
    consultingFee: {
        type: String,

    }


}, {
    collection: 'CLINICS'
});

clinicsModel.plugin(uniqueValidator);
clinicsModel.plugin(timestamps);
clinicsModel.plugin(autopopulate);

var CLINICS = mongoose.model('CLINICS', clinicsModel);
clinicsModel.index({
    location: '2dsphere'
});
module.exports = clinicsModel;