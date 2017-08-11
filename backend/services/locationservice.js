"use strict";
var config = require('../../config');
var NodeGeocoder = require('node-geocoder');

let exports = {

    getAddress: function(latitude, longitude) {
        console.log('getaddress', latitude, longitude);
        var options = {
            provider: 'google',

            httpAdapter: 'https', 
            apiKey: config.google.serverKey, 
            formatter: null 
        };
        var geocoder = NodeGeocoder(options);
        var result=geocoder.reverse({lat:latitude, lon:longitude});
        return result;
    },


};

module.exports = exports;