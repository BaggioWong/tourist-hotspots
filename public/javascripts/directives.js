angular.module("TouristHotspots")
.directive("topNavBar", TopNavBarDirective); 

function TopNavBarDirective() {
	return {
		restrict: "E", 
		templateUrl: "/views/main/top-nav-bar.ejs", 
		controller: TopNavBarCtrl
	}
}

TopNavBarCtrl.$inject = ["$log", "$rootScope", "$scope", "$state"];

/**
 *	@description
 *	导航菜单
 */
function TopNavBarCtrl($log, $rootScope, $scope, $state) {
	$scope.showMenu = $rootScope.loggedIn;

	$rootScope.$on("loginSuccessEvent", function(){
		$scope.showMenu = true;
		$rootScope.loggedIn = true;
	});

	$scope.logout = function() {
		$scope.showMenu = false;
		$rootScope.loggedIn = false;

		$state.go("login");
	}
}