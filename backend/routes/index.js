'use strict';

var express = require('express');
var router = express.Router();

// module.exports = function(passport){

 let UserProfileController = require('./../controllers/UserProfileController');
let MerchantController = require('./../controllers/MerchantController');
 router.post('/api/userprofileimage', UserProfileController.createUserProfile);
//  router.post('/api/userprofileimage',UserProfileController.userprofileimage);
 router.post('/api/userlogin', UserProfileController.usersignin);
 router.post('/api/createuserprofile', UserProfileController.updateUserProfile);
router.post('/api/createcustomervendorlist',MerchantController.venderCustomerList);
router.post('/api/createvenderredemptionlist',MerchantController.VenderRedemptionList)
// return router;
// }
module.exports = router;
