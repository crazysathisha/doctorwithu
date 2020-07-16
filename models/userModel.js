const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const timestamps = require('mongoose-timestamp');
const autopopulate = require('mongoose-autopopulate');
let userModel = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        default: 'PATIENT',
        enum: ['PATIENT', 'DOCTOR', 'PHARMACIST'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: Date,
        default: Date.now
    },
    isProfileCompleted: {
        type: Boolean,
        default: false
    },
    info: {
        type: Object,
        default: null
    },
    isClinicAdded: {
        type: Boolean
    },
    clinics: {
        type: Array
    },
    profession: {
        type: Array
    },
    otp: {
        type: Number
    },
    is_licence_verified: {
        type: Boolean,
        default: false
    },

}, {
    collection: 'USER'
});

userModel.plugin(uniqueValidator);
userModel.plugin(timestamps);
userModel.plugin(autopopulate);

var USER = mongoose.model('USER', userModel, 'USER');
module.exports = userModel;