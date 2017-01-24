angular.module("TouristHotspots")
.service("ReportHotspotModal", ReportHotspotModal);

ReportHotspotModal.$inject = ["$log", "$uibModal"];

function ReportHotspotModal($log, $uibModal) {
	this.open = function() {
		var modalInstance = $uibModal.open({
			templateUrl: "/views/hotspots/ReportHotspotModal.ejs",
			controller: ReportHotspotModalCtrl,
			resolve: {}
		});
	}
}

ReportHotspotModalCtrl.$inject = ["$uibModalInstance", "$scope", "$interval", "$log"];

function ReportHotspotModalCtrl($uibModalInstance, $scope, $interval, $log) {
	$scope.success = {msg: "Report submitted. You will hear from us shortly."};

	$scope.showSuccessMsg = false;

	/**
	 *	@description
	 *	模拟提交功能。6秒后关掉。	
	 */
	$scope.submit = function() {
		/**
		 *	@restangular
		 */

		$scope.showSuccessMsg = true;

		var seconds = 4;
		var originalMsg = $scope.success.msg;
		$interval(function() {
			$scope.success.msg = originalMsg;
			$scope.success.msg = $scope.success.msg + " Closing in " + seconds-- + " seconds.";

			if (seconds == 0)
				$uibModalInstance.close();
		}, 1000, 6);
	}

	$scope.cancel = function () {
		$uibModalInstance.dismiss();
	};

	$scope.uploadFiles = function($files) {
		$scope.files = $files;
	}
}