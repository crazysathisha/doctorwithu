
const mongoose = require('mongoose');
const config = require('config');

exports.clientlistener = async (req, res, next) => {
  mongoose.Promise = Promise;
    const conn = await mongoose.connect(
      config.mongo.url,
      {
        useNewUrlParser: true
      },
      err => {
        if (err) throw err;
        console.log(err);
      }
    );
    console.log(conn);
    return next();
};
