'use strict';

/* Config object to be exposed to the app */

var config = {};


/* Database credentials */

config.mongodb = {};
config.mongodb.url = 'mongodb://localhost:27017/sugarapp';



config.gmail = {};
config.gmail.smtp = {};
config.gmail.smtp.username = "vinay.linkites@gmail.com";
config.gmail.smtp.password = "linkites786";

/* App config */
config.google= {
        apiKey: " AIzaSyAPMEwBPgpRwT1k3ySCFnfDA7cqEP0WbUY ",
        serverKey: "AIzaSyAPMEwBPgpRwT1k3ySCFnfDA7cqEP0WbUY",
        browserkey: "AIzaSyC5PU3fcaBBCTYX--3GixYmFm0ipjDnA3w"
    };

config.app = {};
config.app.port = process.env.PORT || 3000;

module.exports = config;
