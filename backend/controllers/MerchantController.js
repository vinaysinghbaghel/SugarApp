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
var Schema = mongoose.Schema;
var moment = require('moment');
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
}, 3000,);
    
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
    var venderID = req.session.merchantid;
            VenderProfile.findOne({venderID:venderID}, function(err, checkmerchatlevel) {
             if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
             if(checkmerchatlevel.merchantlevel=='silver'){
             LevelCreation.find({levelname:'silver'},function(err,checklevel){ 
             if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
             var dealID =venderID+'000';
             let dealidObj = new DealDataId({
              dealID:dealID,
              merchant:req.session.data.name,
              merchantlogo:req.session.data.logo,
             })
            
       dealidObj.save(function(err) {if (err) {return res.status(500).json({'message': 'Error in processigetDealHistoryng your request','success': false,'data': null}); }
        var tweetObj = {
        'nextdate': moment(checkmerchatlevel.nextdate).add('days',15).toDate()
    };
 
       VenderProfile.findOneAndUpdate({ 'venderID': venderID }, { '$set': tweetObj }, { 'new': true }, function(err, tweet) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': null
                });
            }
            // if(){

            // }
            console.log('merchant profile updated successfully')
        });    
            });
            })
         }
       });
        

     }    // else{
            // LevelCreation.find({},function(err,checklevel){ 
            // if (err) {return res.status(500).json({'message': 'Error in processing your request','success': false,'data': [] });}
            // for(var i=0;i<checkmerchatlevel.length;i++){
            //    if(checkmerchatlevel[i].merchantlevel=='silver'){
            //     // console.log('')
            //      console.log('hiiiiiiiiiiiii vinay singh')
            //    for(var i=0;i<checklevel.length;i++){
            //      if(checklevel[0].levelname=='silver') { 
               
                 

            //      }    
            //    }
            //   } else if(checkmerchatlevel[i].merchantlevel=='gold'){
            //     console.log('gold is here')
            //    }  
            //  else if(checkmerchatlevel[i].merchantlevel=='platnum'){
            //     console.log('platnum is here')
            //    }  
            // }
            // console.log(checkmerchatlevel[0].merchantlevel,'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
            // if(checkmerchatlevel.merchantlevel=='silver' && checklevel.levelname == 'silver'){
            // console.log(checkmerchatlevel.merchantlevel,'Hii silver contain')
            // console.log(checklevel.levelname,'Hii silver contain')
            // }
            // }else if(checkmerchatlevel=='gold' && checklevel == 'gold'){
            // console.log(checkmerchatlevel.merchantlevel,'Hii gold contain')
            // console.log(checklevel.levelname,'Hii gold contain')
            // }else if(checkmerchatlevel=='platnum' && checklevel == 'platnum'){
            // console.log(checkmerchatlevel.merchantlevel,'Hii silver contain')
            // console.log(checklevel.levelname,'Hii silver contain')
            // }
            // })   
            // }
       