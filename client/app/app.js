angular.module('event', [
  'event.services',
  'event.auth',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider,$locationProvider) {
  $routeProvider
  
    .when('/userSignup', {
      templateUrl: 'app/account/signup.html',
      controller: 'AuthController'
    })

    .when('/OrgSignup', {
      templateUrl: 'app/account/signup.html',
      controller: 'AuthController'
    })
    .when('/orgProfile', {
      templateUrl: 'app/profile/profile.html',
      controller: 'AuthController',
      authenticate: true
      
    })
    .when('/signin', {
      templateUrl: 'app/account/signin.html',
      controller: 'AuthController'
    })
    .when('/userProfile', {
      templateUrl: 'app/profile/profile.html',
      controller: 'AuthController',
      authenticate: true
    })


    .otherwise({redirectTo:'/signin'})

    $locationProvider.hashPrefix('');
    $httpProvider.interceptors.push('AttachTokens')
}) 

.factory('AttachTokens', function ($window) {

  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.event');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;

})
.run(function ($rootScope, $location, Auth) {

  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
