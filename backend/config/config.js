'use strict';

/* Config object to be exposed to the app */

var config = {};


/* Database credentials */

 config.mongodb = {};
// config.mongodb.url = 'mongodb://vinay singh:wishto@23@ds011374.mlab.com:11374/sugarapp';
 config.mongodb.url = 'mongodb://localhost:27017/sugarapp';



config.gmail = {};
config.gmail.smtp = {};
config.gmail.smtp.username = "wishtodemo@gmail.com";
config.gmail.smtp.password = "wishto@23";

/* App config */
config.google= {
        apiKey: " AIzaSyAPMEwBPgpRwT1k3ySCFnfDA7cqEP0WbUY ",
        serverKey: "AIzaSyAPMEwBPgpRwT1k3ySCFnfDA7cqEP0WbUY",
        browserkey: "AIzaSyC5PU3fcaBBCTYX--3GixYmFm0ipjDnA3w"
    };

config.app = {};
config.app.port = process.env.PORT || 8080;

module.exports = config;
