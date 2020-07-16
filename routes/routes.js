var express = require('express');
var app = express();
const expressValidator = require('express-validator');
const AuthorizationMiddleware = require('../middlewares/AuthorizationMiddleware');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// Required controllers
var userController = require('../controllers/userController');
var patientController = require('../controllers/patientController');
var doctorController = require('../controllers/doctorController');
var adminController = require('../controllers/adminController');

// routing basic w/o token
var apiRoutes = express.Router();

apiRoutes.use(async (req, res, next) => {
  await AuthorizationMiddleware.authorize(req, res, next);
});

// Basic routing
//app.post('/SignUp', userController.userSignUp);
app.get('/', userController.sayhello);
app.post('/signUp', userController.signUp);
app.post('/signIn', userController.signIn);
app.get('/getProfile/user/:id', userController.getProfile);
app.post('/addProfileInfo', userController.addProfileInfo);
app.post('/getNearbyDoctors', patientController.getNearbyDoctors);
app.post('/getDoctorsBySpeciality', patientController.getDoctorsBySpeciality);
app.post('/bookAnAppointment', patientController.bookAnAppointment);
app.post('/getMyBookings', patientController.getMyBookings);
app.post('/docBookingDetails', doctorController.docBookingDetails);
app.post('/acceptOrRejectAppointment', doctorController.acceptOrRejectAppointment);
//app.post('/upsertClinics', userController.upsertClinics);
app.post('/addPrescription', doctorController.addPrescription);
app.post('/addClinic', doctorController.addClinic);
app.post('/myClinics', doctorController.myClinics);
// Routing with Auth JWT
//apiRoutes.post('/test2', userController.test2);
app.post('/otp', userController.otp);
app.post('/resendOTP', userController.resendOTP);
app.post('/verifyOTP', userController.verifyOTP);
app.post('/verifyLicence', userController.verifyLicence);
app.post('/upcomingBookings', doctorController.upcomingBookings);
app.post('/getAppointmentReports', patientController.getAppointmentReports);
//app.post('/verified', userController.verifyLicence);


//admin console apis
app.post('/usersList', adminController.usersList);

apiRoutes.use('', apiRoutes);

module.exports = app;