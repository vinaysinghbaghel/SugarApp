'use strict';

var mongoose = require('mongoose');

/* Define the schema for our DealDataId model */

var dealdataidSchema = new mongoose.Schema({
    merchant: {
        type: String
    },
    merchantlogo: {
        data: Buffer, 
        contentType: String,
    },
    dealinfo: {
        type: String,
    },
    dealterms: {
        type: String,
    },
    duration: {
        type: String,
    },
    coupons: {
        type: String,
    },
    image: {
        data: Buffer, 
        contentType: String,
    },
    subscriptionlist: {
        type:Array,
    },
    redemptionlist: {
        type:Array,
    },
    dealstype: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
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

/* Create the model for DealDataId and expose it to our app */

module.exports = mongoose.model('DealDataId', dealdataidSchema);