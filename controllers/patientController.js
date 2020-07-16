const patientRepository = require('../repositories/patientRepository');
const configService = require('../services/configService')
const config = require('config');
const ENCRYPTION_KEY = config.superSecret;


exports.getNearbyDoctors = async (req, res) => {

    if (false) {
        return res.status(400).send("error");
    } else {
        try {
            const result = await patientRepository.getNearbyDoctors(req, res);

            res.status(201).send(result);
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}


exports.getDoctorsBySpeciality = async (req, res) => {

    if (false) {
        return res.status(400).send("error");
    } else {
        try {
            const result = await patientRepository.getDoctorsBySpeciality(req, res);

            res.status(201).send(result);
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}

exports.bookAnAppointment = async (req, res) => {

    if (false) {
        return res.status(400).send("error");
    } else {
        try {

            const result = await patientRepository.bookAnAppointment(req, res);

            res.status(201).send(result);
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}


exports.getMyBookings = async (req, res) => {

    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await patientRepository.getMyBookings(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'User not found'
                });
            } else {
                res.status(201).send({
                    myBookings: result
                });
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}


exports.getAppointmentReports = async (req, res) => {

    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await patientRepository.getAppointmentReports(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'Appointment not found'
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