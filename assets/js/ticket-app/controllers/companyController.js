/*global ticketApp */

var companyController = ticketApp.controller('CompanyController', ['$filter', '$scope', 'User', 'Company', '$http',
    function ($filter, $scope, User, Company, $http) {
        'use strict';

        $scope.companies = [];

        $scope.company = {
            companyName: null,
            email: null,
            location: null,
            billing: null,
            id: null
        };

        $scope.users = [];

        $scope.user = {
            firstName: null,
            lastName: null,
            email: null,
            company: null,
            id: null
        };

        $scope.addCompany = function () {

            console.log('addCompany() called');

            if (!$scope.company.companyName || !$scope.company.email || !$scope.company.location || !$scope.company.billing) {
                // TODO something required is missing
                console.log('Missing field');
                return false;
            }

            delete $scope.company.id;

            Company.save($scope.company, function (data) {
                console.log('Company saved!');
                console.dir(data);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };

        $scope.removeCompany = function (userId) {
            console.log('removeCompany(' + userId + ') called');

            Company.remove({
                userId: userId
            }, function (data) {
                console.log('Company removed');

                $scope.companies = $filter('filter')($scope.companies, {
                    id: '!' + userId
                }, true);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };

        $scope.removeAllCompany = function (userId) {

            $http.get('/api/company/deleteId/' + userId)
            $scope.companies = Company.query();
            $scope.users = User.query();
        };


        $scope.updateCompany = function () {

        };

        $scope.getCompany = function () {

        };

        $scope.listCompanies = function () {
            $scope.companies = Company.query();
            $scope.selectedCompany = $scope.companies;
        };

        $scope.companiesList = function () {
            $scope.companyNames = [];
            angular.forEach($scope.companies, function (company) {
                $scope.companyNames.push(company.companyName);
            });
            $scope.companies = Company.query();
        };


    }]);
