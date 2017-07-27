'use strict';

/* Modules */

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
// const MemoryStore = require('connect').session.MemoryStore
// let MemoryStore ;
// app.use(session({secret:'XASDASDA'}));
// create our app


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

app.use(bodyParser.json({
    limit: 10000000
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, './../frontend')));

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
// app.use(function (req, res, next) {
//     res.locals.session = req.session;
//     try {
//         let r = next();
//         if (r && r.catch && typeof r.catch === 'function') {
//             r.catch((err)=> {
//                 "use strict";
//                 console.error(err);
//             });
//         }
//     }
//     catch (err) {
//         console.error(err);
//     }
// });

/* Routes */

app.use('/', apiRoutes);
app.use('/', webRoutes);
app.use('/', function(req, res) {
    return res.sendFile(path.join(__dirname, './../frontend/app.html'));
});

app.listen(config.app.port, function() {
    console.log("App listening on port " + config.app.port);
})

module.exports = app;
