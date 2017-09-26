'use strict';

var mongoose = require('mongoose');

/* Define the schema for our UserProfile model */

var userprofileSchema = new mongoose.Schema({
    custID: {
        type: String,
        
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    useruuid:{
        type: String,
    },
    phonenumber: {
        type: Number,
        trim: true
    },
    img: {
        type:String
        // data: Buffer, 
        // contentType: String,
    },
    password: {
        type: String,
    },
    membersince: {
          type: Date,
    },
    logindata: {
         type: Date,
    },
    favourites: {
         type:String,
    },
    preferenceslocation: {
         type:Array,
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
    },
    updated_at: {
        type: Date,
    }

});

/* Create the model for UserProfile and expose it to our app */

module.exports = mongoose.model('Userprofile', userprofileSchema);
