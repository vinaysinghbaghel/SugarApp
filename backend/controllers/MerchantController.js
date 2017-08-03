'use strict';

let Users = require('./../models/Users');
let UserProfile = require('./../models/UserProfile');
let VenderProfile = require('./../models/VenderProfile');
let LevelCreation = require('./../models/LevelCreation');
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
            let rand = Math.floor(10 + Math.random() * 99);
            var time = (new Date() / 1) * 1 * rand + '';
            let string = randomString({length: 3});
            var merchantid =  req.query.name.toString().replace(/ /g, '').toUpperCase().substring(0, 1) + time.substring(2, 5) +string;
            req.session.merchantid=merchantid;
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
            loc: [parseFloat(lag),parseFloat(lat)]
            });
          req.session.data ={
              name: req.query.name,
              logo: imageurl,
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
    exports.createDealId(req,res,next); 
}, 1000,);
    // setTimeout(function(){
    //     exports.checknextdate(req,res,next);
    // },1001,);
    
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

 exports.createDealId = function (req, res, next){
 
    var merchantleve=0;
    var dealID; 
    var venderID = req.session.merchantid;
    
            VenderProfile.findOne({venderID:venderID}, function(err, checkmerchatlevel) {
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            if(checkmerchatlevel.merchantlevel=='silver'){
            LevelCreation.find({levelname:'silver'},function(err,checklevel){
            var count = 0;
            while (count < checklevel[0].setnumberofdeals){   
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}  
            DealDataId.find(function(err,dataid){ 
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            if (dataid.length > 0) {
            var partneridlength = dataid[0].dealID.length;
            var increment = Number(dataid[0].dealID.substring(partneridlength-3))
            var a = parseInt(increment);
            increment += 1;
            if(increment<9){
                increment = "00" + increment;
            }
            else if(increment<99)
            {
                increment ="0" + increment;
            }
            dealID = venderID + increment; 
            console.log(dealID,'inner deal id is here')
            } else {
            dealID = venderID + "000";
            }
            let dealidObj = new DealDataId({
              dealID:dealID,
              merchant:req.session.data.name,
              merchantlogo:req.session.data.logo,
            }) 
            dealidObj.save(function(err) {if (err) {return res.status(500).json({'message': 'Error in processigetDealHistoryng your request','success': false,'data': null}); }
            var tweetObj = {
           'nextdate': moment(checkmerchatlevel.nextdate).add('days',checklevel[0].settimeduration).toDate()
           };
            VenderProfile.findOneAndUpdate({ 'venderID': venderID }, { '$set': tweetObj }, { 'new': true }, function(err, tweet) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': null
                });
            }
            
         });    
        });
      }).sort([['created_at', -1]]);
       count++;
        }
            })
       
         }
        if(checkmerchatlevel.merchantlevel=='gold'){
            LevelCreation.find({levelname:'gold'},function(err,checklevel){ 
              var count = 0;
            while (count < checklevel[0].setnumberofdeals){   
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            DealDataId.find(function(err,dataid){ 
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            if (dataid.length > 0) {
            var partneridlength = dataid[0].dealID.length;
            var increment = Number(dataid[0].dealID.substring(partneridlength-3))
            var a = parseInt(increment);
            increment += 1;
            if(increment<9){
                increment = "00" + increment;
            }
            else if(increment<99)
            {
                increment ="0" + increment;
            }
            dealID = venderID + increment;
            console.log(dealID,'inner deal id is here')
            } else {
            dealID = venderID + "000" + increment;
            
            }

            let dealidObj = new DealDataId({
              dealID:dealID,
              merchant:req.session.data.name,
              merchantlogo:req.session.data.logo,
            })
            
            dealidObj.save(function(err) {if (err) {return res.status(500).json({'message': 'Error in processigetDealHistoryng your request','success': false,'data': null}); }
            var tweetObj = {
           'nextdate': moment(checkmerchatlevel.nextdate).add('days',checklevel[0].settimeduration).toDate()
           };
            VenderProfile.findOneAndUpdate({ 'venderID': venderID }, { '$set': tweetObj }, { 'new': true }, function(err, tweet) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': null
                });
            }
            
         });    
        });
      }).sort([['created_at', -1]]);
            }
            })
       
         }
        if(checkmerchatlevel.merchantlevel=='dimond'){
            LevelCreation.find({levelname:'dimond'},function(err,checklevel){ 
                 var count = 0;
            while (count < checklevel[0].setnumberofdeals){ 
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            DealDataId.find(function(err,dataid){ 
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            if (dataid.length > 0) {
            var partneridlength = dataid[0].dealID.length;
            var increment = Number(dataid[0].dealID.substring(partneridlength-3))
            var a = parseInt(increment);
            increment += 1;
            if(increment<9){
                increment = "00" + increment;
            }
            else if(increment<99)
            {
                increment ="0" + increment;
            }
            dealID = venderID + increment;
            console.log(dealID,'inner deal id is here')
            } else {
            dealID = venderID + "000";
            }
            let dealidObj = new DealDataId({
              dealID:dealID,
              merchant:req.session.data.name,
              merchantlogo:req.session.data.logo,
            })
            
            dealidObj.save(function(err) {if (err) {return res.status(500).json({'message': 'Error in processigetDealHistoryng your request','success': false,'data': null}); }
            var tweetObj = {
           'nextdate': moment(checkmerchatlevel.nextdate).add('days',checklevel[0].settimeduration).toDate()
           };
            VenderProfile.findOneAndUpdate({ 'venderID': venderID }, { '$set': tweetObj }, { 'new': true }, function(err, tweet) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': null
                });
            }
            
         });    
        });
      }).sort([['created_at', -1]]);
            }
            })
       
         }
       });
    
      
     }   
   // scheduler.scheduleJob('10 * * * * *',function(req,res,next){

    var jobDate = moment().startOf('day'); 
    var checknexted=scheduler.scheduleJob(jobDate,function(req,res,next){
    var dealID;
    VenderProfile.find(function(err, checknextdate) {
    if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
    var today = moment.utc().format("YYYY-MM-DD");
    var newdate;
    for(var i=0;i<checknextdate.length;i++)
        {
            var datedata=checknextdate[i];
            var month = datedata.nextdate.getUTCMonth() + 1; //months from 1-12
            var day = datedata.nextdate.getUTCDate();
            var year = datedata.nextdate.getUTCFullYear(); 
            if(day<10) { day='0'+day}
            if(month<10) { month='0'+month} 
            newdate = year + "-" + month + "-" + day;
            if(newdate == today){
              var venderID=datedata.venderID
                 console.log(datedata,'data is here and theree')
                VenderProfile.findOne({venderID:venderID}, function(err, checkmerchatlevel) {
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            if(checkmerchatlevel.merchantlevel=='silver'){
            LevelCreation.find({levelname:'silver'},function(err,checklevel){
            var count = 0;
            while (count < checklevel[0].setnumberofdeals){   
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}  
            DealDataId.find(function(err,dataid){ 
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            if (dataid.length > 0) {
            var partneridlength = dataid[0].dealID.length;
            var increment = Number(dataid[0].dealID.substring(partneridlength-3))
            var a = parseInt(increment);
            increment += 1;
            if(increment<9){
                increment = "00" + increment;
            }
            else if(increment<99)
            {
                increment ="0" + increment;
            }
            dealID = venderID + increment; 
            console.log(dealID,'inner deal id is here')
            } else {
            dealID = venderID + "000";
            }
            let dealidObj = new DealDataId({
              dealID:dealID,
              merchant:datedata.name,
              merchantlogo:datedata.logo,
            }) 
            dealidObj.save(function(err) {if (err) {return res.status(500).json({'message': 'Error in processigetDealHistoryng your request','success': false,'data': null}); }
            var tweetObj = {
           'nextdate': moment(checkmerchatlevel.nextdate).add('days',checklevel[0].settimeduration).toDate()
           };
            VenderProfile.findOneAndUpdate({ 'venderID': venderID }, { '$set': tweetObj }, { 'new': true }, function(err, tweet) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': null
                });
            }
            
         });    
        });
      }).sort([['created_at', -1]]);
       count++;
        }
            })
       
         }
        if(checkmerchatlevel.merchantlevel=='gold'){
            LevelCreation.find({levelname:'gold'},function(err,checklevel){ 
              var count = 0;
            while (count < checklevel[0].setnumberofdeals){   
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            DealDataId.find(function(err,dataid){ 
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            if (dataid.length > 0) {
            var partneridlength = dataid[0].dealID.length;
            var increment = Number(dataid[0].dealID.substring(partneridlength-3))
            var a = parseInt(increment);
            increment += 1;
            if(increment<9){
                increment = "00" + increment;
            }
            else if(increment<99)
            {
                increment ="0" + increment;
            }
            dealID = venderID + increment;
            console.log(dealID,'inner deal id is here')
            } else {
            dealID = venderID + "000";
            }

            let dealidObj = new DealDataId({
              dealID:dealID,
              merchant:req.datedata.name,
              merchantlogo:req.datedata.logo,
            })
            
            dealidObj.save(function(err) {if (err) {return res.status(500).json({'message': 'Error in processigetDealHistoryng your request','success': false,'data': null}); }
            var tweetObj = {
           'nextdate': moment(checkmerchatlevel.nextdate).add('days',checklevel[0].settimeduration).toDate()
           };
            VenderProfile.findOneAndUpdate({ 'venderID': venderID }, { '$set': tweetObj }, { 'new': true }, function(err, tweet) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': null
                });
            }
            
         });    
        });
      }).sort([['created_at', -1]]);
            }
            })
       
         }
        if(checkmerchatlevel.merchantlevel=='dimond'){
            LevelCreation.find({levelname:'dimond'},function(err,checklevel){ 
                 var count = 0;
            while (count < checklevel[0].setnumberofdeals){ 
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            DealDataId.find(function(err,dataid){ 
            if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            if (dataid.length > 0) {
            var partneridlength = dataid[0].dealID.length;
            var increment = Number(dataid[0].dealID.substring(partneridlength-3))
            var a = parseInt(increment);
            increment += 1;
            if(increment<9){
                increment = "00" + increment;
            }
            else if(increment<99)
            {
                increment ="0" + increment;
            }
            dealID = venderID + increment;
            console.log(dealID,'inner deal id is here')
            } else {
            dealID = venderID + "000";
            }
            let dealidObj = new DealDataId({
              dealID:dealID,
              merchant:datedata.name,
              merchantlogo:datedata.logo,
            })
            
            dealidObj.save(function(err) {if (err) {return res.status(500).json({'message': 'Error in processigetDealHistoryng your request','success': false,'data': null}); }
            var tweetObj = {
           'nextdate': moment(checkmerchatlevel.nextdate).add('days',checklevel[0].settimeduration).toDate()
           };
            VenderProfile.findOneAndUpdate({ 'venderID': venderID }, { '$set': tweetObj }, { 'new': true }, function(err, tweet) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': null
                });
            }
            
         });    
        });
      }).sort([['created_at', -1]]);
            }
            })
       
         }
       });
        }
    }
 });
 });
