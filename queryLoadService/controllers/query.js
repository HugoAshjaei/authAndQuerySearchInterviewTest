'use strict';

var axios = require('axios');

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User');

exports.loginRequired = function(req, res, next) {
    const headers = {
        'Content-Type': 'application/json',
        'token': req.headers.token
    };
    var user = axios.post('http://localhost:3000/auth/profile', {}, {
        headers: headers
    }).then((response) => {
        // console.log(response);
        req.user = response.data;

        next();

    }).catch((error) => {
        console.log("Authentication failed!");
        res.status(401).send({"message": "Authentication faild!"})
        });
    // if (!user || user.message === "Login required!") {
    //     console.log("Auth problem");
    //
    // } else {
    //     console.log(user);
    // }

};

exports.nearme = function (req, res, next) {

    User.findOne({
        username: req.user.username
    }, function (err, user) {
        // console.log(user);
        if (err){
            console.log(err);
        } else {
            // console.log(user.lat, user.long);
            if (!user || user.message === "Login required!") {
                console.log("Auth problem");

            } else {
                // console.log(user);

                User.find({}).sort('-rate').exec(function (err, users) {
                    if (err) {
                        console.log(err);
                    } else {
                        var nearMe = [];
                        for (var u in users){
                            // console.log(users[u]);
                            if(getDistanceFromLatLonInKm(user.lat, user.long, users[u].lat, users[u].long)<10){
                                // console.log(users[u].username);
                                nearMe.push(users[u]);
                            }
                        }
                        res.status(200).send( nearMe);

                        // res.send(users);
                        // console.log(nearMe)
                    }
                });
            }
        }


    });



};
exports.all = function(req, res, next) {
    User.find({}).sort('-rate').exec(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.send(users);
        }
    })

};


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}