/// <reference path="mainController.js" />
/// <reference path="../setupGame.js" />
//init game sokoban
var sokobanApp = angular.module('sokobanApp', ['ngRoute', 'ngCookies']);
var main = new mainController();
var setupGame = new setupGame();
var user = {
    userName: "",
    passwor: "",
    level: "",
    nick: "",
    maxExercise: 0,
    idProfile: 0
};

// configure our routes
sokobanApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/game.html',
            controller: 'gameCrtl'
        })
        .when('/profile', {
            templateUrl: 'pages/profile.html',
            controller: 'profileCrtl'
        })
        .when('/leader', {
            templateUrl: 'pages/leader.html',
            controller: 'leaderCrtl'
        })
        .when('/information', {
            templateUrl: 'pages/information.html',
            controller: 'informationCtrl'
        })
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'aboutCtrl'
        })
        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'loginCtrl'
        })
});
//controller of page
sokobanApp.controller('gameCrtl', function ($scope, $cookies, $window, $http) {
    var current = $cookies.get("user");
    if (current != undefined) {
        var temp = JSON.parse($cookies.get("user"));
        main.levelinit(temp.level);
        setupGame.loadGame(temp, $scope);
    } else {
        if (user.level != "") {
            main.levelinit(user.level);
            setupGame.loadGame(user, $scope);
        } else {
            $window.location.href = "#/login";
        }
    }

    $scope.saveHistory = function (item) {
        $http.post('http://sokobanservice.esy.es/index.php/UserSokon/saveHistory', JSON.stringify(item), {
            headers: {
                'Content-Type': 'application/json', /*or whatever type is relevant */
            }
        })
            .success(function (data) {
                setupGame.updateGame(data);
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    }
    $scope.setCookie = function (data) {
        main.setCookie(data, 30, $cookies);
    }
});
sokobanApp.controller('profileCrtl', function ($scope) {
    setupGame.reset();
    $scope.message = 'Hello Profile';
});
sokobanApp.controller('leaderCrtl', function ($scope) {
    setupGame.reset();
    $scope.message = 'Hello leader';
});
sokobanApp.controller('informationCtrl', function ($scope) {
    setupGame.reset();
    $scope.message = 'Hello information';
});
sokobanApp.controller('aboutCtrl', function ($scope) {
    setupGame.reset();
    $scope.message = 'Hello About';
});
//setup game
sokobanApp.controller('setupCrtl', function ($scope, $cookies) {
    $scope.play = function () {
        setupGame.playGame();
    }
});
sokobanApp.controller('loginCtrl', function ($scope, $cookies, $window) {
    var checkCookie = function () {
        var current = $cookies.get("user");
        if (current != undefined) {
            var user = JSON.parse(current);
            $window.location.href = "#/";
        } else {
            main.login();
        }
    };
    checkCookie();
});
sokobanApp.controller('loginCrtl1', function ($scope, $cookies, $http, $window) {
    $scope.user = {};
    $scope.isLogin = function () {
        $http.post('http://sokobanservice.esy.es/index.php/UserSokon/login', JSON.stringify($scope.user), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .success(function (data) {
                user.userName = data.userName;
                user.passwor = data.passworUser;
                user.level = parseInt(data.numberLevel);
                user.maxExercise = parseInt(data.maxExercise);
                user.idProfile = parseInt(data.idProfile);
                if ($('#remember-me').is(':checked')) {
                    main.setCookie(user, 30, $cookies);
                }
                main.session_init(user.level);
                $window.location.href = "#/";
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    };
    $scope.createAccount = function () {
        $http.post('http://sokobanservice.esy.es/index.php/UserSokon/createUser', JSON.stringify($scope.user), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .success(function (data) {
                user.userName = data.userName;
                user.passwor = data.passworUser;
                user.level = parseInt(data.numberLevel);
                user.maxExercise = parseInt(data.maxExercise);
                user.idProfile = parseInt(data.idProfile);
                main.session_init(user.level);
                $window.location.href = "#/";
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    }
    $scope.signin = function () {
        main.login();
    }
    $scope.signup = function () {
        main.create();
    }
});