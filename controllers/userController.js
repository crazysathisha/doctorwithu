const userRepository = require('../repositories/userRepository');
const configService = require('../services/configService')
const jwt = require('jsonwebtoken');
const config = require('config');
const ENCRYPTION_KEY = config.superSecret;


exports.signUp = async (req, res) => {
    req.assert('user_name', 'user_name can not be empty.').notEmpty();
    req.assert('email', 'Email can not be empty.').notEmpty();
    req.assert('email', 'Invalid email format').isEmail();
    req.assert('password', 'password can not be empty.').notEmpty();
    req.assert('userType', 'userType can not be empty.').notEmpty();
    req.assert('mobile', 'Mobile can not be empty.').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await userRepository.signUp(req, res);

            let OTPreq = {
                id: result._id,
                mobile: result.mobile
            };
            console.log(OTPreq);
            const otp = await userRepository.otp(OTPreq, res);

            res.status(201).send(result);
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}

exports.sayhello = async (req, res) => {
    return res.status(201).send("saying hello");
}

exports.signIn = async (req, res) => {

    /* req.assert('mobile', 'mobile can not be empty.').notEmpty();
    req.assert('password', 'password can not be empty.').notEmpty();

    let errors = req.validationErrors(); */
    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await userRepository.signIn(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'User not found'
                });
            } else if (result === 301) {
                res.status(301).send({
                    info: 'Password Incorrect'
                });
            } else if (result === 302) {
                res.status(302).send({
                    info: 'Please verify your mobile'
                });
            } else if (result === 303) {
                res.status(303).send({
                    info: 'Your lincense is under verification'
                });
            } else {
                const token = jwt.sign({
                    result: result
                }, ENCRYPTION_KEY, {
                    expiresIn: 86400
                });
                res.status(201).send({
                    info: 'Login Successful',
                    jwt: token,
                    user: result
                });
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}

exports.getProfile = async (req, res) => {

    console.log("us", req.params);
    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await userRepository.getProfile(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'User not found'
                });
            } else {
                res.status(201).send({
                    userInfo: result
                });
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}

exports.addProfileInfo = async (req, res) => {
    console.log(req);
    /* req.assert('mobile', 'mobile can not be empty.').notEmpty();
    req.assert('password', 'password can not be empty.').notEmpty();

    let errors = req.validationErrors(); */
    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await userRepository.addProfileInfo(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'User not found'
                });
            } else {

                res.status(201).send({
                    info: 'Update Successful',
                    user: result
                });
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}

exports.upsertClinics = async (req, res) => {
    console.log(req);
    /* req.assert('mobile', 'mobile can not be empty.').notEmpty();
    req.assert('password', 'password can not be empty.').notEmpty();

    let errors = req.validationErrors(); */
    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await userRepository.upsertClinics(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'User not found'
                });
            } else {

                res.status(201).send({
                    info: 'Upsert Successful',
                    user: result
                });
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}


exports.otp = async (req, res) => {

    console.log("us", req.params);
    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await userRepository.otp(req, res);
            res.status(201).send({
                "OTP": "success"
            });
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}

exports.resendOTP = async (req, res) => {

    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await userRepository.resendOTP(req, res);
            res.status(201).send({
                "OTP": "success"
            });
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}

exports.verifyOTP = async (req, res) => {

    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await userRepository.verifyOTP(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'User not found'
                });
            } else if (result === 301) {
                res.status(301).send({
                    info: 'OTP Incorrect'
                });
            } else {
                const token = jwt.sign({
                    result: result
                }, ENCRYPTION_KEY, {
                    expiresIn: 86400
                });
                res.status(201).send({
                    info: 'OTP verified successfully',
                    jwt: token,
                    user: result
                });
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}

exports.verifyLicence = async (req, res) => {

    if (false) {
        return res.status(400).send(errors);
    } else {
        try {
            const result = await userRepository.verifyLicence(req, res);
            if (result === 401) {
                res.status(401).send({
                    info: 'User not found'
                });
            } else {

                res.status(201).send({
                    info: 'License verified successfully',
                    user: result
                });
            }
        } catch (err) {
            console.log(err.stack);
            res.status(500).send(err);
        }
    }
}