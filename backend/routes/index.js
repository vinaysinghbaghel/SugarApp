'use strict';

var express = require('express');
var router = express.Router();

// module.exports = function(passport){

 let UserProfileController = require('./../controllers/UserProfileController');

 router.post('/api/userprofileimage', UserProfileController.createUserProfile);
//  router.post('/api/userprofileimage',UserProfileController.userprofileimage);
 router.post('/api/userlogin', UserProfileController.usersignin);

// return router;
// }
module.exports = router;
