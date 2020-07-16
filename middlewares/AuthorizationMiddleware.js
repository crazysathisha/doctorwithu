var express = require('express');
var app = express();
const jwt = require('jsonwebtoken');
const config = require('config');
const ENCRYPTION_KEY = config.superSecret; 


exports.authorize = async (req, res, next) => {
   // console.log(req.body, req.params,req)
    const token = req.body.token  || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, ENCRYPTION_KEY, function (err, decoded) {
            if (err) {
                res.status(406).send(err);
            } else {
                console.log(decoded);
                if (decoded.result._id != undefined) {
                    console.log(String(req.params.id) ,String(decoded.result._id));
                    if (String(req.body.id) == String(decoded.result._id) || String(req.params.id) == String(decoded.result._id)) {
                        req.decoded = decoded.result;
                        next();
                    } else {
                        res.status(405).send('token and profile mismatch.');
                    }
                } else {
                    res.status(407).send('token or profile without value.');
                }
            }
        });
    } else {
        res.status(403).send('No token provided.');
    }
}