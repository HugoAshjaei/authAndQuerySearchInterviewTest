'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,

    User = require('./models/user'),
    bodyParser = require('body-parser'),
    jsonwebtoken = require("jsonwebtoken");

const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};

mongoose.connect('mongodb://127.0.0.1:27017/testDB', option).then(function(){
    console.log("Successfully connected to DB!");
}, function(err) {
    console.log(err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    if (req.headers && req.headers.token) {
        // console.log(req.headers.token);
        jsonwebtoken.verify(req.headers.token   , 'RESTFULAPIs', function(err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        // console.log("Why?");
        req.user = undefined;
        next();
    }
});
var routes = require('./routes/user');
routes(app);

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log(' authService started on: ' + port);

module.exports = app;