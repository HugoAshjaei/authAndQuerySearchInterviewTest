'user strict';
var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    hash_password: {
        type: String
    },
    lat: {
        type: Float,
        required: true
    },
    long: {
        type: Float,
        required: true
    },
    jobTitle: {
        type: String,
        lowercase: true,
        required: true
    },
    rate: {
        type: Float,
        default: 0
    }
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password, function (err, result) {
        //
    });
};

mongoose.model('User', UserSchema);