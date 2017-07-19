'use strict';

var mongoose = require('mongoose');

/* Define the schema for our SpecialDealAllocation model */

var specialdealallocationSchema = new mongoose.Schema({

    dealid: {
        type: String,
    },
    trxid: {
        type: String,
    },
    numberofdeals: {
        type: Number,
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

/* Create the model for SpecialDealAllocation and expose it to our app */

module.exports = mongoose.model('SpecialDealAllocation', specialdealallocationSchema);
