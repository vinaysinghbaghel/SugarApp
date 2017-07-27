'use strict';

let Users = require('./../models/Users');
let UserProfile = require('./../models/UserProfile');
const mongoose = require('mongoose');
const randomString = require('random-string');
const nodemailer = require('nodemailer');
let mail = require('../utils/mail');
const uuid = require('node-uuid');
const CryptoJS = require("crypto-js");

exports.signUp = function(req, res, next) {

    try {
    let body = req.body.user;
    let search = {email :body.userid};
    Users.findOne(search).exec(function(err, user){
    if(err) return res.json({"success" : false, message :  "Oops! Error in processing the request, Please try again."});
    if(user) return res.json({"success" : true, message :  "Userid is already registered."});
    let userpassword = randomString({length: 10});
    console.log(userpassword,'password of user')
    let uuids = uuid();
    let userpass= CryptoJS.AES.encrypt(userpassword,uuids).toString();
    
// setup email data with unicode symbols
let mailOptions = {
    from: 'Sugar@wishto.co', // sender address
    to: body.userid, // list of receivers
    subject: 'SugarApp Credentials', // Subject line
    html: 'Welcome to SugarApp,<br/> Your credentials are <br/> username: ' + body.userid + '<br/> password: '+ userpassword +'<br/> url:',
};

// send mail with defined transport object
mail.sendEmail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
    let userObj = new Users({
        'name': body.name,
        'email':body.userid,
        'phonenumber':body.phonenumber,
        'password':userpass,
        'isDelete': 0,
        'passwordchanged': 0,
        'useruuid': uuids,

    });
   
    userObj
        .save(function(err) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': null
                });
            }
            return res.json({
                'message': 'User Registered successfully',
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
exports.signIn = function(req,res,next){
     try {
            var email = req.body.email;
            var password = req.body.password;
            Users.find({email:email}).exec(function(err, user){
             if (err) {
             return res.json({ success: false, "message": err}); 
             }   
             if(user.length === 0){
                return res.json({"success" : false, message :  "Email not registered."});
             }
            let users=user[0];
            let userpassword = CryptoJS.AES.decrypt(users.password, users.useruuid).toString(CryptoJS.enc.Utf8);
            if(userpassword !== password) {
                return res.json({"success" : false, message :  "Incorrect password entered."});
             }else{
              req.session.userid = user[0]._id;
              return res.json({"success" : true,user:user[0]});
           }            
           });
        } catch (e) {
            // res.redirect('/partner?fail=1');
            console.log(e,'e for error')
        }

}
    exports.changePassword = function(req, res) {
        try {
            let id=req.session.userid ;
            let email = req.body.email;
            let password = req.body.password;
            let uuids = uuid();
            Users.find({_id:id}).exec(function(err, user){
             if (err) {
             return res.json({success: false, "message": err });
            }else if(user){
                let userpass= CryptoJS.AES.encrypt(password,uuids).toString();
                Users.update({email:email},{password:userpass,useruuid:uuids,passwordchanged:1},function(err,newpassword){
                    if(err){
                    res.json({success : false, message : "Erron in processing the request. Please try again."});
                    }
                    else{
                    res.json({success : true, message:"Password successfully changed."});
                    }                 
                })
            // }else{
            //  res.json({status : false, message : "Invalid old password"});
            // }
            }
            else {
            res.json({message : "Invalid username or password", success : false});
            }     
            })
        } catch (e) {
            console.error(e.stack);
        }
    }

exports.userprofiledetails = function(req, res, next) {
    try {

    let userprofiledetails = new UserProfile({
      custID:req.body.customerid,
      name:req.body.name,
      email:req.body.userid,
      phonenumber:req.body.phone,
      img:req.body.image,
      password:req.body.password,
      homelocation:req.body.homelocation,
      worklocation:req.body.worklocation,
      favourites:req.body.favourites,
      preferenceslocation:req.body.preferenceslocation,
      merchant:req.body.merchant,
      food:req.body.food,
      broadcastmerchant:req.body.broadcastmerchant
    })
     userprofiledetails
        .save(function(err) {
            if (err) {
                return res.status(500).json({
                    'message': 'Error in processing your request',
                    'success': false,
                    'data': null
                });
            }
            return res.json({
                'message': 'User profile created successfully',
                'success': true,
                'data': []
            });
        });
    }catch (e) {
    console.error(e.stack);

    }
};
// exports.getTweets = function(req, res, next) {
//     Tweet
//         .find({}, function(err, tweets) {
//             if (err) {
//                 return res.status(500).json({
//                     'message': 'Error in processing your request',
//                     'success': false,
//                     'data': []
//                 });
//             }
//             return res.json({
//                 'message': 'Here are your tweets. Enjoy!',
//                 'success': true,
//                 'data': tweets
//             });
//         });
// };

// exports.updateTweet = function(req, res, next) {
//     var body = req.body;
//     var tweetId = req.params.id;
//     var tweetObj = {
//         'tweet': body.tweet,
//         'updated_at': Date.now()
//     };
//     Tweet
//         .findOneAndUpdate({ '_id': tweetId }, { '$set': tweetObj }, { 'new': true }, function(err, tweet) {
//             if (err) {
//                 return res.status(500).json({
//                     'message': 'Error in processing your request',
//                     'success': false,
//                     'data': null
//                 });
//             }
//             return res.json({
//                 'message': 'Tweet updated successfully',
//                 'success': true,
//                 'data': tweet
//             })
//         });
// };

// exports.deleteTweet = function(req, res, next) {
//     var tweetId = req.params.id;

//     Tweet
//         .remove({ '_id': tweetId }, function(err) {
//             if (err) {
//                 return res.status(500).json({
//                     'message': 'Error in processing your request',
//                     'success': false,
//                     'data': null
//                 });
//             }
//             return res.json({
//                 'message': 'Tweet deleted successfully',
//                 'success': true,
//                 'data': null
//             })
//         })
// };
