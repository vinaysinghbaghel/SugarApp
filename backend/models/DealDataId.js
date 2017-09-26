'use strict';

var mongoose = require('mongoose');

/* Define the schema for our DealDataId model */

var dealdataidSchema = new mongoose.Schema({
    dealID: {
        type: String
    },
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
    address:{
        type: String,
    },
    dealterms: {
        type: String,
    },
    setdate: {
        type: String,
    },
    settime: {
        type: String,
    },
    endtime: {
        type: String,
    },
    numbersofcoupons: {
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
    status:{
     type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    }

});

/* Create the model for DealDataId and expose it to our app */

module.exports = mongoose.model('DealDataId', dealdataidSchema);
