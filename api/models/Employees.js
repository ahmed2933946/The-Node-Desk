/**
 * Employees.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        password: {
            type: 'string',
            required: true,
            minLength: 8
        },

        email: {
            type: 'string',
            required: true,
            unique: true
        },

        firstName: {
            type: 'string',
            required: true
        },

        lastName: {
            type: 'string',
            required: true
        },

        role: {
            type: 'string',
            required: true,
            unique: true
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        },

        beforeCreate: function (attrs, next) {
            var bcrypt = require('bcrypt');
            bcrypt.hash(attrs.password, 10, function (err, hash) {
                if (err) return next(err);
                attrs.password = hash;
                next();
            });
        }
    }
};
