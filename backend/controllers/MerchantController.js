'use strict';

let Users = require('./../models/Users');
let UserProfile = require('./../models/UserProfile');
let VenderProfile = require('./../models/VenderProfile');
const mongoose = require('mongoose');
const randomString = require('random-string');
const nodemailer = require('nodemailer');
let mail = require('../utils/mail');
const uuid = require('node-uuid');
const CryptoJS = require("crypto-js");
var http = require('http'),
  inspect = require('util').inspect;
var busboy = require('connect-busboy');
var path = require('path');
var fs = require('fs-extra');
var fs = require('fs');

exports.registermerchant = function(req, res, next) {
    //  console.log(req,'register merchant data in server side')

    try {
        // var userid = req.query.userid;
        var lat = req.query.markerLat;
        var lag =  req.query.markerLng;
        var fstream, update;
        req.pipe(req.busboy);
        var imageurl = "";
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            var type = mimetype.split('/')[1];
            var newName = (new Date()).valueOf();
            var saveTo = path.join('frontend/photos/profile/', newName + '.' + type);
            imageurl = path.join('photos/profile/', newName + '.' + type);
            console.log(imageurl,'kiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
            fstream = fs.createWriteStream(saveTo);
            file.pipe(fstream);
        });
    req.busboy.on("finish", function() {
        // cityModel.geo    = [ req.body.lat, req.body.lng ];
            let merchantObj = new VenderProfile({
            logo: imageurl,
            name: req.query.name,
            email: req.query.email,
            contactnumber:req.query.contactnumber,
            contactperson:req.query.contactperson,
            address:req.query.address,
            merchantcategory:req.query.merchantcategory,
            merchantlevel:req.query.merchantlevel,
            loc:[lat,lag]
            });
         merchantObj
        .save(function(err) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processigetDealHistoryng your request',
                    'success': false,
                    'data': null
                });
            }
            return res.json({
                'message': 'merchant register successfully',
                'success': true,
                'data': imageurl
            });
        });
  });
    } catch (e) {
            // res.redirect('/partner?fail=1');
            console.log(e,'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
        }
};