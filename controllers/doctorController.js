const doctorRepository = require('../repositories/doctorRepository');
const configService = require('../services/configService')
const config = require('config');
const ENCRYPTION_KEY = config.superSecret;



exports.docBookingDetails = async (req, res) => {

    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await doctorRepository.docBookingDetails(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'User not found'
                });
            } else {
                res.status(201).send({
                    docBookingDetails: result
                });
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}

exports.acceptOrRejectAppointment = async (req, res) => {

    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await doctorRepository.acceptOrRejectAppointment(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'User not found'
                });
            } else {
                res.status(201).send({
                    bookingDetails: result
                });
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}

exports.addPrescription = async (req, res) => {

    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await doctorRepository.addPrescription(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'User not found'
                });
            } else {
                res.status(201).send({
                    bookingDetails: result
                });
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}

exports.addClinic = async (req, res) => {

    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await doctorRepository.addClinic(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'Doctor not found'
                });
            } else {
                res.status(201).send(result);
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}


exports.myClinics = async (req, res) => {

    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await doctorRepository.myClinics(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'User not found'
                });
            } else {
                res.status(201).send({
                    myClinics: result
                });
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}

exports.upcomingBookings = async (req, res) => {

    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            console.log(req.body)
            const result = await doctorRepository.upcomingBookings(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'User not found'
                });
            } else {
                res.status(201).send(result);
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}