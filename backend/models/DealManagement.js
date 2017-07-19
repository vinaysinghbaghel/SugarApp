'use strict';

var mongoose = require('mongoose');

/* Define the schema for our DealManagement model */

var dealmanagementSchema = new mongoose.Schema({
    dealsavailableid: {
        type: String,
        unique:true
    },
    dealcreateddealid: {
        type: String,
    },
    dealstack: {
        type: String,
    },
    dealposteddealid: {
        type: String,
    },
    deallivedealid: {
        type: String,
    },
    dealhistorydealid: {
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

/* Create the model for DealManagement and expose it to our app */

module.exports = mongoose.model('DealManagement', dealmanagementSchema);
