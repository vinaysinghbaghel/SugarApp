'use strict';

let Users = require('./../models/Users');
let UserProfile = require('./../models/UserProfile');
let VenderProfile = require('./../models/VenderProfile');
let LevelCreation = require('./../models/LevelCreation');
let Jyf = require('./../models/Jyf');
let DealDataId = require('./../models/DealDataId');
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
const Schema = mongoose.Schema;
const moment = require('moment');
const scheduler = require('node-schedule');
const NodeGeocoder = require('node-geocoder');
const config = require('../config/config');
const venderCustomerList = require('./../models/VenderCustomerList');
const userDealHistory = require('./../models/UserDealHistory');
const async = require('async');



exports.registermerchant = function(req, res, next) {

    try {
        let search = {
            email:  req.query.email
        };
        VenderProfile.findOne(search).exec(function(err, user) {
            console.log(err,'some erorrrorororo is have');
            if (err) return res.json({
                "success": false,
                message: "Oops! Error in processing the request, Please try again."
            });
            if (user) return res.json({
                "success": true,
                message: "Userid is already registered."
            });
        var lat = req.query.Lat;
        var lag = req.query.Lng;
        var options = {
            provider: 'google',
            httpAdapter: 'https',
            apiKey: config.google.serverKey,
            formatter: null
        };
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
            var password = 'Sug'+string;
            var merchantid = req.query.name.toString().replace(/ /g, '').toUpperCase().substring(0, 1) + time.substring(2, 5) + string;
            req.session.merchantid = merchantid;
            // setup email data with unicode symbols
            let mailOptions = {
                from: 'Sugar@wishto.co', // sender address
                to: req.query.email, // list of receivers
                subject: 'Merchant Credentials', // Subject line
                html: 'Welcome to SugarApp,<br/> Your credentials are <br/> username: ' + req.query.email + '<br/> password: ' + password + '<br/> url:',
            };

            // send mail with defined transport object
            mail.sendEmail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            console.log(req.query,'dataa   im merchatttttttttttttttttttttttttt')
            let merchantObj = new VenderProfile({
                venderID: merchantid,
                logo: imageurl,
                name: req.query.name,
                email: req.query.email,
                password:password,
                imei:0,
                contactnumber: req.query.contactnumber,
                contactperson: req.query.contactperson,
                address: req.query.address,
                merchantcategory: req.query.merchantcategory,
                merchantlevel: req.query.merchantlevel,
                merchantjyflevel:req.query.merchantjyflevel,
                longitude: req.query.Lng,
                latitude: req.query.Lat,
                nextdate: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
                created_at: moment.utc().format("YYYY-MM-DD HH:mm:ss")
            });
            req.session.data = {
                name: req.query.name,
                address:req.query.address
            }
            merchantObj
                .save(function(err) {
                    if (err) {
                        return res.status(500).json({
                            'message': 'Error in processing your request',
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
        })
        setTimeout(function() {
            exports.createDealId(req, res, next);
        }, 1000);
         setTimeout(function() {
            exports.createJyfDealId(req, res, next);
        }, 1200);
        });
    } catch (e) {
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
    let jyflevel = new Jyf({
    levelname:req.body.jyfname,
    setnumberofdeals:req.body.jyfsetnumberdeals,
    settimeduration:req.body.jyfsettimeduration
    })
      jyflevel
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

 exports.createDealId = function(req, res, next) {
    var merchantleve = 0;
    var dealID;
    var venderID = req.session.merchantid;

    VenderProfile.findOne({ venderID: venderID}, function(err, checkmerchatlevel) {
        if (err) {
            return res.status(500).json({
                'message': 'Error in processing your request',
                'success': false,
                'data': {}
            });
        }
        if (checkmerchatlevel.merchantlevel == checkmerchatlevel.merchantlevel) {
            LevelCreation.findOne({levelname: checkmerchatlevel.merchantlevel }, function(err, checklevel) {
                if (err) {
                    return res.status(500).json({
                        'message': 'Error in processing your request',
                        'success': false,
                        'data': {}
                    });
                }
                    var incre;
                    DealDataId.find(function(err, dataid) {
                        if (err) {
                            return res.status(500).json({
                                'message': 'Error in processing your request',
                                'success': false,
                                'data': {}
                            });
                        }
                        for (var i = 1; i <= checklevel.setnumberofdeals; i++) {
                        if (dataid.length > 0) {
                            var partneridlength = dataid[0].dealID.length;
                            var increment = parseInt(Number(dataid[0].dealID.substring(partneridlength - 3)))
                            incre = increment + i;
                            if (increment < 9) {
                                increment = "00" + incre;
                            } else if (increment < 99) {
                                increment = "0" + incre;
                            }
                            dealID = "R" + venderID + increment;
                            console.log(dealID, 'inner deal id is here')
                        } else {
                            dealID = venderID + "000";
                        }
                        let dealidObj = new DealDataId({
                            dealID: dealID,
                            merchant: req.session.data.name,
                            merchantlogo: req.session.data.logo,
                            status:'available',
                            address:req.session.data.address,
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
                                'nextdate': moment(checkmerchatlevel.nextdate).add('days', checklevel.settimeduration).toDate()
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
                     }

                    }).sort([
                        ['dealID', -1]
                    ]);
            })

        }

    });
}
// scheduler.scheduleJob('10 * * * * *',function(req,res,next){
 var jobDate = moment().startOf('day');
 var checknexted = scheduler.scheduleJob(jobDate, function(req, res, next) {
     var dealID;
     VenderProfile.find(function(err, checknextdate) {
         if (err) {
             return res.status(500).json({
                 'message': 'Error in processing your request',
                 'success': false,
                 'data': []
             });
         }
         var today = moment.utc().format("YYYY-MM-DD");
         var newdate;
         for (var i = 0; i < checknextdate.length; i++) {
             var datedata = checknextdate[i];
             var month = datedata.nextdate.getUTCMonth() + 1; //months from 1-12
             var day = datedata.nextdate.getUTCDate();
             var year = datedata.nextdate.getUTCFullYear();
             if (day < 10) {
                 day = '0' + day
             }
             if (month < 10) {
                 month = '0' + month
             }
             newdate = year + "-" + month + "-" + day;
             if (newdate == today) {
                 var venderID = datedata.venderID
                 console.log(datedata, 'data is here and theree')
                 VenderProfile.findOne({
                     venderID: venderID
                 }, function(err, checkmerchatlevel) {
                     if (err) {
                         return res.status(500).json({
                             'message': 'Error in processing your request',
                             'success': false,
                             'data': []
                         });
                     }
            if (checkmerchatlevel.merchantlevel == checkmerchatlevel.merchantlevel) {
             LevelCreation.findOne({levelname: checkmerchatlevel.merchantlevel }, function(err, checklevel) {
                if (err) {
                    return res.status(500).json({
                        'message': 'Error in processing your request',
                        'success': false,
                        'data': {}
                    });
                }
                    var incre;
                    DealDataId.find(function(err, dataid) {
                        if (err) {
                            return res.status(500).json({
                                'message': 'Error in processing your request',
                                'success': false,
                                'data': []
                            });
                        }
                        for (var i = 1; i <= checklevel.setnumberofdeals; i++) {
                        if (dataid.length > 0) {
                            var partneridlength = dataid[0].dealID.length;
                            var increment = parseInt(Number(dataid[0].dealID.substring(partneridlength - 3)))
                            incre = increment + i;
                            if (increment < 9) {
                                increment = "00" + incre;
                            } else if (increment < 99) {
                                increment = "0" + incre;
                            }
                            dealID = venderID + increment;
                            console.log(dealID, 'inner deal id is here')
                        } else {
                            dealID = venderID + "000";
                        }
                        let dealidObj = new DealDataId({
                            dealID: dealID,
                            merchant: datedata.name,
                            merchantlogo: datedata.logo,
                            ststus:'available',
                            address:datedata.address,
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
                                'nextdate': moment(checkmerchatlevel.nextdate).add('days', checklevel.settimeduration).toDate()
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
                     }

                    }).sort([
                        ['dealID', -1]
                    ]);
                  })

                }   
                    
                });
             }
         }
     });
 });
exports.createJyfDealId = function(req, res, next) {
    var merchantleve = 0;
    var dealID;
    var venderID = req.session.merchantid;

    VenderProfile.findOne({ venderID: venderID}, function(err, checkmerchatlevel) {
        if (err) {
            return res.status(500).json({
                'message': 'Error in processing your request',
                'success': false,
                'data': {}
            });
        }
        if (checkmerchatlevel.merchantjyflevel == checkmerchatlevel.merchantjyflevel) {
            Jyf.findOne({levelname: checkmerchatlevel.merchantjyflevel }, function(err, checklevel) {
                console.log("checklevelhiiiiiiiiiiiiiiiiiiiiii",checklevel)
                if (err) {
                    return res.status(500).json({
                        'message': 'Error in processing your request',
                        'success': false,
                        'data': {}
                    });
                }
                    var incre;
                    DealDataId.find(function(err, dataid) {
                        if (err) {
                            return res.status(500).json({
                                'message': 'Error in processing your request',
                                'success': false,
                                'data': {}
                            });
                        }
                        for (var i = 1; i <= checklevel.setnumberofdeals; i++) {
                        if (dataid.length > 0) {
                            var partneridlength = dataid[0].dealID.length;
                            var increment = parseInt(Number(dataid[0].dealID.substring(partneridlength - 3)))
                            incre = increment + i;
                            if (increment < 9) {
                                increment = "00" + incre;
                            } else if (increment < 99) {
                                increment = "0" + incre;
                            }
                            dealID = "J" + venderID + increment;
                            console.log(dealID, 'inner deal id is here')
                        } else {
                            dealID = venderID + "000";
                        }
                        let dealidObj = new DealDataId({
                            dealID: dealID,
                            merchant: req.session.data.name,
                            merchantlogo: req.session.data.logo,
                            status:'available',
                            idtype: 'jyf',
                            address:req.session.data.address,
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
                                'nextdate': moment(checkmerchatlevel.nextdate).add('days', checklevel.settimeduration).toDate()
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
                     }

                    }).sort([
                        ['dealID', -1]
                    ]);
            })

        }

    });
}
// scheduler.scheduleJob('10 * * * * *',function(req,res,next){
 var jobDate = moment().startOf('day');
 var checknexted = scheduler.scheduleJob(jobDate, function(req, res, next) {
     var dealID;
     VenderProfile.find(function(err, checknextdate) {
         if (err) {
             return res.status(500).json({
                 'message': 'Error in processing your request',
                 'success': false,
                 'data': []
             });
         }
         var today = moment.utc().format("YYYY-MM-DD");
         var newdate;
         for (var i = 0; i < checknextdate.length; i++) {
             var datedata = checknextdate[i];
             var month = datedata.nextdate.getUTCMonth() + 1; //months from 1-12
             var day = datedata.nextdate.getUTCDate();
             var year = datedata.nextdate.getUTCFullYear();
             if (day < 10) {
                 day = '0' + day
             }
             if (month < 10) {
                 month = '0' + month
             }
             newdate = year + "-" + month + "-" + day;
             if (newdate == today) {
                 var venderID = datedata.venderID
                 console.log(datedata, 'data is here and theree')
                 VenderProfile.findOne({
                     venderID: venderID
                 }, function(err, checkmerchatlevel) {
                     if (err) {
                         return res.status(500).json({
                             'message': 'Error in processing your request',
                             'success': false,
                             'data': []
                         });
                     }
            if (checkmerchatlevel.merchantjyflevel == checkmerchatlevel.merchantjyflevel) {
             Jyf.findOne({levelname: checkmerchatlevel.merchantjyflevel }, function(err, checklevel) {
                if (err) {
                    return res.status(500).json({
                        'message': 'Error in processing your request',
                        'success': false,
                        'data': {}
                    });
                }
                    var incre;
                    DealDataId.find(function(err, dataid) {
                        if (err) {
                            return res.status(500).json({
                                'message': 'Error in processing your request',
                                'success': false,
                                'data': []
                            });
                        }
                        for (var i = 1; i <= checklevel.setnumberofdeals; i++) {
                        if (dataid.length > 0) {
                            var partneridlength = dataid[0].dealID.length;
                            var increment = parseInt(Number(dataid[0].dealID.substring(partneridlength - 3)))
                            incre = increment + i;
                            if (increment < 9) {
                                increment = "00" + incre;
                            } else if (increment < 99) {
                                increment = "0" + incre;
                            }
                            dealID = venderID + increment;
                            console.log(dealID, 'inner deal id is here')
                        } else {
                            dealID = venderID + "000";
                        }
                        let dealidObj = new DealDataId({
                            dealID: dealID,
                            merchant: datedata.name,
                            merchantlogo: datedata.logo,
                            ststus:'available',
                            address:datedata.address,
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
                                'nextdate': moment(checkmerchatlevel.nextdate).add('days', checklevel.settimeduration).toDate()
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
                     }

                    }).sort([
                        ['dealID', -1]
                    ]);
                  })

                }   
                    
                });
             }
         }
     });
 });
 exports.getmerchantlevel = function(req, res, next) {
    LevelCreation
        .find({}, function(err, merchantleveldata) {
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
                'data': merchantleveldata
            });
        });
};
exports.getjyfmerchantlevel = function(req, res, next) {
    Jyf
        .find({}, function(err, merchantleveldata) {
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
                'data': merchantleveldata
            });
        });
};
exports.venderCustomerList = function(req, res) {
    try {
        var custID = req.body.custID;
        var dealID = req.body.dealID;
        var return_data = {};
        async.parallel([
          function(callback) {
              venderCustomerList.findOne({
                    'custID': req.body.custID
                }, function(err, vcustomerlist) {
                    if (err) {
                       return callback(err);
                       
                    } else if (vcustomerlist || vcustomerlist != null) {
                        var dealobj = {
                            'custID': custID
                        }
                        venderCustomerList.update({
                            custID: custID
                        }, dealobj, function(err, tweet) {  
                        if (err) {
                         return callback(err);
                        }
                        // return_data = "customer list update successfully";
                        
                        });
                    } else {
                        let merchantObj = new venderCustomerList({
                            custID: req.body.custID,
                        });
                        merchantObj.save(function(err) {
                            
                             if (err) {
                                 return callback(err);
                             }
                        // return_data = "customer list inserted successfully";
                             callback();
                        })
                    }
                });
            },
        function(callback) {  
           userDealHistory.findOne({
                    'dealID': req.body.dealID
                }, function(err, vcustomerlist) {
                    if (err) {
                        return callback(err);
                    } else if (vcustomerlist || vcustomerlist != null) {
                        var dealobj = {
                            'dealID': req.body.dealID
                        }
                        userDealHistory.update({
                            dealID:req.body.dealID
                        }, dealobj, function(err, tweet) {
                            if (err) {
                                return callback(err);
                            }

                        });
                    } else {
                        let merchantObj = new userDealHistory({
                            dealID: req.body.dealID,
                            status:'suscribe'
                        });
                        merchantObj.save(function(err) {
                            if (err) {
                                return callback(err);
                            }
                            //  return_data = "user deal history inserted successfully";
                             callback();
                        })
                    }
                });
         },
             function(callback) {
             DealDataId.findOne({'dealID': req.body.dealID},function(err,data){
                 console.log(data.subscriptionlist.length,'hiihiihihhiihhhhh')
                 if(data.numbersofcoupons != data.subscriptionlist.length){
                DealDataId.findOne({
                    subscriptionlist: {
                        "$in": [custID]
                    }
                }, function(err, respond) {
                    if (err) {
                       return callback(err);
                    }
                    if (respond) {
                     return return_data = "This customer is already subscribed."; 
                    }
                   
                        DealDataId.update({
                            dealID: dealID
                        }, {
                            $push: {
                                subscriptionlist: req.body.custID
                            }
                        }, function(err) {
                            if (err) {
                            return callback(err);
                            }
                          return return_data = "Deal ID subscribe successfully";
                             callback();
                        })
                })
                    }else{
                      return return_data = " this id subscription limit completed .";   
                    }
             })

            }
        ], function(err) {
           if(err) console.log(err);
           return res.json({
                'message': 'success',
                'success': true,
                'data': return_data
            });
        });

    } catch (e) {
        console.log(e)
    }
};
exports.VenderRedemptionList = function(req, res) {
    try {

        var custID = req.body.custID;
        var dealID = req.body.dealID;
        //  async.parallel([

        // function(callback){
        DealDataId.find({
            subscriptionlist: {
                "$in": [custID]
            }
        }, function(err, respond) {
            if (err) {
                return res.json({
                    'message': 'Error in processing your request',
                    'success': 'false'
                })
                console.log(respond, 'respond to alll dagtaaaa')
            } else if (respond || respond != null) {
                console.log(respond, 'hiiiiiiiiiiiiiiiiiiiii')

                DealDataId.update({
                    dealID: dealID
                }, {
                    $push: {
                        redemptionlist: req.body.custID
                    }
                }, function(err, tweet) {
                    if (err) {
                        return res.status(500).json({
                            'message': 'Error in processing your request',
                            'success': false,
                        });
                    }

                });
                var dealobj = {
                    'status': 'redemption',
                    
                }
                userDealHistory.update({
                    dealID: dealID
                }, {
                    $push: {
                        redeemedat: req.body.custID
                    },
                }, dealobj,function(err, tweet) {
                    if (err) {
                        return res.status(500).json({
                            'message': 'Error in processing your request',
                            'success': false,
                        });
                    }

                });
            } else {
                return res.json({
                    'message': 'user Id is not subscription list',
                    'success': true,
                })

                //       DealDataId.update({dealID:dealID},{ $push: { subscriptionlist: req.body.custID } },function(err){
                //          if(err){
                //              console.log(err,'error is there ')
                //              return res.status(500).json({
                //                  'message':'Error in processing your request',
                //                  'success':false,
                //              })
                //          }
                //      })
            }

        })

    } catch (e) {
        console.log(e)
    }
};
exports.randomLogin = function(req,res){

     try {
        // var email = req.body.email;
        var password = req.body.password;
        VenderProfile.findOne({
            password: password
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
                    message: "Incorrect Random code entered."
                });
            }
            let userpassword = user.password;
            if (userpassword !== password) {
                return res.json({
                    "success": false,
                    message: "Incorrect Random code entered."
                });
            } else {
                req.session.password = user.password;
                return res.json({
                    "success": true,
                     message: "Now You can change random code.",
                });
            }
        });
    } catch (e) {
        // res.redirect('/partner?fail=1');
        console.log(e, 'e for error')
    }
};
exports.changePassword = function(req,res){
 try {
        let id = req.session.password;
        console.log(id,'id is there');
        let password = req.body.password;
        VenderProfile.find({
            password: id
        }).exec(function(err, user) {
            if (err) {
                return res.json({
                    success: false,
                    "message": err
                });
            } else if (user) {
                // let userpass = CryptoJS.AES.encrypt(password, uuids).toString();
                VenderProfile.update({
                    password: id
                }, {
                    password: password,
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
                    message: "Invalid Randomcode or password",
                    success: false
                });
            }
        })
    } catch (e) {
        console.error(e.stack);
    }

};

exports.merchantLogin = function(req,res){

     try {
        var email = req.body.email;
        var password = req.body.password;
        VenderProfile.findOne({
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
            let userpassword =user.password;
            // let userpassword = CryptoJS.AES.decrypt(user.password, user.useruuid).toString(CryptoJS.enc.Utf8);
            if (userpassword !== password) {
                return res.json({
                    "success": false,
                    message: "Incorrect password entered."
                });
            } else {
                return res.json({
                    "success": true,
                    message:"Merchant login successfully",
                    user: user,
                });
            }
        });
    } catch (e) {
        // res.redirect('/partner?fail=1');
        console.log(e, 'e for error')
    }

}

// module.exports = exports;