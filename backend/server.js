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
var cookieParser = require('cookie-parser');
var server = http.createServer(app);

// var serviceAccount = require("path/to/serviceAccountKey.json");
// server.listen(config.app.port);

// var io = require('socket.io')(server);
// const busboyBodyParser = require('busboy-body-parser');
// app.use(busboyBodyParser.js());
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

// app.use(bodyParser.json({
//     limit: 10000000
// }));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
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



//


app.use(express.static(path.join(__dirname, './../frontend')));
app.set('frontend', __dirname + './../frontend');

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

require('./config/passport')(passport);
/* Routes */

app.use('/', apiRoutes);
app.use('/', webRoutes).io;
app.use('/', function(req, res) {
    return res.sendFile(path.join(__dirname, './../frontend/app.html'));
});

app.listen(config.app.port, function() {
    console.log("App listening on port " + config.app.port);
})
if (app.get('env') === 'development') {
    //noinspection JSUnusedLocalSymbols
    app.use(function (err, req, res, next) {
        if (err.status !== 404) {
            console.error(err.message);
            console.error(err.stack);
        }
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
//noinspection JSUnusedLocalSymbols
app.use(function (err, req, res, next) {
    if (err.status !== 404) {
        console.error(err.message);
        console.error(err.stack);
    }
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
