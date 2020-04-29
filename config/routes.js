/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': {
        view: 'index'
    },

    '/user/:userId': {
        view: 'user'
    },
    '/form/:formId': {
        view: 'form'
    },

    '/group/:groupId': {
        view: 'group'
    },

    '/login': {
        view: 'session/login'
    },

    '/home': {
        view: 'homepage'
    },

        '/companies': {
        view: 'companies'
    },


    'GET /api/company/name/:companyName': 'CompaniesController.findByName',
    'GET /api/company/delete/:companyName': 'CompaniesController.casDelete',
    'GET /api/company/deleteId/:companyName': 'CompaniesController.casDeleteId',
    'GET /api/company/CompanyName/:companyName': 'CompaniesController.findByCompanyName',
    'GET /api/company/location/:companyName': 'CompaniesController.findByCompanyLocation',
    'GET /api/company/email/:companyName': 'CompaniesController.findByCompanyEmail',
    'GET /api/company/billing/:companyName': 'CompaniesController.findByCompanyBilling'
        /***************************************************************************
         *                                                                          *
         * Custom routes here...                                                    *
         *                                                                          *
         *  If a request to a URL doesn't match any of the custom routes above, it  *
         * is matched against Sails route blueprints. See `config/blueprints.js`    *
         * for configuration options and examples.                                  *
         *                                                                          *
         ***************************************************************************/

};
