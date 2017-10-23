const CryptoJS = require("crypto-js");
let Users = require('./../models/Users');

exports.firechat = function(req, res) { 

var user = req.session.user;
var email = req.session.user.email;
var password  = CryptoJS.AES.decrypt(user.password, user.useruuid).toString(CryptoJS.enc.Utf8);
console.log(user,'hiiiiii user id is commmmmmmmmmmmmmmmmmmmmmmmmmm')
// let userpassword = CryptoJS.AES.decrypt(user.password, user.useruuid).toString(CryptoJS.enc.Utf8);
//    Users
//         .find({email:email}, function(err,userdata) {
//             if (err) {
//                 return res.status(500).json({
//                     'message': 'Error in processing your request',
//                     'success': false,
//                     'data': []
//                 });
//             }
            return res.json({
                'message': 'Here are your vendorprofile. Enjoy!',
                'success': true,
                 'email': email,
                 'password':password,
            });
        // });
   
//     admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://sugarapp-7e23e.firebaseio.com/"});
// let uid =  uuid.v4();
// var additionalClaims = {
//   premiumAccount: true
// };

// admin.auth().createCustomToken(uid, additionalClaims)
//   .then(function(customToken) {
//       console.log(customToken,'customToken')
//       return res.json({
//                         'message': 'send token client side',
//                         'success': true,
//                         customToken:customToken
//                     });
//     // Send token back to client
//   })
//   .catch(function(error) {
//     console.log("Error creating custom token:", error);
//   });
   
};           
