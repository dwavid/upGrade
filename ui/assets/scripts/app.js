/**
 * Created by dross on 9/5/15.
 */
var app = angular.module('upGrade', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .when('/dashboard', {
                templateUrl: 'dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'dashboard'
            });

        $locationProvider.html5Mode(true);
    }]);