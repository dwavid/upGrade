/**
 * Created by dross on 9/5/15.
 */
'use strict';

var app = angular.module('upGrade', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider

        .when('/quick-entry', {
            templateUrl: 'components/gradebook/quick-entry/quick-entry.html',
            controller: 'MainController'
        })

        .when('/class-select', {
            templateUrl: 'components/gradebook/quick-entry/class-select.html',
            controller: 'MainController'
        })

        .when('/roster', {
            templateUrl: 'components/students/roster.html',
            controller: 'MainController'
        })

        .when('/quick-links', {
            templateUrl: 'components/quick-links.html',
            controller: 'MainController'
        })

        .when('/all-assignments', {
            templateUrl: 'components/gradebook/assignments/all-assignments.html',
            controller: 'MainController'
        })

        .when('/new-assignment', {
            templateUrl: 'components/gradebook/assignments/new-assignment.html',
            controller: 'MainController'
        })

        .when('/gradebook', {
            templateUrl: 'components/gradebook/gradebook-landing.html',
            controller: 'MainController'
        })

        .otherwise({
            redirectTo: '/quick-links'
        });

}]);

app.controller('MainController', function($scope) {
    $scope.students =
        [
            {
                fName: 'Dave',
                lName: 'Ross',
                studentID: 18493,
                gpa: 2.3
            },
            {
                fName: 'Natalia',
                lName: 'Ross',
                studentID: 20983,
                gpa: 4.0
            },
            {
                fName: 'Ron',
                lName: 'Swanson',
                studentID: 31738,
                gpa: 3.7
            },
            {
                fName: 'Tom',
                lName: 'Haverford',
                studentID: 47745,
                gpa: 3.1
            },
            {
                fName: 'Aziz',
                lName: 'Ansari',
                studentID: 51029,
                gpa: 4.2
            },
            {
                fName: 'Beyonce',
                lName: 'Knowles',
                studentID: 60002,
                gpa: 3.8
            },
            {
                fName: 'Celene',
                lName: 'Dion',
                studentID: 77603,
                gpa: 3.9
            }
        ];
    $scope.assignments =
    {
        math: [
            {
                title: 'Division Test 1',
                total: 10,
                type: 'test',
                due: '08/29/2016'
            },
            {
                title: 'Times Tables 3',
                total: 25,
                type: 'classwork',
                due: '08/16/2016'
            },
            {
                title: 'Times Tables 8',
                total: 25,
                type: 'classwork',
                due: '09/20/2016'
            }
        ],
        science: [
            {
                title: 'Plate Tectonics Quiz',
                total: 10,
                type: 'quiz',
                due: '10/01/2016'
            },
            {
                title: 'Chemistry Exam 2',
                total: 100,
                type: 'test',
                due: '09/10/2016'
            }
        ],
        types: [
            {
                name: 'quiz'
            },
            {
                name: 'test'
            },
            {
                name: 'homework'
            },
            {
                name: 'classwork'
            },
            {
                name: 'project'
            }
        ]
    };
});