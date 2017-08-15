'use strict';

let Users = require('./../models/Users');
let passport = require('passport');
let UserProfile = require('./../models/UserProfile');
let UserDealHistory = require('./../models/UserDealHistory');
const mongoose = require('mongoose');
const randomString = require('random-string');
const nodemailer = require('nodemailer');
let mail = require('../utils/mail');
const uuid = require('node-uuid');
const CryptoJS = require("crypto-js");
const http = require('http'),
    inspect = require('util').inspect;
const busboy = require('connect-busboy');
const path = require('path');
const fs = require('fs');
var moment = require('moment');

exports.createUserProfile = function(req, res, next) {
    try {

        UserProfile.findOne({
            'email': req.query.email
        }, function(err, user) {
            if (err) {
                return res.json({
                    'message': 'Error in SignUp',
                    'success': false,
                });
            }
            // already exists
            else if (user) {
                return res.json({
                    'message': 'User Already Exists',
                    'success': false,
                });
            } else {
                if (req.busboy != null) {
                    let password = req.query.password;
                    let custID = randomString({
                        length: 13
                    });
                    let uuids = uuid();
                    let userpass = CryptoJS.AES.encrypt(password, uuids).toString();
                    var fstream, update;
                    req.pipe(req.busboy);
                    var imageurl = "";

                    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
                        var type = mimetype.split('/')[1];
                        var newName = (new Date()).valueOf();
                        var saveTo = path.join('frontend/photos/profile/', newName + '.' + type);
                        imageurl = path.join('photos/profile/', newName + '.' + type);
                        fstream = fs.createWriteStream(saveTo);
                        file.pipe(fstream);
                    });
                    req.busboy.on("finish", function() {
                        let rand = Math.floor(10 + Math.random() * 99);
                        var time = (new Date() / 1) * 1 * rand + '';
                        let string = randomString({
                            length: 3
                        });
                        let newUser = new UserProfile({
                            'custID': custID,
                            'name': req.query.name,
                            'email': req.query.email,
                            'password': userpass,
                            'useruuid': uuids,
                            'img': imageurl,
                            created_at: moment.utc().format("YYYY-MM-DD HH:mm:ss")
                        });
                        // save the user
                        newUser.save(function(err) {
                            if (err) {
                                console.log(err, 'gigigiigigiigigigigigi')
                                return res.json({
                                    'message': 'Error in Saving user:',
                                    'success': false,
                                });
                            }
                            return res.json({
                                'message': 'User Registration succesful',
                                'success': true,
                            });
                        });

                    });

                } else {
                    let password = req.query.password;
                    let custID = randomString({
                        length: 13
                    });
                    let uuids = uuid();
                    let userpass = CryptoJS.AES.encrypt(password, uuids).toString();
                    let newUser = new UserProfile({
                        'custID': custID,
                        'name': req.query.name,
                        'email': req.query.email,
                        'password': userpass,
                        'useruuid': uuids,
                        created_at: moment.utc().format("YYYY-MM-DD HH:mm:ss")
                    });
                    // save the user
                    newUser.save(function(err) {
                        if (err) {
                            console.log(err, 'gigigiigigiigigigigigi')
                            return res.json({
                                'message': 'Error in Saving user:',
                                'success': false,
                            });
                        }
                        return res.json({
                            'message': 'User Registration succesful',
                            'success': true,
                        });
                    });

                }

            }
        })
    } catch (e) {
        console.error(e.stack);

    }
};

exports.usersignin = function(req, res) {
    passport.authenticate('local', function(err, user, info) {

        if (err) {
            return res.json({
                success: false,
                "message": "Invalid Username Or Password",
                user: {}
            });
        }
        if (!user) {
            return res.json({
                success: false,
                "message": "Invalid Username Or Password",
                user: {}
            });
        } else {
            req.login(user, function(err) {
                req.session.cookie.expires = false;
                req.session.name = user._id;
                req.session.cookie.expires = new Date(Date.now() + (28 * 24 * 3600000));
                req.session.cookie.maxAge = 28 * 24 * 3600000;
            });
        }
        return res.json({
            success: true,
            "message": "User Successfully Login",
            user: user
        });
    })(req, res);
};

exports.getUserProfile = function(req, res, next) {
    UserProfile
        .find({}, function(err, userprofiledata) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'message': 'Here are your userprofile. Enjoy!',
                'success': true,
                'data': userprofiledata
            });
        });
};
exports.userdealdetails = function(req, res, next) {
    try {

        let userdealdetails = new UserDealHistory({
            dealID: req.body.dealid,
            dealinfo: req.body.dealinfo,
            dealterms: req.body.dealterms,
            dealcategory: req.body.dealcategory,
            dealimg: req.body.dealimg,
            dealtype: req.body.dealtype
        })
        userdealdetails
            .save(function(err) {
                if (err) {
                    return res.status(500).json({
                        'message': 'Error in processigetDealHistoryng your request',
                        'success': false,
                        'data': null
                    });
                }
                return res.json({
                    'message': 'User deal created successfully',
                    'success': true,
                    'data': []
                });
            });
    } catch (e) {
        console.error(e.stack);

    }
};
exports.getDealHistory = function(req, res, next) {
    UserDealHistory
        .find({
            dealID: req.body.id
        }, function(err, userprofiledata) {
            console.log(userprofiledata, 'user profile data')
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'message': 'Here are your userprofile. Enjoy!',
                'success': true,
                'data': userprofiledata
            });
        });
};