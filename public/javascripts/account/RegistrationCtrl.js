angular.module("TouristHotspots")
.controller("RegistrationCtrl", RegistrationCtrl);

RegistrationCtrl.$inject = ["$log", "$scope", "$state", "RegistrationService", "$interval"];

function RegistrationCtrl($log, $scope, $state, RegistrationService, $interval) {
	/**
	 *	@description
	 *	注册数据模型	
	 */
	$scope.credentials = {
		username: "",
		password: "",
		email: ""
	}

	/**
	 *	@description
	 *	显示成功、错误信息	
	 */
	$scope.showSuccessMsg = false;
	$scope.showErrorMsg = false;

	/**
	 *	@description
	 *	成功、错误信息模型	
	 */
	$scope.success = {msg: ""}
	$scope.error = {msg: ""}

	/**
	 *	@description
	 *	隐藏错误信息
	 */	
	$scope.hideErrorMsg = function() {
		$scope.showErrorMsg = false;
	}

	/**
	 *	@description
	 *	注册功能，调用模拟后台注册用户，注册成功会显示信息，过4秒会跳到登陆页面，不成功显示错误信息。
	 */
	$scope.register = function() {
		RegistrationService.register($scope.credentials.username, $scope.credentials.password, $scope.credentials.email).then(function(result){
			$scope.success = {
				msg: result
			}
			$scope.showSuccessMsg = true;

			var seconds = 4;
			var originalMsg = $scope.success.msg;
			$interval(function() {
				$scope.success.msg = originalMsg;
				$scope.success.msg = $scope.success.msg + " Redirecting to login page in " + seconds-- + " seconds.";

				if (seconds == 0)
					$state.go("login");
			}, 1000, 6);
		}, function(result) {
			$scope.error = {
				msg: result
			}
			$scope.showErrorMsg = true;			
		});
	}
}