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
    let randomstrings = randomString({length: 10});
    let uuids = uuid();
    let userpass= CryptoJS.AES.encrypt(uuids,randomstrings).toString();
    console.log(userpass,'password of users')

// setup email data with unicode symbols
let mailOptions = {
    from: 'Sugar@wishto.co', // sender address
    to: body.userid, // list of receivers
    subject: 'SugarApp Credentials', // Subject line
    html: 'Welcome to SugarApp,<br/> Your credentials are <br/> username: ' + body.userid + '<br/> password: '+'wishto@23'+'<br/> url:',
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
        'password':'wishto@23',
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
                'data': userObj
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
             return res.json({
             success: false,
             "message": err
             });
             }   
             if(user.length === 0){
                console.log("Email not registered.") 
                return res.json({"success" : false, message :  "Email not registered."});

             }if(user[0].password !== password) {
                console.log("Incorrect password entered.")
                return res.json({"success" : false, message :  "Incorrect password entered."});
             }else{
                 
            //   if (user.passwordchanged != 0) {
             console.log(user,'user is always in controlllerrrrrrrr')
              req.session.userid = user[0]._id;


              return res.json({"success" : true,user:user[0]});
              
            //   } else {
            //     var email = req.body.email;
            //      console.log(user,'user is elseseeeeeeeeeeeeeeeeeeeeeeeeeeee')
            //     console.log(email,'email in server side...........return ................')
                //  res.se({"success" : true,email:email});
            // }

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
            console.log(id,'vinay singh baghellllllllllllllllllllllllllllllllllllllllll')
            let email = req.body.email;
            let password = req.body.password;
            Users.find({_id:id}).exec(function(err, user){
             if (err) {
             return res.json({success: false, "message": err });
            }else if(user){
            // var salt = new Buffer(user.salt, 'base64');
            // var p = crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
            // if(password === user[0].password) {
            // var s = crypto.randomBytes(16).toString('base64');
            //     salt = new Buffer(s, 'base64');
            //     var encryptNewPwd = crypto.pbkdf2Sync(newpassword, salt, 10000, 64).toString('base64');
                Users.update({email:email},{password:password,passwordchanged:1},function(err,newpassword){
                    if(err){
                    res.json({success : false, message : "Erron in processing the request. Please try again."});
                    }
                    else{
                    res.json({success : true, message:"Password successfully changed."});
                    }                 
                })
            // }else{
            //     res.json({status : false, message : "Invalid old password"});
            // }
            }
            else {
            res.json({message : "Invalid username or password", success : false});
            }     
            })
        } catch (e) {
            console.error(e.stack);
            // res.send({
            //     code: Code.errors.unknown,
            //     message: e.stack
            // });
        }
    }
//  exports.logout=function(req, res) {
//         req.session.destroy((err) => {
//             "use strict";
//             console.error(err);
//         });
//         res.json({success : true});
//     }

exports.userprofiledetails = function(req, res, next) {
    try {
    console.log(req.body,'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiidata')
    let userprofiledetails = new UserProfile({
      custID:req.body.customerid,
      name:req.body.name,
      email:req.body.userid,
      phonenumber:req.body.phone,
      img:req.body.image,
      password:req.body.password,
      homelocation:req.body.homelocation,
      worklocation:req.body.worklocation

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
