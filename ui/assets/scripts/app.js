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
    $scope.students =
        [
            {
                fName: 'Dave',
                lName: 'Ross',
                studentID: 18493,
                grades: [
                    {
                        assignmentID: 1,
                        points: 9
                    },
                    {
                        assignmentID: 2,
                        points: 87
                    },
                    {
                        assignmentID: 3,
                        points: 8
                    },
                    {
                        assignmentID: 4,
                        points: 71
                    },
                    {
                        assignmentID: 5,
                        points: 12
                    },
                    {
                        assignmentID: 6,
                        points: 11
                    },
                    {
                        assignmentID: 7,
                        points: 115
                    },
                    {
                        assignmentID: 8,
                        points: 19
                    },
                    {
                        assignmentID: 9,
                        points: 21
                    }
                ],
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
    [
        {
            title: 'Plate Tectonics Quiz',
            assignmentID: 1,
            total: 10,
            type: 'quiz',
            due: '10/01/2016',
            subject: 'Science',
            description: ''
        },
        {
            title: 'Chemistry Exam 2',
            assignmentID: 2,
            total: 100,
            type: 'test',
            due: '09/10/2016',
            subject: 'Science',
            description: ''
        },
        {
            title: 'Division Test 1',
            assignmentID: 3,
            total: 10,
            type: 'test',
            due: '08/29/2016',
            subject: 'Math',
            description: ''
        },
        {
            title: 'Book Report',
            assignmentID: 4,
            total: 75,
            type: 'project',
            due: '10/29/2016',
            subject: 'Reading',
            description: ''
        },
        {
            title: 'Spelling Quiz 2',
            assignmentID: 5,
            total: 15,
            type: 'quiz',
            due: '10/05/2016',
            subject: 'English',
            description: ''
        },
        {
            title: 'Spelling Quiz 1',
            assignmentID: 6,
            total: 15,
            type: 'quiz',
            due: '09/10/2016',
            subject: 'English',
            description: ''
        },
        {
            title: 'Map Project',
            assignmentID: 7,
            total: 120,
            type: 'project',
            due: '08/29/2016',
            subject: 'Social Studies',
            description: ''
        },
        {
            title: 'Times Tables 3',
            assignmentID: 8,
            total: 25,
            type: 'classwork',
            due: '08/16/2016',
            subject: 'Math',
            description: ''
        },
        {
            title: 'Times Tables 8',
            assignmentID: 9,
            total: 25,
            type: 'classwork',
            due: '09/20/2016',
            subject: 'Math',
            description: ''
        }
    ];
    $scope.types = [
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
    ];
    $scope.subjects = [
        {
            name: 'Math'
        },
        {
            name: 'Science'
        },
        {
            name: 'English'
        },
        {
            name: 'Reading'
        },
        {
            name: 'Social Studies'
        }
    ];
    $scope.quickEntry = {
        subject: '',
        assignment: '',
        student: '',
        grade: '',
        comment: ''
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
    $scope.getObject = function(name, sort, filter) {
        return $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/' + name,
            params: {
                //pageSize: 20,
                //pageNumber: 1,
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

    $scope.postObject = function(name, object) {
        return $http({
            method: 'POST',
            url: Backand.getApiUrl() + '/1/objects/' + name,
            data: angular.toJson(object)
        })
    };
    $scope.postAssignment = function () {
        $scope.postObject('assignments', $scope.newAssignment);
    }
}]);