'use strict';

var mongoose = require('mongoose');

/* Define the schema for our UserDealHistory model */

var userdealhistorySchema = new mongoose.Schema({
    dealID: {
        type: String,
        unique:true
    },
    //  custID: {
    //     type: String,
    //     unique:true
    // },
    dealimg: {
        data: Buffer, 
        contentType: String,
    },
    dealinfo: {
        type:String,
    },
    dealterms: {
        type:Array,
    },
    dealcategory: {
        type: String,
    },
    dealtype: {
        type: String,
    },
    status: {
        type: String,
    },
    savedat: {
        type: Date,
        'default': Date.now
    },
    redeemedat: {
        type: Date,
        'default': Date.now
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

/* Create the model for UserDealHistory and expose it to our app */

module.exports = mongoose.model('UserDealHistory', userdealhistorySchema);
