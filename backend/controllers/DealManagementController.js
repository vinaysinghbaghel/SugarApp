'use strict';
let VenderProfile = require('./../models/VenderProfile');
let DealDataId = require('./../models/DealDataId');
//const moment = require('moment');

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
        for (var i = 0; i < req.body.setnumberofdeals; i++) {
            DealDataId.find(function(err, dataid) {
                if (err) {
                    return res.status(500).json({
                        'message': 'Error in processing your request',
                        'success': false,
                        'data': []
                    });
                }

                if (dataid.length > 0) {
                    var partneridlength = dataid[0].dealID.length;
                    var increment = parseInt(Number(dataid[0].dealID.substring(partneridlength - 3)))
                    increment += 1;
                    if (increment < 9) {
                        increment = "00" + increment;
                    } else if (increment < 99) {
                        increment = "0" + increment;
                    }
                    dealID = venderID + increment;
                    console.log(dealID, 'inner deal id is here')
                } else {
                    dealID = venderID + "000";
                }
                let dealidObj = new DealDataId({
                    dealID: dealID,
                    merchant: checkmerchatlevel.name,
                    merchantlogo: checkmerchatlevel.logo,
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
                        if (err) {
                            return res.status(500).json({
                                'message': 'Error in processing your request',
                                'success': false,
                                'data': null
                            });
                        }

                    });

                });


            }).sort([
                ['created_at', -1]
            ]);
        }

    });
}