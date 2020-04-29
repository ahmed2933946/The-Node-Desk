/*global ticketApp */
/*global console */

var groupController = ticketApp.controller('GroupController', ['$filter', '$scope', 'Group', '$rootScope', '$location',
    function ($filter, $scope, Group, $rootScope, $location) {
        'use strict';

        $scope.groups = [];


        $scope.group = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            repeatPassword: null,
            id: null
        };

        $scope.addGroup = function () {

            console.log('addGroup() called');

            if (!$scope.group.firstName || !$scope.group.lastName || !$scope.group.email || !$scope.group.password || !$scope.group.repeatPassword) {
                // TODO something required is missing
                console.log('Missing field');
                return false;
            } else if ($scope.group.password !== $scope.group.repeatPassword) {
                // TODO the passwords don't match
                console.log('Passwords don\'t match');
                return false;
            }

            delete $scope.group.id;
            delete $scope.group.repeatPassword;

            Group.save($scope.group, function (data) {
                console.log('Group saved!');
                console.dir(data);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };




        $scope.removeGroup = function (groupId) {
            console.log('removeGroup(' + groupId + ') called');

            Group.remove({
                groupId: groupId
            }, function (data) {
                console.log('Group removed');

                $scope.groups = $filter('filter')($scope.groups, {
                    id: '!' + groupId
                }, true);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };




        $scope.updateGroup = function (groupId, index) {

            console.log('updateGroup(' + groupId + ') called');

            Group.update({
                groupId: groupId
            }, $scope.groups[index], function (data) {
                console.log('Group updated');

            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });

        };

        $scope.updateGroupProfile = function (groupId, group) {

            console.log('updateGroup(' + groupId + ') called');

            Group.update({
                groupId: groupId
            }, $scope.groups[group], function (data) {
                console.log('Group updated');

            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });

        };
        // Now call update passing in the ID first then the object you are updating



        $scope.getGroup = function (groupId) {
            console.log('Get group: ' + groupId);
            $scope.group = Group.get({
                groupId: groupId
            });
        };

        $scope.listGroups = function () {
            $scope.groups = Group.query();
        };

        $scope.getGroupFromUrl = function () {
            var groupId = $location.path().split("/")[2] || "Unknown";
            console.log('Get group: ' + groupId);
            $scope.group = Group.get({
                groupId: groupId
            });
        };



    }]);
