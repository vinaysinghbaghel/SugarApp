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
            Users.find({email:email}).exec(function(err, user){
             if(user.length === 0){
                console.log("Email not registered.") 
                return res.json({"success" : false, message :  "Email not registered."});

             }if(user[0].password !== password) {
                console.log("Incorrect password entered.")
                return res.json({"success" : false, message :  "Incorrect password entered."});
             }else{
              if (user.passwordchanged != 0) {

                //   req.session.userid = user[0].id;
                //   console.log(req.session.userid,'id in sessionsssssssssssssssssssssssssssssssss')

                 return res.json({"success" : true});
              
              } else {
                var email = req.body.email;
                console.log(email,'email in server side...........................')
                 return res.se({"success" : true,email:email});
            }

           }         
           });
        } catch (e) {
            // res.redirect('/partner?fail=1');
            console.log(e,'e for error')
        }

}
    exports.changePassword = function(req, res) {
        try {

            // var id = req.session.userid;
            // var result = await r.table('usermaster').filter({ 'id': id }).coerceTo('array').run(connection);
            // let oldpassword = req.body.oldpassword;
            // var userpassword = CryptoJS.AES.decrypt(result[0].password, result[0].userguid).toString(CryptoJS.enc.Utf8);
            // if (userpassword !== oldpassword) {
            //     return res.render('BankCrmLogin', {
            //         passerror: 'password not match ',
            //         me: req.session.user
            //     });
            // }
            // if (req.body.newpassword != req.body.confirmpassword) {
            //     return res.render('updatepassword', {
            //         passerror: 'New password and confirm password does not match',
            //         me: req.session.user
            //     });
            // } else {
            //     let bankuser = await UserService.changepassword(result[0].email, req.body.newpassword);
            //     res.render('BankCrmLogin', {
            //         passwordsuccess: 'Password successfully changed',
            //         me: req.session.user
            //     })
            // }
        } catch (e) {
            console.error(e.stack);
            // res.send({
            //     code: Code.errors.unknown,
            //     message: e.stack
            // });
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
