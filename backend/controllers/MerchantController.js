'use strict';

let Users = require('./../models/Users');
let UserProfile = require('./../models/UserProfile');
let VenderProfile = require('./../models/VenderProfile');
let LevelCreation = require('./../models/LevelCreation');
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
var Schema = mongoose.Schema;
exports.registermerchant = function(req, res, next) {

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
            fstream = fs.createWriteStream(saveTo);
            file.pipe(fstream);
        });
    req.busboy.on("finish", function() {
        // cityModel.geo    = [ req.body.lat, req.body.lng ];
            
            let rand = Math.floor(10 + Math.random() * 99);
            var time = (new Date() / 1) * 1 * rand + '';
            let string = randomString({length: 3});
            var merchantid =  req.query.name.toString().replace(/ /g, '').toUpperCase().substring(0, 1) + time.substring(2, 5) +string;
            let merchantObj = new VenderProfile({
            venderID:merchantid,
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
                'data': []
            });
        });
  });
    } catch (e) {
            // res.redirect('/partner?fail=1');
            console.log(e)
        }
};

exports.getVendorProfile = function(req, res, next) {
    VenderProfile
        .find({}, function(err, vendordata) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'message': 'Here are your vendorprofile. Enjoy!',
                'success': true,
                'data': vendordata
            });
        });
};

exports.createRegularLevel = function(req, res, next){
    try{
        console.log(req.body,'hiiiiiiiiiiiiiiiiiiiiiiiiiiiii data on server side')
    let regularlevel = new LevelCreation({
    levelname:req.body.name,
    setnumberofdeals:req.body.setnumberofdeals,
    settimeduration:req.body.settimeduration
    })
      regularlevel
        .save(function(err) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processigetDealHistoryng your request',
                    'success': false,
                    'data': null
                });
            }
            return res.json({
                'message': 'Regular Level successfully created',
                'success': true,
                'data': []
            });
        });

    }catch(e){
    console.log(e)
    }

}
exports.createJyfLevel = function(req, res, next){
    try{
        console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiii data on server side')
    let regularlevel = new LevelCreation({
    levelname:req.body.jyfname,
    setnumberofdeals:req.body.jyfsetnumberdeals,
    settimeduration:req.body.jyfsettimeduration
    })
      regularlevel
        .save(function(err) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processigetDealHistoryng your request',
                    'success': false,
                    'data': null
                });
            }
            return res.json({
                'message': 'Jyf Level successfully created',
                'success': true,
                'data': []
            });
        });

    }catch(e){
    console.log(e)
    }

}