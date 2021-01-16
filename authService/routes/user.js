'use strict';
module.exports = function(app) {
    var userHandlers = require('../controllers/user.js');

    app.route('/auth/profile')
        .post(userHandlers.loginRequired, userHandlers.profile);
    app.route('/auth/register')
        .post(userHandlers.register);
    app.route('/auth/login')
        .post(userHandlers.login);
};