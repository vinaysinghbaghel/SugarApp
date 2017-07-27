'use strict';

var mongoose = require('mongoose');

/* Define the schema for our VenderProfile model */

var venderprofileSchema = new mongoose.Schema({
    venderID: {
        type: String,
        unique:true
    },
    address: {
        type: String,
    },
    loc: {
        type: [Number],
    index: '2d'
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    contactperson: {
        type: String,
    },
    contactnumber: {
        type: Number,
    },
    logo: {
         type: String,
    },
    membersince: {
        type: String,
    },
    merchantcategory: {
        type: String,
    },
    merchantlevel: {
        type: String,
    },
    password: {
        type: String,
    },
    logindata: {
        type: Date,
        'default': Date.now
    },
    registeredimel: {
        type: String,
    },
    dealsavailable: {
        type: String,
    },
    dealsposted: {
        type: String,
    },
    dealsJFY:{
        type: String,
    },
    specialdealsused: {
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

/* Create the model for VenderProfile and expose it to our app */

module.exports = mongoose.model('VendorProfile', venderprofileSchema);
