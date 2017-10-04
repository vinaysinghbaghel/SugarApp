'use strict';

let Users = require('./../models/Users');
let UserProfile = require('./../models/UserProfile');
const mongoose = require('mongoose');
const randomString = require('random-string');
const nodemailer = require('nodemailer');
let mail = require('../utils/mail');
const uuid = require('node-uuid');
const CryptoJS = require("crypto-js");

exports.signUp = function(req, res, next) {
    try {
        let body = req.body.user;
        let search = {
            email: body.userid
        };
        Users.findOne(search).exec(function(err, user) {
            console.log(err,'some erorrrorororo is have');
            if (err) return res.json({
                "success": false,
                message: "Oops! Error in processing the request, Please try again."
            });
            if (user) return res.json({
                "success": true,
                message: "Userid is already registered."
            });
            let userpassword = randomString({
                length: 10
            });
            console.log(userpassword, 'password of user')
            let uuids = uuid();
            let userpass = CryptoJS.AES.encrypt(userpassword, uuids).toString();

            // setup email data with unicode symbols
            let mailOptions = {
                from: 'Sugar@wishto.co', // sender address
                to: body.userid, // list of receivers
                subject: 'SugarApp Credentials', // Subject line
                html: 'Welcome to SugarApp,<br/> Your credentials are <br/> username: ' + body.userid + '<br/> password: ' + userpassword + '<br/> url:',
            };

            // send mail with defined transport object
            mail.sendEmail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            let userObj = new Users({
                'name': body.name,
                'email': body.userid,
                'phonenumber': body.phonenumber,
                'password': userpass,
                'isDelete': 0,
                'passwordchanged': 0,
                'useruuid': uuids,

            });
            userObj
                .save(function(err) {
                    if (err) {
                        return res.status(500).json({
                            'message': 'Error in processing your request',
                            'success': false,
                            'data': null
                        });
                    }
                    return res.json({
                        'message': 'User Registered successfully',
                        'success': true
                    });
                });
        });
    } catch (e) {
        // res.redirect('/partner?fail=1');
        console.log(e)
    }
};
exports.signIn = function(req, res, next) {
    try {
        var email = req.body.email;
        var password = req.body.password;
        Users.findOne({
            email: email
        }).exec(function(err, user) {
            if (err) {
                return res.json({
                    success: false,
                    "message": err
                });
            }
            if (!user) {
                return res.json({
                    "success": false,
                    message: "Email not registered."
                });
            }
            let userpassword = CryptoJS.AES.decrypt(user.password, user.useruuid).toString(CryptoJS.enc.Utf8);
            if (userpassword !== password) {
                return res.json({
                    "success": false,
                    message: "Incorrect password entered."
                });
            } else {
                req.session.cookie.expires = false;
                req.session.name = user._id;
                req.session.cookie.expires = new Date(Date.now() + (28 * 24 * 3600000));
                req.session.cookie.maxAge = 28 * 24 * 3600000;
                req.session.userid = user._id;
                return res.json({
                    "success": true,
                    user: user
                });
            }
        });
    } catch (e) {
        // res.redirect('/partner?fail=1');
        console.log(e, 'e for error')
    }

}
exports.isloggedin = function(req, res) {
    if (req.user) {
        Users.findOne({
            _id: req.user._id
        }).exec(function(err, user) {
            if (err || !user) return req.json({
                success: false,
                user: req.user
            });
            res.json({
                success: true,
                user: user
            });
        })
    } else {
        res.json({
            success: false,
            "message": "Not Authenticated"
        });
    }
};
exports.logout = function(req, res) {
    console.log('logout sugar app')
    var redirectUrl = "/login";
    if (!req.user) {
        return res.json({
            message: "Log out successfull.",
            success: true,
            redirectUrl: redirectUrl
        });
    } else {
        req.session.name = null;
        req.session.cookie.expires = new Date(Date.now() - 100000);
        req.session.cookie.maxAge = 0;
        if (req.user) {
            req.logout();
        }
        res.json({
            message: "Log out successfull.",
            success: true,
            redirectUrl: redirectUrl
        });
    }
};
exports.changePassword = function(req, res) {
    try {
        let id = req.session.userid;
        let email = req.body.email;
        let password = req.body.password;
        let uuids = uuid();
        Users.find({
            _id: id
        }).exec(function(err, user) {
            if (err) {
                return res.json({
                    success: false,
                    "message": err
                });
            } else if (user) {
                let userpass = CryptoJS.AES.encrypt(password, uuids).toString();
                Users.update({
                    email: email
                }, {
                    password: userpass,
                    useruuid: uuids,
                    passwordchanged: 1
                }, function(err, newpassword) {
                    if (err) {
                        res.json({
                            success: false,
                            message: "Erron in processing the request. Please try again."
                        });
                    } else {
                        res.json({
                            success: true,
                            message: "Password successfully changed."
                        });
                    }
                })
            } else {
                res.json({
                    message: "Invalid username or password",
                    success: false
                });
            }
        })
    } catch (e) {
        console.error(e.stack);
    }
}

exports.forgotPassword = function(req, res, next) {
    try {
        var forgotemail = req.body.email;
        Users.findOne({
            email: forgotemail
        }, function(err, adminusers) {
            if (err) {
                res.json({
                    message: "Please try Again"
                });
            } else if (adminusers) {
                let userpassword = randomString({
                    length: 10
                });
                let uuids = uuid();
                let userpass = CryptoJS.AES.encrypt(userpassword, uuids).toString();
                let mailOptions = {
                    from: 'Sugar@wishto.co', // sender address
                    to: forgotemail, // list of receivers
                    subject: 'SugarApp Credentials', // Subject line
                    html: 'Welcome,<br/> Your password is  ' + userpassword + '<br/>Please change your password after login.<br /><br />Thank You.' // html body    
                };
                // send mail with defined transport object
                mail.sendEmail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
                Users.update({
                    email: forgotemail
                }, {
                    password: userpass,
                    passwordchanged: 0,
                    useruuid: uuids,
                }, function(err, newpassword) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({
                            status: true,
                            message: "Your new password has been mailed, please check email."
                        });
                    }
                });
            } else {
                res.json({
                    status: false,
                    messages: "Email ID is not found."
                });
            }
        });
    } catch (e) {
        console.error(e.stack);
    }
}

// exports.models=exports