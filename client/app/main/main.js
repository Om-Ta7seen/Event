angular.module('event.main', [])

.controller('MainController', function ($scope, $window, $location, Users) {
  $scope.data = {};

  	// Users.getTodayCookings().then(function(data){
  	// 	$scope.data.cookings = data;
  	// });

  // 	$scope.setOrder = function(UserID, cookerID, cookNameID, FullName, cookName){
		// OrderService.setOrder({userID: UserID, cookerID : cookerID,
		// 	 CookNamesID: cookNameID, FullName : FullName, cookName: cookName}); 
  //   }

});