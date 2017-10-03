'use strict';

var mongoose = require('mongoose');
var config = require('./config');

/**
 * Configure Mongo Database
 */

mongoose.connection.on('open', function(ref) {
    console.log('Connected to mongo server.');
});

mongoose.connection.on('error', function(err) {
    console.log('Could not connect to mongo server!');
    console.log(err);
});
// var dbURI = "mongodb://vinnu:vinnu@ds161584.mlab.com:61584/sugarapp";
// if (process.env.NODE_ENV === 'production') {
//     dbURI = process.env.MONGOLAB_URI;
// }
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
var con=''
if(env==='dev') {
    con ='mongodb://localhost:27017/sugarapp'
}
else
{
    con='mongodb://vinnu:vinnu@ds161584.mlab.com:61584/sugarapp';
}
// console.log(con);
// exports.connectionString= con;
mongoose.connect(con, function(error) {
    console.log('error', error);
});

module.exports = mongoose.connection;
// var dbURI = "mongodb://localhost/loc8r";

// }
// mongoose.connect(dbURI);
// var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
// var con=''
// if(env==='dev') {
//     con ='mongodb://localhost:27017/test'
// }
// else
// {
//     con='mongodb://address:book@ds021711.mlab.com:21711/addressbook1234';
// }
// console.log(con);
// exports.connectionString= con;