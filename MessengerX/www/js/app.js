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

app.controller('chatController', function($scope,$stateParams, $http, $ionicHistory){
 
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
  var api = 'http://localhost:3000/friends/';

  $http.get(api+ $stateParams.friend_id +'.json').success(function(data, status, headers, config){
    $scope.friend = data;
    console.log(data);
  });

});




///////////////////////////////////////////////////////////////////////////////////////////////

app.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})

app.controller('Messages', function($scope, $timeout, $ionicScrollDelegate) {
  console.log("In messages controller")
  $scope.hideTime = true; 

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {
    alternate = !alternate;

    var d = new Date();
  d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      userId: alternate ? '12345' : '54321',
      text: $scope.data.message,
      time: d
    });

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];

});