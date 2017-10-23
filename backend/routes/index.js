'use strict';

var express = require('express');
var router = express.Router();

let UserProfileController = require('./../controllers/UserProfileController');
let MerchantController = require('./../controllers/MerchantController');
let DealManagementController = require ('./../controllers/DealManagementController');

router.post('/api/userprofileimage', UserProfileController.createUserProfile);
//  router.post('/api/userprofileimage',UserProfileController.userprofileimage);
router.post('/api/userlogin', UserProfileController.usersignin);
router.post('/api/createuserprofile', UserProfileController.updateUserProfile);
router.post('/api/createcustomervendorlist',MerchantController.venderCustomerList);
router.post('/api/createvenderredemptionlist',MerchantController.VenderRedemptionList);
router.post('/api/randomlogin',MerchantController.randomLogin);
router.post('/api/changepassword',MerchantController.changePassword);
router.post('/api/merchantlogin',MerchantController.merchantLogin);
router.post('/api/editterms',DealManagementController.editTerms);
router.post('/api/updateendtime',DealManagementController.updateEndTime);
router.post('/api/getsubscriptionlist',DealManagementController.getSubscriptionlist);
router.post('/api/getredemptionlist',DealManagementController.getRedemptionlist);
router.get('/api/getcustomerlist',DealManagementController.getCustomerlist);
router.post('/api/insertimei',DealManagementController.insertImeiNuber);
router.post('/api/createjyfdealid',DealManagementController.createJyfDealId);
router.get('/api/getalljyfdealid',DealManagementController.getAllJyfDealId)

module.exports = router;
