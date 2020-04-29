/*global ticketApp */
/*global console */
var userController = ticketApp.controller('UserController', ['$filter', '$scope', '$window', 'User', '$rootScope', '$location', 'LxDialogService', 'LxNotificationService', 'Company', '$http', '$log',
        function ($filter, $scope, $window, User, $rootScope, $location, LxDialogService, LxNotificationService, Company, $http, $log) {
        'use strict';
        $scope.users = [];
        var dialogMsg, dialogIcon, dialogType, upload, findByName, companyName, upload2, companyName2;
        var update = 0;
        $scope.user = {
            firstName: null,
            lastName: null,
            email: null,
            company: null,
            id: null
        };
        $scope.addUser = function () {
            console.log('addUser() called');
            if (!$scope.user.firstName || !$scope.user.lastName || !$scope.user.email || !$scope.user.company) {
                // TODO something required is missing
                console.log('Missing field');
                return false;
            }
            delete $scope.user.id;
            // User.save($scope.user, function (data) {
            // function (data) {
            // console.log('Error!');
            // console.dir(data);
            // });
            var found = ($scope.companyNames.indexOf($scope.user.company) > -1);
            if (!found) {
                dialogMsg = 'Warning new company selected. This must be created.';
                dialogType = 'warning';
                $scope.company.companyName = $scope.user.company;
                LxDialogService.open('company');
            } else {
                $scope.companyName = [];
                $http.get('/api/company/name/' + $scope.user.company)
                    .success(function (data) {
                        $scope.companyName = data[0];
                        console.dir($scope.companyName.id);

                        upload2 = angular.copy($scope.user);
                        upload2.company = $scope.companyName.id;
                        User.save(upload2, function () {
                                console.log('User saved!');
                                console.dir(upload2);
                            },
                            function (upload2) {
                                console.log(upload2);
                                // console.dir(companyName.id);
                            });
                    });
            }
        };
        $scope.removeUser = function (userId) {
            console.log('removeUser(' + userId + ') called');
            User.remove({
                userId: userId
            }, function (data) {
                console.log('User removed');
                $scope.users = $filter('filter')($scope.users, {
                    id: '!' + userId
                }, true);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };

        $scope.updateUser = function (userId, index, data) {

            console.log('updateUser(' + userId + ') called');

            User.get({
                    userId: userId
                },

                $scope.users[index],
                function (data) {
                    $scope.companyName2 = $scope.users[index];
                    //console.dir($scope.users[index])



                    $scope.companyName = [];
                    $http.get('/api/company/name/' + $scope.companyName2.company.companyName)
                        .success(function (data2) {
                                if (data2.length < 1) {
                                    update = 1;
                                    dialogMsg = 'Warning new company selected. This must be created.';
                                    dialogType = 'warning';
                                    $scope.companyName = data2;
                                    $scope.companyNames = data2;
                                    $scope.user.firstName = $scope.users[index].firstName;
                                    $scope.user.lastName = $scope.users[index].lastName;
                                    $scope.user.email = $scope.users[index].email;
                                    $scope.company.companyName = $scope.users[index].company.companyName;
                                    LxDialogService.open('company');
                                };
                                $scope.companyName = data2[0];
                                console.dir($scope.companyName.id);

                                upload2 = {
                                    firstName: $scope.users[index].firstName,
                                    lastName: $scope.users[index].lastName,
                                    email: $scope.users[index].email,
                                    company: $scope.companyName.id,
                                    userId: null
                                };

                                upload2.company = $scope.companyName.id;

                                User.update({
                                        userId: userId
                                    }, upload2, function (upload2) {
                                        console.log('User saved!ers');
                                        //  console.dir(upload2);
                                    },
                                    function (upload2) {
                                        console.log(upload2);
                                        // console.dir(companyName.id);
                                    });
                            },
                            function (err) {
                                console.log('chew');
                                // console.dir(companyName.id);
                            });


                },
                function (data) {
                    //console.log($scope.users.firstName)
                });
        };

        $scope.updateUserProfile = function (userId) {
            console.log('updateUser(' + userId + ') called');
            User.update({
                    userId: userId
                },
                $scope.user,
                function (data) {
                    console.log('User updated');
                },
                function (data) {
                    console.log('Error!');
                    console.dir(data);
                });
        };
        // Now call update passing in the ID first then the object you are updating
        $scope.getUser = function (userId) {
            console.log('Get user: ' + userId);
            $scope.user = User.get({
                userId: userId
            });
        };


        $scope.listUsers = function (index) {


            $scope.users = User.query(function () {

                $scope.people = [];

                angular.forEach($scope.users, function (user) {
                    $scope.people.push(user);
                   console.dir($scope.people);
                });

                $scope.selectedPersons = [$scope.people[2], $scope.people[4]];

            });
        };
        $scope.refresh = function () {
            $window.location.reload();
        };
        $scope.getUserFromUrl = function () {
            var userId = $location.path().split("/")[2] || "Unknown";
            console.log('Get user: ' + userId);
            $scope.user = User.get({
                userId: userId
            });
        };
        $scope.closingDialog = function () {
            if (dialogType === 'warning') {
                LxNotificationService.warning(dialogMsg);
            } else if (dialogType === 'success') {
                LxNotificationService.success(dialogMsg);
            } else if (dialogType === 'error') {
                LxNotificationService.error(dialogMsg);
            }
        };
        $scope.userCompanySave = function () {
            if (!$scope.company.companyName || !$scope.company.email || !$scope.company.location || !$scope.company.billing) {
                // TODO something required is missing
                LxNotificationService.warning('missing a field');
                console.log('Missing field');
                return false;
            }
            console.log($scope.companyNames);
            console.log($scope.company.companyName);
            delete $scope.company.id;
            var found1 = ($scope.companyNames.indexOf($scope.company.companyName) > -1);
            if (!found1) {
                Company.save($scope.company, function (data) {
                    $scope.user.company = data.id;
                    upload = {
                        firstName: $scope.user.firstName,
                        lastName: $scope.user.lastName,
                        email: $scope.user.email,
                        company: $scope.user.company,
                        id: null
                    };

                    if (update === 1) {



                        upload2 = {
                            firstName: $scope.user.firstName,
                            lastName: $scope.user.lastName,
                            email: $scope.user.email,
                            company: $scope.company.id,
                            userId: null
                        };

                        upload2.company = $scope.companyName.id;

                        User.update({
                                userId: userId
                            }, upload2, function (upload2) {
                                console.log('User saved!ers');
                                //  console.dir(upload2);
                            },
                            function (upload2) {
                                console.log(upload2);
                                // console.dir(companyName.id);
                            });







                    } else {
                        User.save(upload, function () {
                            // console.log('ADDED' + data);
                            dialogMsg = 'Company ' + $scope.company.companyName + ' has been created.' + $scope.user.firstName + ' ' + $scope.user.lastName + ' has been created.';
                            // dialogIcon = 'success'
                            $scope.user = {};
                            $scope.company = {};
                            console.log(update);
                            dialogType = 'success';
                            LxDialogService.close('company');
                            // console.dir(data);
                            // console.log(dialogMsg)
                        }, function (err) {
                            console.log('Error!');
                            console.dir(err);
                        });

                    }


                });
            } else {
                LxNotificationService.error($scope.company.companyName + ' already exists');
            }
        };


        $scope.userCompanySave2 = function () {
            if (!$scope.company.companyName || !$scope.company.email || !$scope.company.location || !$scope.company.billing) {
                // TODO something required is missing
                LxNotificationService.warning('missing a field');
                console.log('Missing field');
                return false;
            }
            delete $scope.company.id;
            var found1 = ($scope.companyNames.indexOf($scope.company.companyName) > -1);
            if (!found1) {
                Company.save($scope.company, function (data) {
                    $scope.user.company = data.id;
                    upload = {
                        firstName: $scope.user.firstName,
                        lastName: $scope.user.lastName,
                        email: $scope.user.email,
                        company: $scope.user.company,
                        id: null
                    };
                    User.save(upload, function (userId) {
                        // console.log('ADDED' + data);
                        dialogMsg = 'Company ' + $scope.company.companyName + ' has been created.' + $scope.user.firstName + ' ' + $scope.user.lastName + ' has been created.';
                        // dialogIcon = 'success'
                        $scope.user = {};
                        $scope.company = {};
                        dialogType = 'success';
                        LxDialogService.close('company');
                        // console.dir(data);
                        // console.log(dialogMsg)
                    }, function (err) {
                        console.log('Error!');
                        console.dir(err);
                    });
                });
            } else {
                LxNotificationService.error($scope.company.companyName + ' already exists');
            }
        };

}]);
