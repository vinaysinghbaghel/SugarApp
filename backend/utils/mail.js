
'use strict';

// var moment = require('moment');
// var utilQR = require('../utilities/qr.js');
// var async = require('async');
const nodemailer = require('nodemailer');
// var htmlStrings = require('../utilities/htmlStrings');
const config = require('../config/config');


exports.sendEmail = function(mailOptions, callback) {
	 let smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.gmail.smtp.username,
      pass: config.gmail.smtp.password
    }
    
   });
	smtpTransport.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log(err);
      if(typeof callback === "function") {
        callback(err);
      }
    } else {
      if(typeof callback === "function") {
        console.log(res);
        callback(null);
      }
    }
  });
};

module.exports = exports;