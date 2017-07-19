'use strict';

var mongoose = require('mongoose');

/* Define the schema for our Users model */

var userSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
    },
    useruuid: {
        type: String,
    },
    phonenumber: {
        type: Number,
    },
    isDelete: {
        type: Number,
    },
    passwordchanged: {
        type: Number,
    },
    password: {
        type: String,
    },
    created_at: {
        type: Date,
        'default': Date.now
    },
    updated_at: {
        type: Date,
        'default': Date.now
    }

});

/* Create the model for Users and expose it to our app */

module.exports = mongoose.model('Users', userSchema);
