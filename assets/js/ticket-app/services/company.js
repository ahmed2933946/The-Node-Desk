/*global angular */

var company = ticketApp.factory('Company', ['$resource', function ($resource){
    'use strict';
    
        return $resource('/api/companies/:userId', {}, {
            'update': {
                method: 'PUT'
            }
        });
}]);