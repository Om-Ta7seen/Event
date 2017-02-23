angular.module('event.services', [])


.factory('Auth', function ($http, $location, $window) {
 
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/userSignin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
  console.log(user)
    return $http({
      method: 'POST',
      url: '/api/userSignup',
      data: user
    })
    .then(function (resp) {
     return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.event');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.event');
    $location.path('/signin');
  };

  return {
    signin : signin,
    signup : signup,
    isAuth: isAuth,
    signout: signout
  };
})

.factory('Events', function(){

  var addEvent = function(event){
    return $http({
      method : 'POST',
      url :'/api/events',
      data : event
    })
    .then(function(event){
      return event
    });
  };


  var getUserProfile = function (username){
    return $http ({
      method : 'GET',
      url : '/api/users/' + username
    }).then(function (resp) {
      return resp.data;
    });
  };


  var getOrgEvent = function (tok){
    return $http ({
      method : 'GET',
      url : '/api/orgProfile',
      params:{tok:tok}
    }).then(function (resp) {
      return resp.data;
    });
  };

  return {
    
  }
  
})