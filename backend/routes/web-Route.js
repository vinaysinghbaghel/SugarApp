'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
// let servicejson = require('./../config/sugarapp');
let UserAuthenticationController = require('./../controllers/UserAuthenticationController');
let UserProfileController = require('./../controllers/UserProfileController');
let MerchantController = require('./../controllers/MerchantController');
let DealManagementController = require('./../controllers/DealManagementController');
let LiveDataController = require('./../controllers/LiveDataController');
let vendorsupport = require('./../controllers/VendorSupport');

 router.post('/userdata',UserAuthenticationController.signUp)
 router.post('/signin', UserAuthenticationController.signIn);
 router.get('/isloggedin', UserAuthenticationController.isloggedin);
 router.get('/logout', UserAuthenticationController.logout);
 router.post('/forgotpassword', UserAuthenticationController.forgotPassword);
 router.post('/changepassword', UserAuthenticationController.changePassword);
//  router.post('/api/userprofile', UserAuthenticationController.userprofiledetails);
 router.get('/api/userprofiledata',UserProfileController.getUserProfile);
 router.post('/api/userdealdetails', UserProfileController.userdealdetails);
 router.post('/api/dealhistorydata',UserProfileController.getDealHistory);
 router.post('/api/registermerchant',MerchantController.registermerchant);
 router.get('/api/vendorprofiledata',MerchantController.getVendorProfile);
 router.post('/api/regularlevelcreation',MerchantController.createRegularLevel);
 router.post('/api/jyflevelcreation',MerchantController.createJyfLevel);
 router.post('/api/dealid',UserProfileController.getDealHistory);
 router.get('/api/merchantprofiledata',MerchantController.getVendorProfile);
 router.get('/api/getmerchantlevel',MerchantController.getmerchantlevel);
 router.get('/api/getjyfmerchantlevel',MerchantController.getjyfmerchantlevel);
//  router.post('/api/merchantid',DealManagementController.dealLevelAllocation);
//  router.post('/api/merchantids',DealManagementController.dealLevelAllocation);
 router.post('/api/merchantsid',DealManagementController.dealLevelAllocation);
 router.post('/api/merchantsid',DealManagementController.dealLevelAllocation);
 router.get('/api/getalltypesoflevel',DealManagementController.getalltypesoflevel)
 router.post('/api/specialdealallocation',DealManagementController.specialDealAllocation);
 router.get('/api/getavailabledeals',DealManagementController.getAvailableDeals);
 router.get('/api/dealverification',DealManagementController.dealVerification);
 router.get('/api/dealmanagementlifecircle',DealManagementController.dealManagementLifeCircle);
 router.get('/api/dealdata',DealManagementController.dealDataID);
//  router.get('/api/getnewregisterusertoday',LiveDataController.getNewRegisteredUserToday);
 router.get('/api/getnewregistermerchanttoday',LiveDataController.getNewRegisteredMerchantToday);
 router.get('/api/getdealsfortoday',LiveDataController.getDealsForToday);
 router.get('/api/getdealsalive',LiveDataController.getDealsAlive);
 router.get('/api/getdealscompletedtoday',LiveDataController.getDealsCompletedToday);
 router.post('/api/getdealid',DealManagementController.searchdealsID);
 router.get('/api/gettodayregisteruser',UserProfileController.getTodayRegisterUser);
 router.get('/api/getRegisterUserTillDate',UserProfileController.getRegisterUserTillDate);
 router.get('/api/vendorsupport',vendorsupport.firechat);

module.exports =router;
 