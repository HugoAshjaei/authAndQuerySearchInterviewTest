'use strict';
module.exports = function(app) {
    var queryHandlers = require('../controllers/query.js');

    app.route('/nearme')
        .post(queryHandlers.loginRequired, queryHandlers.nearme);
    app.route('/all')
        .get(queryHandlers.all);




};