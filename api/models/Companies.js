/**
 * Companies.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        companyName: {
            type: 'string',
            required: true,
            unique: true
        },

        location: {
            type: 'string',
            required: true
        },

        email: {
            type: 'string',
            required: true,
            unique: true
        },

        billing: {
            type: 'string',
            required: true
        },

        Users: {
            collection: 'Users',
            via: 'company'
        }

    },

    enroll: function (options, cb) {

        Users.findOne(options.company).exec(function (err, theUsers) {
            if (err) return cb(err);
            if (!theUser) return cb(new Error('Users not found.'));
            theUser.enrolledIn.add(options.Users);
            theUsers.save(cb);
        });
    }
};
