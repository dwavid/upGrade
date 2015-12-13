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

        .when('/login', {
            templateUrl: 'components/auth/login.html',
            title: 'Log In',
            helpUrl: ''
        })

        .when('/recover', {
            templateUrl: 'components/auth/recover.html',
            title: 'Recover',
            helpUrl: ''
        })

        .when('/register', {
            templateUrl: 'components/auth/register.html',
            title: 'Register',
            helpUrl: ''
        })

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

        .when('/subjects', {
            templateUrl: 'components/subjects/subject-list.html',
            title: 'Subjects',
            helpUrl: ''
        })

        .otherwise({
            redirectTo: '/login'
        });

}]);

app.controller('MainController', ['$scope', '$rootScope', '$location', '$http', 'Backand', function($scope, $rootScope, $location, $http, Backand) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {  //using success callback of route change
        if(current.$$route && current.$$route.title) { //Checking whether $$route is initialized or not
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
            percentage: '',
            comment: '',
            subject: '',
            student: '',
            assignment: ''
        }
    };
    $scope.clearQuickEntry = function() {
        $scope.quickEntry = '';
        $scope.clearQuickEntryAverage();
    };
    $scope.newStudent =  {
        fName: '',
        lName: '',
        studentID: '',
        gpa: ''
    };
    $scope.clearNewStudent = function() {
        $scope.newStudent = '';
    };
    $scope.quickEntryPercentage = function () {
        if ($scope.quickEntry.data.score) {
            $scope.quickEntry.data.percentage = (($scope.quickEntry.data.score / $scope.quickEntry.assignment.total) * 100).toFixed(0);
        }
    };
    $scope.newAssignment = {
        title: '',
        total: '',
        type: '',
        due: '',
        subject: '',
        description: ''
    };
    $scope.clearNewAssignment = function() {
        $scope.newAssignment = '';
    };

    $scope.newSubject = {
        name: ''
    };

    //***********************************************
    //
    //THIS IS ALL DATABASE INTERACTION STUFF
    //
    //***********************************************
    //TODO make this stuff update dynamically! It all requires a page refresh for some reason. Except it works in a few screens... it's weird

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

    //BUILD A FILTER TO USE IN A GETOBJECT()
    $scope.buildFilter = function(fieldName, operator, value) {
        return "[{'fieldName':'" + fieldName + "','operator':'" + operator + "','value':'" + value + "'}]"
    };

    //Get all DB objects
    //TODO get rid of this garbage. I don't know why I have to do this to get the data to update without a refresh
    $scope.getAllObjects = function() {
        $scope.getObject('subjects')
            .success(function (data, response) {
                $scope.allSubjects = data;
            });
        $scope.getObject('types')
            .success(function (data, response) {
                $scope.allTypes = data;
            });
        $scope.getObject('students')
            .success(function (data, response) {
                $scope.allStudents = data;
            });
        $scope.getObject('assignments')
            .success(function (data, response) {
                $scope.allAssignments = data;
            });
        $scope.getObject('grades')
            .success(function (data, response) {
                $scope.allGrades = data;
            });
    };

    $scope.quickEntryAverage = 0;
    $scope.getAverage = function (itemID, type) {
        var filter = '';
        if (type == 'assignment') {
            filter = $scope.buildFilter('assignment', 'in', itemID);
        } else if (type == 'student') {
            filter = $scope.buildFilter('student', 'in', itemID);
        } else if (type == 'subject') {
            filter = $scope.buildFilter('subject', 'in', itemID);
        }
        var total = 0;
        var object = {};
        var count = 0;
        var average = 0;
        $scope.getObject('grades', filter)
            .success(function (data, response) {
                object = data;
                //console.log(object);
                count = object.data.length;
                //console.log(count);
                for (var i = 0; i < count; i++) {
                    total += object.data[i].percentage;
                }
                //console.log(total);
                average = (total / count).toFixed(0);
                //console.log(average);
                //Makes sure we don't get 'NaN' in the UI by ensuring that the `average` variable isFinite
                if (isFinite(average)) {
                    $scope.quickEntryAverage = average;
                } else {
                    $scope.quickEntryAverage = 0;
                }
            });
    };
    $scope.clearQuickEntryAverage = function() {
        $scope.quickEntryAverage = '';
    };
    //$scope.getAverage(2);

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
        $scope.clearNewAssignment();
    };
    $scope.postGrade = function() {
        $scope.quickEntry.data.subject = $scope.quickEntry.subject.id;
        $scope.quickEntry.data.student = $scope.quickEntry.student.id;
        $scope.quickEntry.data.assignment = $scope.quickEntry.assignment.id;
        $scope.postObject('grades', $scope.quickEntry.data);
        $scope.clearQuickEntry();
    };
    $scope.postStudent = function () {
        $scope.postObject('students', $scope.newStudent);
        $scope.clearNewStudent();
    };
    $scope.postSubject = function() {
        $scope.postObject('subjects', $scope.newSubject);
    };
    $scope.deleteObject = function(object, id) {
        return $http ({
            method: 'DELETE',
            url: Backand.getApiUrl() + '/1/objects/' + object + '/' + id
        });
    };
    $scope.registerUser = function(user) {
        return $http({
            method: 'POST',
            url: Backand.getApiUrl() + '/1/user/signup',
            headers: {
                'SignUpToken': '11b29a4f-d1aa-4212-ab7b-f5006dc9ae35'
            },
            data: angular.toJson(user)
        }).success(function(){
            $scope.registrationSuccess = true;
            $location.path('/quick-links');
        });
    };
    $scope.newUser = {
        firstName: '',
        lastName: '',
        email: '',
        role: 'User',
        password: '',
        confirmPassword: ''
    };
    //$scope.registerUser($scope.newUser, '11b29a4f-d1aa-4212-ab7b-f5006dc9ae35')
    $scope.username = '';
    $scope.password = '';
    $scope.loginError = '';
    $scope.signIn = function() {
        Backand.setAppName('upgrade');
        Backand.signin($scope.username, $scope.password, 'upgrade')
            .then(
                function () {
                    $location.path('/quick-links');
                    $scope.loginError = '';
                },
                function (data, status, headers, config) {
                    console.log(data);
                    $scope.loginError = data && data.error_description || 'Unknown error from server';
                }
            );
    };
}]);