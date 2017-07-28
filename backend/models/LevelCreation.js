'use strict';

var mongoose = require('mongoose');

/* Define the schema for our DealLevelAllocation model */

var levelcreationSchema = new mongoose.Schema({

    levelname: {
        type: String,
    },
    setnumberofdeals: {
        type: Number,
    },
    settimeduration: {
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

/* Create the model for DealLevelAllocation and expose it to our app */

module.exports = mongoose.model('LevelCreation', levelcreationSchema);
