/*global ticketApp */
/*global console */
/*global angular */
 
var formController = ticketApp.controller('FormController', ['$filter', '$scope', 'Form', '$rootScope', '$location',
    function ($filter, $scope, Form, $rootScope, $location) {
        'use strict';
 
        $scope.forms = [];
 
 
        $scope.form = {
            name: null,
            owner: "self",
            data: "test",
            formId: null
        };
 
        $scope.addFormProfile = function () {
 
            console.log('addForm() called');
 
            angular.forEach($scope.forms, function (form) {
                Form.save(form, function (f) {
                    console.log('Form saved!');
                    console.dir(f);
                }, function (data) {
                    console.log('Error!');
                    console.dir(data);
                });
            });
        };
 
        $scope.addForm = function () {
 
            console.log('addForm() called');
 
            if (!$scope.forms) {
                // TODO something required is missing
                console.log('Missing field');
                console.log($scope.forms);
                return false;
            }
 
            Form.save($scope.forms, function (data) {
                console.log('Form saved!');
                console.dir(data);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };
 
 
 
 
        $scope.removeForm = function (formId) {
            console.log('removeForm(' + formId + ') called');
 
            Form.remove({
                formId: formId
            }, function (data) {
                console.log('Form removed');
 
                $scope.forms = $filter('filter')($scope.forms, {
                    id: '!' + formId
                }, true);
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
        };
 
 
 
 
        $scope.updateForm = function (formId, index) {
 
            console.log('updateForm(' + formId + ') called');
 
            Form.update({
                formId: formId
            }, $scope.forms[index], function (data) {
                console.log('Form updated');
 
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
 
        };
 
        $scope.updateFormProfile = function (formId, form) {
 
            console.log('updateForm(' + formId + ') called');
 
            Form.update({
                formId: formId
            }, $scope.forms[form], function (data) {
                console.log('Form updated');
 
            }, function (data) {
                console.log('Error!');
                console.dir(data);
            });
 
        };
        // Now call update passing in the ID first then the object you are updating
 
 
 
        $scope.getForm = function (formId) {
            console.log('Get form: ' + formId);
            $scope.form = Form.get({
                formId: formId
            });
        };
 
        $scope.listForms = function () {
            $scope.forms = Form.query();
        };
 
        $scope.getFormFromUrl = function () {
            var formId = $location.path().split("/")[2] || "Unknown";
            console.log('Get form: ' + formId);
            $scope.form = Form.get({
                formId: formId
            });
        };
 
        $scope.newItemNo = 0;
 
        $scope.addForm1 = function () {
            var newItemNo = $scope.forms.length + 1;
 
            $scope.form.formId = 'form' + newItemNo;
 
            $scope.forms.push({
                name: null,
                owner: "self",
                data: "test",
                formId: null
            });
        };
 
        $scope.showForm = function (form) {
            return form.id === $scope.forms[$scope.forms.length - 1].id;
        };
 
    }]);