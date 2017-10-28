'use strict';
const express = require('express');
var app = express();
let VenderProfile = require('./../models/VenderProfile');
let DealDataId = require('./../models/DealDataId');
let LevelCreation = require('./../models/LevelCreation');
let vendorcustomerlist = require('./../models/VenderCustomerList');
const moment = require('moment');
const scheduler = require('node-schedule');
const cron = require('node-cron');
const async = require('async');
const path = require('path');
const fs = require('fs');

/* @api {post} /api/merchantid  This Api allocating level.
 * @apiName dealLevelAllocation.
 * @apiVersion 1.0.0.
 * @apiSuccess {Boolean} success true.
 * @apiSuccess {String} message Level Allocated successfully.
 * @apiError {Boolean} success false.
 * @apiError {String} message Error in processing your request.
 */
exports.dealLevelAllocation = function(req, res, next) {
    console.log(req.body,'HIIIIIIIIIIIIIIIII vinay is here and thereeeeee')
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

exports.getalltypesoflevel = function(req, res, next){
    LevelCreation.find(function(err,data){
    if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'message': 'Here are your available levels. Enjoy!',
                'success': true,
                'data': data
            });
        });

    // })

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
exports.createDealId = function (req,res){

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
        // let string = randomString({
        // length: 3
        // });
     var dealidObj = {
        'dealinfo':req.query.dealinfo,
        'dealterms':req.query.dealterms,
        'setdate':req.query.setdate,
        'settime':req.query.settime,
        'endtime':req.query.endtime,
        'image': imageurl,
        'status':'create',
        'numbersofcoupons':5
    };
    DealDataId.findOneAndUpdate({ 'dealID': req.query.dealID },{'$set': dealidObj},{'new': true    
    }, function(err, createdealID) {
        if (err) {
            return res.status(500).json({
                'message': 'Error in processing your request',
                'success': false,
                'data': null
            });
        }
        return res.json({
            'message': ' ID Created successfully',
            'success': true,
            'data': null
        });
    });
     });
}
 var jobDate = moment().startOf('day');
 var checkdealid = scheduler.scheduleJob('* * * * *', function() {
 var date = moment.utc().format("YYYY-MM-DD hh:mm:ss");
 var dates=  moment.utc().format("YYYY-MM-DD")
 console.log(dates,'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii dates')
 var stillUtc = moment.utc(date).toDate();
 var local = moment(stillUtc).local().format("hh:mm");
 console.log(local,'locals times is hererrerrrsefser dates')
var timeArray =[];
timeArray.push(local)
DealDataId.find({"status" : { "$in": ["create"] },
                 "settime" : { "$in":timeArray},
                 "setdate":{"$in": [dates]} 
    },function(err, data) { 
    if (err) { return res.status(500).json({'message': 'Error in processing your request','success': false,'data': []});}  
      for(var i=0;i<data.length;i++){
     DealDataId.update({dealID:data[i].dealID},{'status': 'live'
     }, function(err, tweet) {
    if (err) { return res.status(500).json({'message': 'Error in processing your request', 'success': false, 'data': null });}
    });
}
 });
 });
var checkdealid = scheduler.scheduleJob("* * * * *", function() {
     var date = moment.utc().format("YYYY-MM-DD hh:mm:ss");
     var dates=  moment.utc().format("YYYY-MM-DD")
     var stillUtc = moment.utc(date).toDate();
     var local = moment(stillUtc).local().format("hh:mm");
     var timeArrays =[];
     timeArrays.push(local)
     DealDataId.find({"status" : { "$in": ["live"] },
                 "endtime" : { "$in":timeArrays},
                 "setdate":{"$in": [dates]} 
    },function(err, data) { 
    if (err) { return res.status(500).json({'message': 'Error in processing your request','success': false,'data': []});}   
      for(var i=0;i<data.length;i++){
     DealDataId.update({dealID:data[i].dealID},{'status': 'close'
     }, function(err, tweet) {
    if (err) { return res.status(500).json({'message': 'Error in processing your request', 'success': false, 'data': null });}
    });
}
 });
     });
 exports.searchdealsID = function(req,res){
  DealDataId.find({status:'live',address:req.query.location},function(err, dealsid) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            console.log(dealsid,'live data is heree')
            return res.json({
                'message': 'Here are your Live deals ID. Enjoy!',
                'success': true,
                'data': dealsid
            });
        });
};
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
exports.editTerms = function(req,res){
try {
let dealID = req.body.dealID;
let dealtermsobj ={'dealterms':req.body.dealterms};
DealDataId.findOneAndUpdate({dealID:dealID},{ $set: dealtermsobj},{new:true},function(err,data){
    if(err){
    res.json({
        success : false,
        message : "Error in processing the request. Please try again."
    });
    }else{
        res.json({
        success : true,
        message : "Deal terms updated successfully."
        })
        
    }

})
}catch (e){
console.error(e);
}
};

exports.updateEndTime = function(req,res){

    try{
        let dealID = req.body.dealID;
        let dealendtimeObj = {'endtime':req.body.endtime}
        DealDataId.findOneAndUpdate({dealID:dealID},{ $set: dealendtimeObj},{new:true},function(err,changeendtime){
         if(err){
             res.json({
                 success : false,
                 message : "Error in processing the request. please try again."
             });
         }else{
             res.json({
             success : true,
             message : "End time updated successfully"
             })
         }
        })

    }catch(e){
     console.log(e);
}
};
exports.getSubscriptionlist = function(req,res){
    try{
        let dealID = req.body.dealID;
         console.log('dealID',dealID);
        DealDataId.find({dealID:dealID},function(err,subscriptionlist){
            if(err){
             res.json({
                success : false,
                message : "Error in processing the request. please try again." 
             })
            }else{
             res.json({
                 success : true,
                 data:subscriptionlist[0].subscriptionlist
             })
            }
        })
    }catch(e){
        console.log(e);
    }
};
exports.getRedemptionlist = function(req,res){
    try{
        let dealID = req.body.dealID;
         console.log('dealID',dealID);
        DealDataId.find({dealID:dealID},function(err,redemptionlist){
            if(err){
             res.json({
                success : false,
                message : "Error in processing the request. please try again." 
             })
            }else{
             res.json({
                 success : true,
                 data:redemptionlist[0].redemptionlist
             })
            }
        })
    }catch(e){
        console.log(e);
    }
};
exports.getCustomerlist = function(req,res){
    try{
        async.parallel([
    function(callback) {
    vendorcustomerlist.find(function(err,customerlist){
     if(err){
      res.json({
          success : false,
          message : "Error in processing the request. please try again."
      })
     }else{
         res.json({
             success:true,
             customerlist:customerlist
         })

     }
     })
    },
    function(callback) {
        vendorcustomerlist.aggregate([{
        $project : {
            year : {
                $year : "$date"
            },
            month : {
                $month : "$date"
            },
            week : {
                $week : "$date"
            },
            day : {
                $dayOfWeek : "$date"
            },
            _id : 1,
            weight : 1
        }
    }, {
        $group : {
            _id : {
                year : "$year",
                month : "$month",
                week : "$week",
                day : "$day"
            },
            totalWeightDaily : {
                $sum : "$weight"
            }
        }
    },
    {
        $group : {

            _id : {
                year : "$_id.year",
                month : "$_id.month",
                week : "$_id.week"
            },
            totalWeightWeekly : {
                $sum : "$totalWeightDaily"
            },
            totalWeightDay : {
                $push : {
                    totalWeightDay : "$totalWeightDaily",
                    dayOfWeek : "$_id.day"
                }
            }
        }
    }, {
        $match : {
            "_id.month" : 1
        }
    }
])
    }
], function(err, results) {
    console.log("result of day month",results)
    // results now equals to: [one: 'abc\n', two: 'xyz\n']
});
    
    }catch(e){

    }
};
exports.insertImeiNuber = function(req,res){
try{
        let email = req.body.email;
        let imeiObj = {'imei':req.body.imei}
        VenderProfile.findOneAndUpdate({email:email},{ $set: imeiObj},{new:true},function(err,insertimei){
         if(err){
             res.json({
                 success : false,
                 message : "Error in processing the request. please try again."
             });
         }else{
             res.json({
             success : true,
             message : "Imei insert successfully"
             })
         }
        })

    }catch(e){
     console.log(e);
}

}


exports.createJyfDealId = function (req,res){
     var dealidObj = {
        'dealinfo':req.body.dealinfo,
        'dealterms':req.body.dealterms,
        'enddate':req.body.enddate,
        'vendorcustomerlist':req.body.vendorcustomerlist,
        'status':'live',
    };
    DealDataId.findOneAndUpdate({ 'dealID': req.body.dealID },{'$set': dealidObj},{'new': true    
    }, function(err, createdealID) {
        if (err) {
            return res.status(500).json({
                'message': 'Error in processing your request',
                'success': false,
                'data': null
            });
        }
        return res.json({
            'message': ' ID Created successfully',
            'success': true,
            'data': null
        });
    });
}
var checkdealid = scheduler.scheduleJob("* * * * *", function() {
     var date = moment.utc().format("YYYY-MM-DD hh:mm:ss");
     var dates=  moment.utc().format("YYYY-MM-DD")
     var stillUtc = moment.utc(date).toDate();
     var local = moment(stillUtc).local().format("hh:mm");
     var timeArrays =[];
     timeArrays.push(local)
     DealDataId.find({"status" : { "$in": ["live"] },
                 "enddate":{"$in": [dates]} 
    },function(err, data) { 
    if (err) { return res.status(500).json({'message': 'Error in processing your request','success': false,'data': []});}   
      for(var i=0;i<data.length;i++){
     DealDataId.update({dealID:data[i].dealID},{'status': 'close'
     }, function(err, tweet) {
    if (err) { return res.status(500).json({'message': 'Error in processing your request', 'success': false, 'data': null });}
    });
}
 });
     });

exports.getAllJyfDealId = function(req,res){
    DealDataId.find({idtype:"jyf"}, function(err, AllJyfDealId) {
        if (err) {
            return res.status(500).json({
                'message': 'Error in processing your request',
                'success': false,
                'data': null
            });
        }
        return res.json({
            'message': ' get all JYF DealID',
            'success': true,
            'data': AllJyfDealId
        });
    }).sort([
                        ['dealID', -1]
                    ]);
}
exports.getDealsByMerchant = function(req, res) {
    DealDataId.find({merchant:req.query.merchant},function(err, dealsid) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': []
                });
            }
            return res.json({
                'message': 'Get All Deals ID By Merchant Name',
                'success': true,
                'data': dealsid
            });
        });
};
exports.getDealsByDates = function(req,res){
    console.log("hi vinay how are you ")
   DealDataId.aggregate([
    // First total per day. Rounding dates with math here
    { "$group": {
        "_id": {
            "$add": [
                { "$subtract": [
                    { "$subtract": [ "$created_at", new Date(0) ] },
                    { "$mod": [
                        { "$subtract": [ "$created_at", new Date(0) ] },
                        1000 * 60 * 60 * 24
                    ]}                        
                ]},
                new Date(0)
            ]
        },
        "week": { "$first": { "$week": "$created_at" } },
        "month": { "$first": { "$month": "$created_at" } },
        "total": { "$sum": "$num" }
    }},

    // Then group by week
    { "$group": {
        "_id": "$week",
        "month": { "$first": "$month" },
        "days": {
            "$push": {
                "day": "$_id",
                "total": "$total"
            }
        },
        "total": { "$sum": "$total" }
    }},

    // Then group by month
    { "$group": {
        "_id": "$month",
        "weeks": {
            "$push": {
                "week": "$_id",
                "total": "$total",
                "days": "$days"
            }
        },
        "total": { "$sum": "$total" }
    }}
])
}    
// module.exports=exports;