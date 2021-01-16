'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User');

exports.register = function(req, res) {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    // console.log(newUser);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hash_password = undefined;
            return res.json(user);
        }
    });
};

exports.login = function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        // console.log(user);
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
        }
        return res.json({ token: jwt.sign({ username: user.username, name: user.name, _id: user._id }, 'RESTFULAPIs') });
    });
};

exports.loginRequired = function(req, res, next) {
    // console.log(req.headers.token);
    if (req.user) {
        next();
    } else {

        return res.status(401).json({ message: 'Login required!' });
    }
};
exports.profile = function(req, res, next) {
    if (req.user) {
        // console.log(req.user)
        res.send(req.user);
        // next();
    }
    else {
        return res.status(401).json({ message: 'Invalid token' });
    }
};