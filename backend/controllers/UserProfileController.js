'use strict';

let Users = require('./../models/Users');
let UserProfile = require('./../models/UserProfile');
let UserDealHistory = require('./../models/UserDealHistory');
const mongoose = require('mongoose');
const randomString = require('random-string');
const nodemailer = require('nodemailer');
let mail = require('../utils/mail');
const uuid = require('node-uuid');
const CryptoJS = require("crypto-js");

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
      dealID:req.body.dealid,
      dealinfo:req.body.dealinfo,
      dealterms:req.body.dealterms,
      dealcategory:req.body.dealcategory,
      dealimg:req.body.dealimg,
      dealtype:req.body.dealtype
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
    }catch (e) {
    console.error(e.stack);

    }
};    
exports.getDealHistory = function(req, res, next) {
    console.log(req.body,'hihihiiiiiiiiiiiiiiiiiiiiiiiiii in server side ')
    UserDealHistory
        .find({dealID:req.body.id}, function(err, userprofiledata) {
            console.log(userprofiledata,'user profile data')
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