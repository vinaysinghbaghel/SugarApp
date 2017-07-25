'use strict';

var mongoose = require('mongoose');

/* Define the schema for our UserProfile model */

var userprofileSchema = new mongoose.Schema({
    custID: {
        type: String,
        unique:true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true
    },
    phonenumber: {
        type: Number,
        trim: true
    },
    img: {
        data: Buffer, 
        contentType: String,
    },
    password: {
        type: String,
    },
    membersince: {
          type: Date,
        'default': Date.now,
    },
    logindata: {
         type: Date,
        'default': Date.now
    },
    favourites: {
         type:String,
    },
    preferenceslocation: {
         type:String,
    },
    merchant: {
         type:String,
    }, 
    food: {
         type:String,
    }, 
    broadcastmerchant: {
         type:String,
    },                      
    homelocation: {
        type: Array,
        // coordinates: [Number],
    },
    worklocation: {
        type: Array,
        // coordinates: [Number],
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

/* Create the model for UserProfile and expose it to our app */

module.exports = mongoose.model('Userprofile', userprofileSchema);
