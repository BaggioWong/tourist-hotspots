angular.module("TouristHotspots")
.controller("LoginCtrl", LoginCtrl);

LoginCtrl.$inject = ["$log", "$scope", "$rootScope", "$state", "LoginService"];

function LoginCtrl($log, $scope, $rootScope, $state, LoginService) {
	/**
	 *	@description
	 *	用户登录数据	
	 */
	$scope.credentials = {
		username: "",
		password: ""
	}

	$scope.showErrorMsg = false;

	/**	
	 *	@description
	 *	登陆功能，包括调模拟后台登陆验证的功能，登陆成功后跳转到景点页面
	 */
	$scope.login = function() {
		LoginService.login($scope.credentials.username, $scope.credentials.password).then(function(result) {
			$rootScope.$emit("loginSuccessEvent", {});
			$state.go("hotspots");
		}, function(result) {
			//	显示错误信息
			$scope.error = {msg: result};
			$scope.showErrorMsg = true;
		});
	};;

		
	$scope.hideErrorMsg = function() {
		$scope.showErrorMsg = false;
	}
}