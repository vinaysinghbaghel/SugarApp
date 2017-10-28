'use strict';

var express = require('express');
var router = express.Router();

let UserProfileController = require('./../controllers/UserProfileController');
let MerchantController = require('./../controllers/MerchantController');
let DealManagementController = require ('./../controllers/DealManagementController');
let LiveDataController = require('./../controllers/LiveDataController');

router.post('/api/userprofileimage', UserProfileController.createUserProfile);
router.post('/api/userlogin', UserProfileController.usersignin);
router.get('/api/userprofiledata',UserProfileController.getUserProfile);
router.put('/api/createuserprofile', UserProfileController.updateUserProfile);
router.get('/api/getuser',UserProfileController.getUser);
router.post('/api/createcustomervendorlist',MerchantController.venderCustomerList);
router.post('/api/createvenderredemptionlist',MerchantController.VenderRedemptionList);
router.post('/api/randomlogin',MerchantController.randomLogin);
router.post('/api/changepassword',MerchantController.changePassword);
router.post('/api/merchantlogin',MerchantController.merchantLogin);
router.put('/api/editterms',DealManagementController.editTerms);
router.put('/api/updateendtime',DealManagementController.updateEndTime);
router.post('/api/getsubscriptionlist',DealManagementController.getSubscriptionlist);
router.post('/api/getredemptionlist',DealManagementController.getRedemptionlist);
router.get('/api/getcustomerlist',DealManagementController.getCustomerlist);
router.post('/api/insertimei',DealManagementController.insertImeiNuber);
router.post('/api/createjyfdealid',DealManagementController.createJyfDealId);
router.get('/api/getalljyfdealid',DealManagementController.getAllJyfDealId)
router.post('/api/createdealid',DealManagementController.createDealId);
router.post('/api/getdealid',DealManagementController.searchdealsID);
router.get('/api/getavailabledeals',DealManagementController.getAvailableDeals);
router.post('/api/getdealsbymerchantname',DealManagementController.getDealsByMerchant);
router.get('/api/getdealsbydates',DealManagementController.getDealsByDates);
router.get('/api/getDealsByWeak',DealManagementController.getDealsByWeak);
router.get('/api/getDealsByMonth',DealManagementController.getDealsByMonth);

module.exports = router;
