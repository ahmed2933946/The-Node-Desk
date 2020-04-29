/*global ticketApp */

var user = ticketApp.factory('Form', ['$resource',
    function ($resource) {
        'use strict';

        return $resource('/api/forms/:formId', {}, {
            'update': {
                method: 'PUT'
            }
        });
    }]);