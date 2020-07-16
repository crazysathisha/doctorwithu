const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const appointmentsModel = require("../models/appointmentsModel");
const clinicsModel = require("../models/clinicsModel");
const crypto = require("crypto");
const config = require("config");
const ALGORITHM = config.encryptionStandard;
const ENCRYPTION_KEY = config.superSecret;

function encrypt(text) {
  console.log("encrypt");
  let iv = Buffer.from(ENCRYPTION_KEY, "hex");
  let cipher = crypto.createCipheriv(ALGORITHM, new Buffer(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([iv, encrypted, cipher.final()]);
  return encrypted.toString("hex");
}

exports.getNearbyDoctors = async (req, res) => {
  try {
    const clinics = mongoose.model("clinicsModel", clinicsModel);
    /* await clinics.createIndex({
      location: "2dsphere"
    }); */
    /* await clinics.createIndex({
      "location": "2dsphere"
    }) */
    console.log(req.body);
    return await clinics.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: req.body.loc
          },
          $maxDistance: 5000
        }
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};



exports.getDoctorsBySpeciality = async (req, res) => {
  try {
    const clinics = mongoose.model("clinicsModel", clinicsModel);

    console.log(req.body);
    let doctors = await clinics.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: req.body.loc
          },
          $maxDistance: 5000
        }
      }
    });
    return await doctors.filter(doctor => doctor.doctor_id.info.speciality === req.body.speciality);

  } catch (err) {
    res.status(500).send(err);
  }
};

exports.bookAnAppointment = async (req, res) => {
  try {
    console.log(req.body);
    const appointment = mongoose.model("appointmentsModel", appointmentsModel);

    let appointmentdet = await new appointment(req.body).save();
    console.log(appointmentdet);
    return await appointment.find({
      _id: appointmentdet._id
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    console.log("getMyBookings", req.body);
    const appointment = mongoose.model("appointmentsModel", appointmentsModel);
    const bookings = await appointment
      .find({
        patient_id: req.body.patient_id
      });
    if (bookings) {
      return bookings;
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};


exports.getAppointmentReports = async (req, res) => {
  try {
    console.log("getMyBookings", req.body);
    const appointment = mongoose.model("appointmentsModel", appointmentsModel);
    const report = await appointment
      .find({
        _id: mongoose.Types.ObjectId(req.body.appointment_id)
      });
    if (report) {
      return report;
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};