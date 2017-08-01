'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let UserAuthenticationController = require('./../controllers/UserAuthenticationController');
let UserProfileController = require('./../controllers/UserProfileController');
let MerchantController = require('./../controllers/MerchantController');

 router.post('/userdata',UserAuthenticationController.signUp)
 router.post('/signin', UserAuthenticationController.signIn);
 router.post('/forgotpassword', UserAuthenticationController.forgotPassword);
 router.post('/changepassword', UserAuthenticationController.changePassword);
 router.post('/api/userprofile', UserAuthenticationController.userprofiledetails);
 router.get('/api/userprofiledata',UserProfileController.getUserProfile);
 router.post('/api/userdealdetails', UserProfileController.userdealdetails);
 router.post('/api/dealhistorydata',UserProfileController.getDealHistory);
 router.post('/api/registermerchant',MerchantController.registermerchant);
 router.get('/api/vendorprofiledata',MerchantController.getVendorProfile);
 router.post('/api/regularlevelcreation',MerchantController.createRegularLevel);
 router.post('/api/jyflevelcreation',MerchantController.createJyfLevel);
 router.post('/api/dealid',UserProfileController.getDealHistory);

module.exports = router;