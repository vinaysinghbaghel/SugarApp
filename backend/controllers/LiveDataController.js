'use strict';
const express = require('express');
var app = express();
let VenderProfile = require('./../models/VenderProfile');
let DealDataId = require('./../models/DealDataId');
let UserProfile = require('./../models/UserProfile');
const moment = require('moment');


exports.getNewRegisteredUserToday = function(req, res) { 
     var CurrentDate = moment.utc().format("YYYY-MM-DD");
    UserProfile.find({created_at:CurrentDate},function(err, registernewuser) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'success': true,
                'data': registernewuser
            });
        });
};
exports.getNewRegisteredMerchantToday = function(req, res) { 
    var CurrentDate = moment.utc().format("YYYY-MM-DD");
    //      console.log(CurrentDate,'CurrentDateCurrentDate') 
    // VenderProfile.find(function(err, createddate) {
    //     var created_at;
    //      for (var i = 0; i < createddate.length; i++) {
    //          var datedata = createddate[i];
    //          var month = datedata.created_at.getUTCMonth() + 1; //months from 1-12
    //          var day = datedata.created_at.getUTCDate();
    //          var year = datedata.created_at.getUTCFullYear();
    //          if (day < 10) {
    //              day = '0' + day
    //          }
    //          if (month < 10) {
    //              month = '0' + month
    //          }
         
    //          created_at = year + "-" + month + "-" + day;
    //          console.log(created_at,'newdatenewdatenewdatenewdatenewdatenewdatenewdate')
    VenderProfile.find({"created_at":CurrentDate},function(err, registernewmerchant) {
        console.log(registernewmerchant,'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'success': true,
                'data': registernewmerchant
            });
        });
        //  }
        //  });
}; 
exports.getDealsForToday = function(req, res) { 
     var CurrentDate = moment.utc().format("YYYY-MM-DD");
    DealDataId.find({created_at:CurrentDate},function(err, getdealsfortoday) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'success': true,
                'data': getdealsfortoday
            });
        });
};           
exports.getDealsAlive = function(req, res) { 
     var CurrentDate = moment.utc().format("YYYY-MM-DD");
    DealDataId.find({status:live},function(err, getdealsalive) {
            if (err) {
                return res.status(500).json({
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'message': 'Here are your available deals. Enjoy!',
                'success': true,
                'data': getdealsalive
            });
        });
};           
exports.getDealsCompletedToday = function(req, res) { 
     var CurrentDate = moment.utc().format("YYYY-MM-DD");
    DealDataId.find({created_at:CurrentDate},function(err, dealscompletetoday) {
            if (err) {
                return res.status(500).json({
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'message': 'Here are your available deals. Enjoy!',
                'success': true,
                'data': dealscompletetoday
            });
        });
};           
        