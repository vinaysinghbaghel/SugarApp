'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const UserAuthenticationController = require('./../controllers/UserAuthenticationController');

/* Get Tweets */
// router.get('/', [
//     TweetController.getTweets
// ]);
 router.post('/userdata',UserAuthenticationController.signUp)
 router.post('/signin', UserAuthenticationController.signIn);

// /* Update Tweet */
// router.put('/:id', [
//     TweetController.updateTweet
// ]);

// /* Delete Tweet */
// router.delete('/:id', [
//     TweetController.deleteTweet
// ]);
module.exports = router;