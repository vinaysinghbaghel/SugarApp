'use strict';

/* Modules */
var http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const colors = require('colors');
const app = express();
let config = require('./config/config');
let apiRoutes = require('./routes/index');
let webRoutes = require('./routes/web-Route');
let mail = require('./utils/mail');
const session = require('express-session');
const busboy = require('connect-busboy');
const passport = require('passport');
let cookieParser = require('cookie-parser');
let server = http.createServer(app);
let admin = require("firebase-admin");
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger.json');
var argv = require('minimist')(process.argv.slice(2));
var swagger = require("swagger-node-express");

 var subpath = express();
/**
 * Connection to DB
 */

require('./config/db');

/**
 * Middleware
 */

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.raw({
    limit: 10000000000
}));

//////////////
app.use(cookieParser());
app.use(bodyParser.raw({
  limit: 10000000000
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json',
  limit: 10000000
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, './../frontend')));
app.set('frontend', __dirname + './../frontend');
// app.use(express.static('./../frontend/dist'));
    
app.use(function(req, res, next) {

    /* Log each request to the console */

    if (req.method === "GET") {
        console.log(colors.green(req.method), req.url);
    } else {
        console.log(colors.yellow(req.method), req.url);
    }

    /* Continue doing what we were doing and go to the route */

    next();
});
// app.use(session());
app.use(session({
    secret: "secret",
    
}));

app.use(busboy());


// passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1', apiRoutes);
require('./config/passport')(passport);
/* Routes */

app.use('/', apiRoutes);
app.use('/', webRoutes).io;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', function(req, res) {
    return res.sendFile(path.join(__dirname, './../frontend/app.html'));
});

   
app.listen(config.app.port, function() {
    console.log("App listening on port " + config.app.port);
})

module.exports = app;
