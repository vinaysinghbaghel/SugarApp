'use strict';
const express = require('express');
var app = express();
let VenderProfile = require('./../models/VenderProfile');
let DealDataId = require('./../models/DealDataId');
let UserProfile = require('./../models/UserProfile');
const moment = require('moment');

exports.getNewRegisteredMerchantToday = function(req, res) { 
   VenderProfile.aggregate({
  "$project": {
    "year": {
      "$year": "$created_at"
    },
    "month": {
      "$month": "$created_at"
    },
    "day": {
      "$dayOfMonth": "$created_at"
    }
  }
}, {
  "$match": {
    "year": new Date().getFullYear(),
    "month": new Date().getMonth() + 1, //because January starts with 0
    "day": new Date().getDate()
  }
}).exec(function ( e, d ) {
    if(e){
        return res.status(500).json({
            'message':'Error in processing your requet',
            'success':false,
            'data':[]
        });
    }
    return res.json({
        'message':'success',
        'success':true,
        'data':d
    })
            
});
}; 
exports.getDealsForToday = function(req, res) { 

    DealDataId.find({status:'live'},function(err, getdealsfortoday) {
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
exports.getDealsCompletedToday = function(req, res) { 
     var CurrentDate = moment.utc().format("YYYY-MM-DD");

     DealDataId.find({"status" : { "$in": ["close"] },
                 "setdate":{"$in": [CurrentDate]} 
    },function(err, dealscompletetoday) {
            if (err) {
                return res.status(500).json({
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'message': 'Success',
                'success': true,
                'data': dealscompletetoday
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

//  module.exports= exports;  