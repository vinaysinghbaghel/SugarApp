'use strict';

let Users = require('./../models/Users');
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
            console.log('password', password)
            // let users = await UserService.checkEmailNotRegister(req.body.email);
            // if (users.length === 0) {
            //     return res.render('BankCrmLogin', {
            //         email: email,
            //         password: password,
            //         emailerror: 'Email not registered'
            //     });
            // }
            Users.find({email:email}).exec(function(err, user){
             if(err) 
                return res.json({"success" : false, message :  "Oops! Error in processing the request, Please try again."});
            if(user.length === 0) 
                console.log("Email not registered.")
                return res.json({"success" : true, message :  "Email not registered."});
            // let userreport = user[0];
            // let userpassword = CryptoJS.AES.decrypt(user.password, user.useruuid).toString(CryptoJS.enc.Utf8);
            if(user[0].password !== password)
                 console.log("Incorrect password entered.")
                return res.json({"success": true,message:"Incorrect password entered"});
            
            // console.log('req.session.user', req.session.user)
            // if (userpassword !== password) {
            //     return res.render('BankCrmLogin', {
            //         email: email,
            //         passerror: 'Incorrect password entered',
            //         me: req.session.user
            //     });
            // }
            // if (user.passwordchanged != 0) {
            //     delete users[0].password;
            //     delete users[0].passwordchanged;
            //     delete users[0].passwordsalt;
            //     delete users[0].username;
            //     let mastertype = await UserService.gettype(user.TypemasterID);
            //     console.log('mastertype', mastertype)
            //     let subtype = await UserService.getsubtype(user);
            //     console.log('subtype', subtype)
            //     await users.push({ "type": subtype[0].name });
            //     await users.push({ "type": mastertype[0].name });
            //     req.session.userid = user.id;
            //     req.session.partnerid = user.partnerid;
            //     req.session.user = users;
            //     req.session.country = user.country;
            //     req.session.countrycode = user.countrycode;
            //     req.session.bank = true;
            //     req.session.soCashAdmin = true;
            //     req.session.type = subtype[0].name;
            //     req.session.viewedit = user.viewedit;
            //     if (mastertype[0].name == "soCashAdmin") {
            //         res.redirect('/admintransactionsearch');
            //     } else {
            //         if (subtype[0].name == "SuperAdmin") {
            //             res.redirect('/getusers');
            //         }
            //         if (subtype[0].name == "Admin") {
            //             res.redirect('/getusers');
            //         }
            //         if (subtype[0].name == "Staff") {
            //             res.redirect('/retrievingtransaction');
            //         }
            //     }
            // } else {
            //     var email = req.body.email;
            //     res.render('changepassword', { email: email });
            // }
           });
        } catch (e) {
            // res.redirect('/partner?fail=1');
            console.log(e,'e for error')
        }

}

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
