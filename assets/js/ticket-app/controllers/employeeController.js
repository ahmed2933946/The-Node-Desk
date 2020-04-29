/*global ticketApp */
/*global console */

var employeeController = ticketApp.controller('EmployeeController', ['$filter', '$scope', 'Employee', '$rootScope', '$location', 'LxDialogService', 'LxNotificationService', 'Company', '$window', 'UserService', 'AuthenticationService',
    function ($filter, $scope, Employee, $rootScope, $location, LxDialogService, LxNotificationService, Company, $window, UserService, AuthenticationService) {
        'use strict';
        $scope.employees = [];
        var dialogMsg;

        $scope.employee = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            role: null,
            id: null
        };

        $scope.addEmployee = function () {

            console.log('addEmployee() called');

            if (!$scope.employee.firstName || !$scope.employee.lastName || !$scope.employee.email || !$scope.employee.company) {
                // TODO something required is missing
                console.log('Missing field');
                return false;
            }

            delete $scope.employee.id;


            // Employee.save($scope.employee, function (data) {
            //         function (data) {
            //   console.log('Error!');
            //     console.dir(data);
            //    });
            var found = ($scope.companyNames.indexOf($scope.employee.company) > -1);
            if (!found) {
                dialogMsg = 'Warning new company selected. This must be created.';
                $scope.company.companyName = $scope.employee.company;
                LxDialogService.open('company');
            } else {
                Employee.save($scope.employee, function (data) {
                    console.log('Employee saved!');
                    delete $scope.employee.firstName;
                    delete $scope.employee.lastName;
                    delete $scope.employee.email;
                    delete $scope.employee.company;
                    console.dir(data);
                }, function (data) {
                    console.log('Error!');
                    console.dir(data);
                });
            }
        };

        $scope.removeEmployee = function (employeeId) {
            console.log('removeEmployee(' + employeeId + ') called');

            Employee.remove({
                employeeId: employeeId
            }, function (data) {
                console.log('Employee removed');

                $scope.employees = $filter('filter')($scope.employees, {
                    id: '!' + employeeId
                }, true);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };

        $scope.updateEmployee = function (employeeId, index) {

            console.log('updateEmployee(' + employeeId + ') called');

            Employee.update({
                employeeId: employeeId
            }, $scope.employees[index], function (data) {
                console.log('Employee updated');

            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });

        };

        $scope.updateEmployeeProfile = function (employeeId) {

            console.log('updateEmployee(' + employeeId + ') called');

            Employee.update({
                employeeId: employeeId
            }, $scope.employee, function (data) {
                console.log('Employee updated');

            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });

        };
        // Now call update passing in the ID first then the object you are updating
        $scope.getEmployee = function (employeeId) {
            console.log('Get employee: ' + employeeId);
            $scope.employee = Employee.get({
                employeeId: employeeId
            });
        };

        $scope.listEmployees = function () {
            $scope.employees = Employee.query();
        };

        $scope.refresh = function () {
            $window.location.reload();
        };

        $scope.getEmployeeFromUrl = function () {
            var employeeId = $location.path().split("/")[2] || "Unknown";
            console.log('Get employee: ' + employeeId);
            $scope.employee = Employee.get({
                employeeId: employeeId
            });
        };

        $scope.closingDialog = function () {
            LxNotificationService.info(dialogMsg);
        };

        $scope.employeeCompanySave = function () {

            if (!$scope.company.companyName || !$scope.company.email || !$scope.company.location || !$scope.company.billing) {
                // TODO something required is missing
                console.log('Missing field');
                return false;
            }

            delete $scope.company.id;

            var found1 = ($scope.companyNames.indexOf($scope.company.companyName) > -1);
            if (!found1) {

                Company.save($scope.company, function (data) {
                    console.log('Company saved!');
                    console.dir(data);
                }, function (data) {
                    console.log('Error!');
                    console.dir(data);
                });

                Employee.save($scope.employee, function (data) {
                    console.log('Employee saved!');
                    dialogMsg = 'Company ' + $scope.company.companyName + ' has been created. ' +
                        $scope.employee.firstName + $scope.employee.lastName + ' has been created.';
                    delete $scope.employee.firstName;
                    delete $scope.employee.lastName;
                    delete $scope.employee.email;
                    delete $scope.employee.company;
                    delete $scope.company.companyName;
                    delete $scope.company.email;
                    delete $scope.company.location;
                    delete $scope.company.billing;
                    LxDialogService.close('company');
                    console.dir(data);
                    console.log(dialogMsg)
                }, function (data) {
                    console.log('Error!');
                    console.dir(data);
                });
            } else {
                LxNotificationService.info($scope.company.companyName + ' already exists');
            }

        };

        //Admin User Controller (login, logout)
        $scope.logIn = function logIn(email, password) {
            if (username !== undefined && password !== undefined) {

                UserService.logIn(username, password).success(function (data) {
                    AuthenticationService.isLogged = true;
                    $window.sessionStorage.token = data.token;
                    $location.path("/admin");
                }).error(function (status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        };

        $scope.logout = function logout() {
            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                $location.path("/");
            }
        }

    }]);
