const mongoose = require("mongoose");
const appointmentsModel = require("../models/appointmentsModel");
const userModel = require("../models/userModel");
const clinicsModel = require("../models/clinicsModel");
const crypto = require("crypto");
const config = require("config");
const ALGORITHM = config.encryptionStandard;
const ENCRYPTION_KEY = config.superSecret;

exports.usersList = async (req, res) => {
  try {
    const users = mongoose.model("userModel", userModel);
    const usersList = await users.find({
      userType: req.body.userType
    });
    if (usersList) {
      return usersList;
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};




exports.acceptOrRejectAppointment = async (req, res) => {
  try {
    console.log(req);
    const appointment = mongoose.model("appointmentsModel", appointmentsModel);
    await appointment.findByIdAndUpdate(
      req.body.appointment_id, {
        $set: {
          status: req.body.status
        }
      }, {
        safe: true,
        upsert: true,
        new: false
      }
    );

    return await appointment.findOne({
      _id: req.body.appointment_id
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};

exports.addPrescription = async (req, res) => {
  try {
    console.log(req.body);
    const appointment = mongoose.model("appointmentsModel", appointmentsModel);
    await appointment.findByIdAndUpdate(
      req.body.appointment_id, {
        $push: {
          prescription: {
            $each: req.body.prescription,
            $sort: {
              score: -1
            }
          }
        }
      }, {
        safe: true,
        upsert: true,
        new: false
      }
    );

    return await appointment.findOne({
      _id: req.body.appointment_id
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};



exports.addClinic = async (req, res) => {
  try {
    console.log(req.body);
    const clinics = mongoose.model("clinicsModel", clinicsModel);

    let newClinic = await new clinics(req.body).save();
    console.log(newClinic);
    return await clinics.find({
      _id: newClinic._id
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.myClinics = async (req, res) => {
  try {
    console.log("docBookingDetails req", req.body);
    const clinics = mongoose.model("clinicsModel", clinicsModel);
    const myClinics = await clinics.find({
      doctor_id: req.body.doctor_id
    });
    if (myClinics) {
      return myClinics;
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};


exports.upcomingBookings = async (req, res) => {
  try {
    console.log("upcomingBookingsx", req.body);
    const appointment = mongoose.model("appointments Model", appointmentsModel);
    const bookings = await appointment.aggregate(
      [{
        $match: {
          doctor_id: mongoose.Types.ObjectId(req.body.doctor_id)
        }
      }, {
        $group: {
          _id: "$status",
          Appointments: {
            $push: "$$ROOT"
          },
          count: {
            $sum: 1
          }
        }
      }]
    );
    /* .find({
      doctor_id: req.body.doctor_id,

    }) */

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