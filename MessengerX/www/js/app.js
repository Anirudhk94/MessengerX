// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home',{
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'homeController'
    })

    .state('chat-detail', {
      url: '/chats/:friend_id',
      templateUrl: 'templates/chat-details.html',
      controller: 'chatController'
    });
  $urlRouterProvider.otherwise('/home')
});

app.controller('homeController', function($scope, $http){
  console.log('In controller');

  var api = 'http://localhost:3000/';

  $http.get(api+'friends.json').success(function(data, status, headers, config){
    $scope.friends = data;
    console.log(data);
  });
})

app.controller('chatController', function($scope,$stateParams, $http, $ionicHistory, $state){
 
  $scope.goBack = function() {
    $ionicHistory.goBack();
    $scope.data = "";
  }
  var api = 'http://localhost:3000/friends/';

  $http.get(api+ $stateParams.friend_id +'.json').success(function(data, status, headers, config){
    $scope.friend = data;
    console.log(data);
  });

  var messages = [];

  $scope.onDoubleTap = function(message) {
    console.log(message);
    $scope.xxx = message;
  }

  $scope.data = {};
  $scope.messages = [];

  $scope.sendMessage = function(data) {
     $scope.messages.push({
      text: data,
    });
    delete $scope.data.message;
    $scope.xxx = "";
  };

  delete $scope.data.message;

});




