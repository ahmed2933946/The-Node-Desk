/*global ticketApp */

var user = ticketApp.factory('Group', ['$resource',
    function ($resource) {
        'use strict';

        return $resource('/api/groups/:groupId', {}, {
            'update': {
                method: 'PUT'
            }
        });
    }]);