angular.module("TouristHotspots", [	"ui.bootstrap", 
									"ui.router", 
									"ngFileUpload", 
									"ngSanitize", 
									"uiGmapgoogle-maps", 
									"ngAnimate"
								]);

angular.module("TouristHotspots")
.controller("HomeCtrl", HomeCtrl);

HomeCtrl.$inject = ["$log", "$scope", "$rootScope"];

function HomeCtrl($log, $scope, $rootScope) {
	
}