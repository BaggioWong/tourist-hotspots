angular.module("TouristHotspots")
.controller("AvatarCtrl", AvatarCtrl);

AvatarCtrl.$inject = ["$log", "$scope", "UserService"];

function AvatarCtrl($log, $scope, UserService) {
	/**
	 *	@description
	 *	获取头像路径
	 */
	$scope.avatarUrl = function() {
		var mockUserId = "19239";
		return UserService.getAvatar(mockUserId);
	};

	$scope.printFile = function() {$log.info($scope.avatarFile);}

	/**
	 *	@description
	 *	改变头像
	 */
	$scope.changeAvatar = function() {
		$log.info($scope.avatarFile);		
	}
}