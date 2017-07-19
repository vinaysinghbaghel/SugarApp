'use strict';

var mongoose = require('mongoose');

/* Define the schema for our VenderCustomerList model */

var vendercustomerSchema = new mongoose.Schema({
    custID: {
        type: String,
        unique:true
    },
    firstdeal: {
        type: String,
    },
    dealdata: {
        type: String,
    },
    dealdata: {
        type: String,
    },
    broadcastlist: {
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

/* Create the model for VenderCustomerList and expose it to our app */

module.exports = mongoose.model('VenderCustomerList', vendercustomerSchema);
