angular.module('event.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  // $scope.eventType =[
  //        "Music",
  //        "Tech",
  //        "Sport"
  // ];
   
  $scope.logout = function () {
    Auth.signout()
  };


  $scope.signin = function () {

    Auth.signin($scope.user)
    .then(function (data) {
      $window.localStorage.setItem('com.event', data.token);
      $location.path('/users/'+data.username);
    })
    .catch(function (error) {
      console.error(error);
    });

  };

  $scope.signup = function () {
    
    Auth.userSignup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.event', data.token);
        $location.path('/users/'+data.username);
        // Auth.getUserEvent($window.localStorage.getItem('com.event', token));
      })
      .catch(function (error) {
        console.error(error);
      });

  };

  $scope.CreateEvent = function () {
    var temp = $scope.event;
    var tok = $window.localStorage.getItem('com.event');
    temp.tok = tok;
    Auth.createEvent(temp)
      .then(function () {
        $location.path('/orgProfile');
        $scope.bring();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

// $scope.bring=function(){
//   Auth.getOrgEvent($window.localStorage.getItem('com.event')).then(function (data) {
//          $scope.why.events = data;
//   })
  
 
//     Auth.getUserEvent($window.localStorage.getItem('com.event')).then(function (data) {
//        $scope.why2.events = data;
//      })
   
// } 

// $scope.bring();


});