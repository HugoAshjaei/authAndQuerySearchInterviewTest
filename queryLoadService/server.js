'use strict';

var axios = require('axios');

var express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    User = require('./models/user'),
    bodyParser = require('body-parser');
    // jsonwebtoken = require("jsonwebtoken");

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


var routes = require('./routes/query');
routes(app);

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log(' queryLoadService started on: ' + port);

module.exports = app;