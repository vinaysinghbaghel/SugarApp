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
    longitude: {
        type: String,
    },
    latitude: {
        type: String,
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
    merchantjyflevel:{
    type: String,
    },
    password: {
        type: String,
    },
     passwordchanged:{
       type:String,
     },
    imei: {
         type:Array,
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
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    }

});

/* Create the model for VenderProfile and expose it to our app */

module.exports = mongoose.model('VendorProfile', venderprofileSchema);
