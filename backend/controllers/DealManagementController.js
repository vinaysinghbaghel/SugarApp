'use strict';
const express = require('express');
var app = express();
let VenderProfile = require('./../models/VenderProfile');
let DealDataId = require('./../models/DealDataId');
const moment = require('moment');


exports.dealLevelAllocation = function(req, res, next) {
    var merchantObj = {
        'merchantlevel': req.body.levelname
    };
    VenderProfile.findOneAndUpdate({ 'venderID': req.body.venderid },{'$set': merchantObj},{'new': true    
    }, function(err, tweet) {
        if (err) {
            return res.status(500).json({
                'message': 'Error in processing your request',
                'success': false,
                'data': null
            });
        }
        return res.json({
            'message': ' Level Allocated successfully',
            'success': true,
            'data': null
        });
    });
}

exports.specialDealAllocation = function(req, res) {
    var merchantleve = 0;
    var dealID;
    var venderID = req.body.venderID;

    VenderProfile.findOne({
        venderID: req.body.venderID
    }, function(err, checkmerchatlevel) {
        if (err) {
            return res.status(500).json({
                'message': 'Error in processing your request',
                'success': false,
                'data': []
            });
        }

        var dataArray = [];
        var incre = 0;
        DealDataId.find(function(err, dataid) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            for (var i = 1; i <= req.body.setnumberofdeals; i++) {
                if (dataid.length > 0) {
                    var partneridlength = dataid[0].dealID.length;
                    var increment = parseInt(Number(dataid[0].dealID.substring(partneridlength - 3)));
                    incre = increment + i;
                    if (increment < 9) {
                        increment = "00" + incre;
                    } else if (increment < 99) {
                        increment = "0" + incre;
                    }
                    dealID = "R" + venderID + increment;
                    console.log(dealID, 'inner deal id is here')
                } else {
                    dealID = "R" + venderID + "000";
                }
                let dealidObj = new DealDataId({
                    dealID: dealID,
                    merchant: checkmerchatlevel.name,
                    merchantlogo: checkmerchatlevel.logo,
                    address:checkmerchatlevel.address,
                    ststus:'available',
                    created_at: moment.utc().format("YYYY-MM-DD HH:mm:ss")
                })
                dealidObj.save(function(err) {
                    if (err) {
                        return res.status(500).json({
                            'message': 'Error in processigetDealHistoryng your request',
                            'success': false,
                            'data': null
                        });
                    }
                    var tweetObj = {
                        'nextdate': moment(checkmerchatlevel.nextdate).add('days', req.body.settimeduration).toDate()
                    };
                    VenderProfile.findOneAndUpdate({
                        'venderID': venderID
                    }, {
                        '$set': tweetObj
                    }, {
                        'new': true
                    }, function(err, tweet) {
                        if (err) {exports.getDealHistory = function(req, res, next) {
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
                            return res.status(500).json({
                                'message': 'Error in processing your request',
                                'success': false,
                                'data': null
                            });
                        }

                    });

                });

            }

        }).sort([
            ['dealID', -1]
        ]);

    });
}

exports.getAvailableDeals = function(req, res) {
    DealDataId.find({status:'available'},function(err, availabledeals) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'message': 'Here are your available deals. Enjoy!',
                'success': true,
                'data': availabledeals
            });
        });
};
exports.dealManagementLifeCircle = function(req, res) {
    DealDataId.find({},function(err, dealsid) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'message': 'Here are your available deals. Enjoy!',
                'success': true,
                'data': dealsid
            });
        });
};
exports.dealDataID = function(req, res) {
    DealDataId.find({},function(err, dealsid) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'message': 'Here are your available deals. Enjoy!',
                'success': true,
                'data': dealsid
            });
        });
};
exports.dealVerification = function(req, res) {
    
    DealDataId.find({status:'create'},function(err, dealverication) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'message': 'Here are your available deals. Enjoy!',
                'success': true,
                'data': dealverication
            });
        });
};    