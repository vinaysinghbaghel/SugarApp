'use strict';
var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
var moment = require('moment');
/* Define the schema for our VenderProfile model */

var venderprofileSchema = new mongoose.Schema({
    venderID: {
        type: String,
        // unique:true
    },
    address: {
        type: String,
    },
    // loc: {
    //     type: [lat,lag],
    // index: '2d'
    // },
    loc: {
        type: { type: String },
        coordinates: [Number],
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
        'default': moment.utc().format("YYYY-MM-DD HH:mm:ss"),
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
    nextdate:{
     type: Date,
        'default': moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    },
    created_at: {
        type: Date,
        'default': moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    },
    updated_at: {
        type: Date,
        'default':  moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    }

});

/* Create the model for VenderProfile and expose it to our app */

module.exports = mongoose.model('VendorProfile', venderprofileSchema);
