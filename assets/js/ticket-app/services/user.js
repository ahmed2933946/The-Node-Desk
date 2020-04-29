/*global ticketApp */

var user = ticketApp.factory('User', ['$resource',
    function ($resource) {
        'use strict';

        return $resource('/api/users/:userId', {}, {
            'update': {
                method: 'PUT'
            }
        });
    }]);