angular.module('event.profile', [])

.controller('ProfileController', function ($scope, $routeParams, $window, $location, Events, EventService) {
  $scope.data = {};
  $scope.isUserProfile = false;

  if($window.localStorage.getItem('com.event')){
  	if($window.localStorage.getItem('com.event').username = $routeParams.user){
  		$scope.isUserProfile = true;
  	}
  }

	Events.getUserProfile($routeParams.user).then(function(data) {
		console.log(data)
		if(data){
			$scope.data = data;	
		} else {
			$location.path('/');
		}
	});


	$scope.addEvent = function(){
		$scope.event.userId = JSON.parse($window.localStorage.getItem('com.event')).id;
		Events.addEvent($scope.event).then(function(data){
			console.log(data);
			if(data){
				$location.path('/');
			}
		})
	}

	$scope.attendEvent = function(eventId){
  		if($window.localStorage.getItem('com.event') !== null){
  			var userId = JSON.parse($window.localStorage.getItem('com.event')).id;
  			Events.attendEvent(eventId, userId).then(function(data){
  				// console.log(data);
  				if(data.status === 500){
  					alert('you are already attending');
  				} else {
  					alert('Great! your are attending this event now');
  				}
  			})
  		} else {
  			$location.path('/signin');
  		}
  	}

  	$scope.interestEvent = function(eventId){
  		if($window.localStorage.getItem('com.event')){
  			var userId = JSON.parse($window.localStorage.getItem('com.event')).id;
  			Events.interestEvent(eventId, userId).then(function(data){
 				// console.log(data);
  				if(data.status === 500){
  					alert('you are already interested');
  				} else {
  					alert('Great! your are intersted in this event now');
  				}
  			})
  		} else {
  			$location.path('/signin');
  		}
  	}

  	$scope.getEventInfo = function(){
  		$scope.event = EventService.getEvent();
  	}

  	$scope.setEditEvent = function(event){
  		EventService.setEvent(event);
  		$location.path('/editEvent');
  	}

  	$scope.editEvent = function(){
		//$scope.event.userId = $window.localStorage.getItem('com.event');
		Events.editEvent($scope.event).then(function(data){
			if(data.status === 500){
				alert('Something went wrong!');
			} else {
				$window.history.back();
			}
		})
  	}

  	$scope.deleteEvent = function(eventId){
  		Events.deleteEvent(eventId).then(function(data){
		  	if(data.status === 500){
				alert('Something went wrong!');
			} else {
				alert('Event deleted!');
				Events.getUserProfile($routeParams.user).then(function(data) {
					console.log(data)
					if(data){
						$scope.data = data;	
					}
				});
			}
		})
  	}

});