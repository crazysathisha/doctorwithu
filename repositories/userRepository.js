const mongoose = require("mongoose");
const userModel = require("../models/userModel");
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

exports.signUp = async (req, res) => {
  try {
    console.log("req.body.userType", req.body.userType);
    const User = mongoose.model("userModel", userModel);
    switch (req.body.userType) {
      case "DOCTOR":
        {
          req.body.user_id = "DR-" + crypto.randomBytes(8).toString("hex");
          req.body.isClinicAdded = false;
          req.body.clinics = [];
          req.body.is_licence_verified = true;
          break;
        }
      case "PATIENT":
        {
          req.body.user_id = "PT-" + crypto.randomBytes(8).toString("hex");
          /* req.body.info = {
            "name": "",
            "emailId": "",
            "mobile": "",
            "dob": "",
            "city": "",
            "state": "",
            "gender": ""
          } */
          break;
        }
      case "PHARMACY":
        {
          req.body.user_id = "PH-" + crypto.randomBytes(8).toString("hex");
          break;
        }
      case "LAB":
        {
          req.body.user_id = "LB-" + crypto.randomBytes(8).toString("hex");
          break;

        }
      default:
        {
          req.body.user_id = "LIVEDR-" + crypto.randomBytes(8).toString("hex");
          break;
        }

    }

    req.body.password = encrypt(req.body.password);
    console.log(req.body);
    return await new User(req.body).save();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.signIn = async (req, res) => {
  try {
    console.log("inside");
    const User = mongoose.model("userModel", userModel);
    const user = await User.findOne({
      mobile: req.body.mobile
    }).lean();
    if (user) {
      if (user.password === encrypt(req.body.password)) {
        /* if (user.is_verified) {
          if (user.userType === "DOCTOR") {
            if (user.is_licence_verified) {
              return user;
            } else {
              return 303;
            }
          } else {
            return user;
          }
        } else {
          return 302;
        } */
        return user;
      } else {
        return 301;
      }
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};

exports.getProfile = async (req, res) => {
  try {
    var user_id = mongoose.Types.ObjectId(req.params.id);
    console.log("getProfile", user_id);
    const User = mongoose.model("userModel", userModel);
    const user = await User.findOne({
      _id: user_id
    }).lean();
    if (user) {
      return user;
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};

exports.addProfileInfo = async (req, res) => {
  try {
    console.log(req);
    const User = mongoose.model("userModel", userModel);
    await User.findByIdAndUpdate(
      req.body.id, {
        $set: {
          isProfileCompleted: req.body.isProfileCompleted,
          info: req.body.info
        }
      }, {
        safe: true,
        upsert: true,
        new: false
      }
    );

    return await User.findOne({
      _id: req.body.id
    }).lean();
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};


exports.upsertClinics = async (req, res) => {
  try {
    console.log(req);
    const User = mongoose.model("userModel", userModel);
    await User.findByIdAndUpdate(
      req.body.id, {
        $set: {
          clinics: "qwerty"
        }
      }, {
        safe: true,
        upsert: true,
        new: false
      }
    );

    return await User.findOne({
      _id: req.body.id
    }).lean();
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};

/* var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var sns = new AWS.SNS();

var params = {
  Message: 'this is a test message',
  MessageStructure: 'string',
  PhoneNumber: '+918553149795'
};

sns.publish(params, function (err, data) {
  console.log("sms called")
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data); // successful response
}); */

function generateOTP() {

  // Declare a digits variable  
  // which stores all digits 
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

exports.otp = async (req, res) => {
  try {
    let generatedotp = await generateOTP();
    console.log("otp", generatedotp);
    const User = mongoose.model("userModel", userModel);
    await User.findByIdAndUpdate(
      req.id, {
        $set: {
          otp: generatedotp
        }
      }, {
        safe: true,
        upsert: true,
        new: false
      }
    );
    let mobile = req.mobile;
    let msg = generatedotp + " is your OTP for " + mobile + ". Please enter the OTP to continue registration for LIVE DOCTOR";
    if (sendSMS(mobile, msg)) {
      return 201;
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};

/* function sendSMS(mobile, msg) {
  //load aws-sdk module
  var AWS = require('aws-sdk');
  //loads config.json which we created earlier which contains aws security credentials.
  AWS.config.loadFromPath('./config.json');

  var sns = new AWS.SNS();
  var SNS_TOPIC_ARN = "arn:aws:sns:us-east-1:508614756368:livedoctor";


  //subscribing a mobile number to a topic
  sns.subscribe({
    Protocol: 'sms',
    TopicArn: "arn:aws:sns:us-east-1:508614756368:livedoctor",
    Endpoint: mobile // type mobile number to whom you want to send a message.
  }, function (error, data) {
    if (error) {
      console.log("error when subscribe", error);
    }
    console.log("subscribe data", data);
    var SubscriptionArn = data.SubscriptionArn;
    var params = {
      TargetArn: SNS_TOPIC_ARN,
      Message: msg, //type your message
      Subject: 'OTP' //type your subject
    };

    //publish a message.
    sns.publish(params, function (err_publish, data) {
      if (err_publish) {
        console.log('Error sending a message', err_publish);
        return err_publish;
      } else {
        console.log('Sent message:', data.MessageId);
        return {
          'Sent message': data.MessageId
        };
      }
      var params = {
        SubscriptionArn: SubscriptionArn
      };

      //unsubscribing the topic
      sns.unsubscribe(params, function (err, data) {
        if (err) {
          console.log("err when unsubscribe", err);
        }
      });
    });
  });
}
 */

function sendSMS(mobile, msg) {
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-east-1';
  AWS.config.update({
    accessKeyId: "AKIAJZOCS47CVISP34GQ",
    secretAccessKey: "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",
  });

  var sns = new AWS.SNS();
  var params = {
    Message: msg,
    MessageStructure: 'string',
    PhoneNumber: '91' + mobile,
    Subject: 'OTP',
  };
  sns.setSMSAttributes({
      attributes: {
        DefaultSMSType: "Transactional",
        "DefaultSenderID": "LIVEDT"
      }
    },
    function (error) {
      if (error) {
        console.log(error);
      }
    }
  );

  sns.publish(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });
}


exports.resendOTP = async (req, res) => {
  try {
    const User = mongoose.model("userModel", userModel);
    const user = await User.findOne({
      mobile: req.body.mobile
    }).lean();
    let mobile = user.mobile;
    let generatedotp = user.otp;
    let msg = generatedotp + " is your OTP for " + mobile + ". Please enter the OTP to continue registration for LIVE DOCTOR";
    if (sendSMS(mobile, msg)) {
      return 201;
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};


exports.verifyOTP = async (req, res) => {
  try {
    console.log("inside", req.body);
    const User = mongoose.model("userModel", userModel);
    const user = await User.findOne({
      mobile: req.body.mobile
    }).lean();
    if (user) {
      console.log(user)
      if (user.otp == parseInt(req.body.otp)) {
        return await User.findByIdAndUpdate(
          user._id, {
            $set: {
              is_verified: true
            }
          }, {
            safe: true,
            upsert: true,
            new: false
          }
        );
      } else {
        return 301;
      }
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};


exports.verifyLicence = async (req, res) => {
  try {
    console.log("inside");
    const User = mongoose.model("userModel", userModel);
    let user = await User.findByIdAndUpdate(
      req.body.id, {
        $set: {
          is_licence_verified: true
        }
      }, {
        safe: true,
        upsert: true,
        new: false
      }
    );
    let mobile = await user.mobile;
    let msg = "Congratulations! Your profile has been successfully verified. You can login to LIVEDOCTOR using your credentials"
    sendSMS(mobile, msg)
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
};