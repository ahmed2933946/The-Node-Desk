/**
 * EmployeesController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    login: function (req, res) {
        req.session.authenticated = true;
        console.log(req.session);
        var bcrypt = require('bcrypt');
        User.findOneByEmail(req.body.email).exec(function (err, user) {
            if (err) res.json({
                error: 'DB error'
            }, 500);

            if (user) {
                bcrypt.compare(req.body.password, user.password, function (err, match) {
                    if (err) res.json({
                        error: 'Server error 12'
                    }, 400);

                    if (match) {
                        // password match
                        req.session.user = user.id;
                        res.json(user);
                    } else {
                        // invalid password
                        if (req.session.user) req.session.user = null;
                        res.json({
                            error: 'Invalid password'
                        }, 400);
                    }
                });
            } else {
                res.json({
                    error: 'Employee not found'
                }, 404);
            }
        });
    }

};
