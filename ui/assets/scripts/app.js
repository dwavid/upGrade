/**
 * Created by dross on 9/5/15.
 */
'use strict';

var app = angular.module('upGrade', ['ngRoute', 'backand']);

//Update Angular configuration section
app.config(function (BackandProvider) {
    BackandProvider.setAppName('upgrade');
    BackandProvider.setSignUpToken('11b29a4f-d1aa-4212-ab7b-f5006dc9ae35');
    BackandProvider.setAnonymousToken('74ab4a5e-7ab4-4b23-991c-9650d7818233');
});

app.filter('titlecase', function() {
    return function (input) {
        var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

        input = input.toLowerCase();
        return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }

            if (match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
        });
    }
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider

        .when('/quick-entry', {
            templateUrl: 'components/gradebook/quick-entry/quick-entry.html',
            title: 'Quick Entry',
            helpUrl: 'help/quick-entry-help.html'
        })

        .when('/roster', {
            templateUrl: 'components/students/roster.html',
            title: 'Roster',
            helpUrl: ''
        })

        .when('/quick-links', {
            templateUrl: 'components/quick-links.html',
            title: 'Quick Links',
            helpUrl: 'help/quick-links-help.html'
        })

        .when('/all-assignments', {
            templateUrl: 'components/gradebook/assignments/all-assignments.html',
            title: 'Assignments',
            helpUrl: ''
        })

        .when('/new-assignment', {
            templateUrl: 'components/gradebook/assignments/new-assignment.html',
            title: 'New Assignment',
            helpUrl: ''
        })

        .when('/gradebook', {
            templateUrl: 'components/gradebook/gradebook-landing.html',
            title: 'Gradebook',
            helpUrl: 'help/gradebook-help.html'
        })

        .when('/analytics', {
            templateUrl: 'components/analytics/analytics-landing.html',
            title: 'Analytics',
            helpUrl: ''
        })

        .otherwise({
            redirectTo: '/quick-links'
        });

}]);

app.controller('MainController', ['$scope', '$rootScope', '$location', '$http', 'Backand', function($scope, $rootScope, $location, $http, Backand) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {  //using success callback of route change
        if(current.$$route && current.$$route.title) { //Checking whether $$route is initialised or not
            $rootScope.title = current.$$route.title;
            $rootScope.helpUrl = current.$$route.helpUrl;
        }
    });
    $scope.helpJump = function (url) {
        // TODO make it so this refreshes the modal position - right now, it's just lengthening the modal and not recentering it vertically
        $rootScope.helpUrl = url;
    };
    $scope.project = {
        application: 'upGrade',
        version: '0.0.1'
    };
    $scope.quickEntry = {
        subject: '',
        student: '',
        assignment: '',
        data: {
            score: '',
            comment: '',
            subject: '',
            student: '',
            assignment: ''
        }
    };
    $scope.logQuickEntry = function () {
        console.log(angular.toJson($scope.quickEntry));
    };
    $scope.newAssignment = {
        title: '',
        total: '',
        type: '',
        due: '',
        subject: '',
        description: ''
    };
    $scope.logNewAssignment = function () {
        console.log(angular.toJson($scope.newAssignment));
    };

    //GET AN OBJECT FROM DATABASE
    $scope.getObject = function(name, filter, sort) {
        return $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/' + name,
            params: {
                pageSize: 20,
                pageNumber: 1,
                filter: filter || '',
                sort: sort || ''
            }
        })
    };

    //SET VARIOUS OBJECTS (SUBJECTS, TYPES, ETC.)
    $scope.allSubjects = $scope.getObject('subjects')
        .success(function (data, response) {
            $scope.allSubjects = data;
        });
    $scope.allTypes = $scope.getObject('types')
        .success(function (data, response) {
            $scope.allTypes = data;
        });
    $scope.allStudents = $scope.getObject('students')
        .success(function (data, response) {
            $scope.allStudents = data;
        });
    $scope.allAssignments = $scope.getObject('assignments')
        .success(function (data, response) {
            $scope.allAssignments = data;
        });
    $scope.allGrades = $scope.getObject('grades')
        .success(function (data, response) {
            $scope.allGrades = data;
        });

    //FILTER GRADES BY ATTRIBUTE(EX.'SUBJECT')
    $scope.countGradesBySubject = function(attr, attrID, variable, count) {
        var subjectFilter = "[{'fieldName':'" + attr + "','operator':'in','value':'" + attrID + "'}]";
        $scope.getObject('grades', subjectFilter)
        .success(function (data, response) {
            variable = data;
            console.log(variable.data);
            count = variable.data.length;
            console.log(count);
        });
    };
    $scope.filteredGrades = '';
    $scope.gradeCount = '';
    $scope.countGradesBySubject('assignment', 2, $scope.filteredGrades, $scope.gradeCount);

    //POST AN OBJECT TO THE DATABASE
    $scope.postObject = function(name, object) {
        return $http({
            method: 'POST',
            url: Backand.getApiUrl() + '/1/objects/' + name,
            data: angular.toJson(object)
        })
    };
    $scope.postAssignment = function () {
        $scope.postObject('assignments', $scope.newAssignment);
    };
    $scope.postGrade = function() {
        $scope.quickEntry.data.subject = $scope.quickEntry.subject.id;
        $scope.quickEntry.data.student = $scope.quickEntry.student.id;
        $scope.quickEntry.data.assignment = $scope.quickEntry.assignment.id;
        $scope.postObject('grades', $scope.quickEntry.data);
    };
}]);