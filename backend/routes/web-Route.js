'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let UserAuthenticationController = require('./../controllers/UserAuthenticationController');
let UserProfileController = require('./../controllers/UserProfileController');
let MerchantController = require('./../controllers/MerchantController');

/* Get Tweets */
// router.get('/', [
//     TweetController.getTweets
// ]);
 router.post('/userdata',UserAuthenticationController.signUp)
 router.post('/signin', UserAuthenticationController.signIn);
 router.post('/changepassword', UserAuthenticationController.changePassword);
//  router.get('/signout', UserAuthenticationController.logout);
 router.post('/api/userprofile', UserAuthenticationController.userprofiledetails);
 router.get('/api/userprofiledata',UserProfileController.getUserProfile);
 router.post('/api/userdealdetails', UserProfileController.userdealdetails);
 router.post('/api/dealhistorydata',UserProfileController.getDealHistory);
 router.post('/api/registermerchant',MerchantController.registermerchant);
 router.get('/api/vendorprofiledata',MerchantController.getVendorProfile);
 router.post('/api/regularlevelcreation',MerchantController.createRegularLevel);
 router.post('/api/jyflevelcreation',MerchantController.createJyfLevel);


// /* Update Tweet */
// router.put('/:id', [
//     TweetController.updateTweet
// ]);

// /* Delete Tweet */
// router.delete('/:id', [
//     TweetController.deleteTweet
// ]);
module.exports = router;