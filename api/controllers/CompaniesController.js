/**
 * CompaniesController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    findByName: function (req, res) {
        //console.log(Companies);

        var companyName = req.param('companyName');
        console.log(companyName);
        Companies.findByCompanyName(companyName).exec(function (err, companies) {
            {
                res.send(companies);
            }
        });
    },

    findByCompanyName: function (req, res) {
        var companyName = req.param('companyName');
        Companies.native(function (err, companies) {
            if (companies.length < 1) res.send(400);
            companies.find({
                companyName: new RegExp(companyName)
            }, {
                companyName: true,
                email: true,
                location: true,
                billing: true
            }).toArray(function (err, results) {
                if (results.length < 0) return res.send(400);
                return res.ok(results);
            });
        });
    },


    findByCompanyLocation: function (req, res) {
        var companyName = req.param('companyName');
        Companies.native(function (err, companies) {
            if (companies.length < 0) res.send(400);
            companies.find({
                    location: new RegExp(companyName)
                },

                {
                    location: true,
                    companyName: true,
                    email: true,
                    billing: true
                }).toArray(function (err, results) {
                if (results.length < 0) return res.send(400);
                return res.ok(results);
            });
        });
    },

    findByCompanyEmail: function (req, res) {
        var companyName = req.param('companyName');
        Companies.native(function (err, companies) {
            if (companies.length < 0) res.send(400);
            companies.find({
                    companyName: new RegExp(companyName)
                },

                {
                    companyName: true,
                    email: true,
                    location: true,
                    billing: true
                }).toArray(function (err, results) {
                if (results.length < 0) return res.send(400);
                return res.ok(results);
            });
        });
    },

    findByCompanyBilling: function (req, res) {
        var companyName = req.param('companyName');
        Companies.native(function (err, companies) {
            if (companies.length < 0) res.send(400);
            companies.find({
                    billing: new RegExp(companyName)
                },

                {
                    companyName: true,
                    email: true,
                    location: true,
                    billing: true
                }).toArray(function (err, results) {
                if (results.length < 0) return res.send(400);
                return res.ok(results);
            });
        });
    },


    casDelete: function (req, res) {

        var companyName = req.param('companyName');

        Companies.destroy({
            companyName: companyName
        }).exec(function (err, companies) {
            if (err) {
                return res.serverError();
            }
            var companyIds = companies.map(function (company) {
                return company.id;
            });
            Users.destroy({
                company: companyIds
            }).exec(function (err, users) {
                console.log(companyName);
            });
        });

    },

    casDeleteId: function (req, res) {

        var companyName = req.param('companyName');

        Companies.destroy({
            id: companyName
        }).exec(function (err, companies) {
            if (err) {
                return res.serverError();
            }
            var companyIds = companies.map(function (company) {
                return company.id;
            });
            Users.destroy({
                company: companyIds
            }).exec(function (err, users) {
                console.log(companyName);
            });
        });

    }
};
