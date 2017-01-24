angular.module("TouristHotspots")
.service("HotspotQuestionnaireModal", HotspotQuestionnaireModal);

HotspotQuestionnaireModal.$inject = ["$log", "$uibModal"];

function HotspotQuestionnaireModal($log, $uibModal) {
	this.open = function() {
		var modalInstance = $uibModal.open({
			templateUrl: "/views/hotspots/hotspotQuestionnaireModal.ejs",
			controller: HotspotQuestionnaireModalCtrl,
			resolve: {}	//	ctrl 到 modal 传数据
		});
	}
}

HotspotQuestionnaireModalCtrl.$inject = ["$uibModalInstance", "$scope", "$interval", "$log"];

function HotspotQuestionnaireModalCtrl($uibModalInstance, $scope, $interval, $log) {
	$scope.questions = {};
	$scope.success = {msg: "Report submitted. You will hear from us shortly."};
	$scope.showSuccessMsg = false;

	/**
	 *	@description
	 *	模拟提交数据，提交成功6秒后会自动关掉	
	 */
	$scope.submit = function() {
		//	restangular call to submit problem

		$scope.showSuccessMsg = true;

		var seconds = 4;
		var originalMsg = $scope.success.msg;
		$interval(function() {
			$scope.success.msg = originalMsg;
			$scope.success.msg = $scope.success.msg + " Closing in " + seconds-- + " seconds.";

			if (seconds == 0)
				$uibModalInstance.close();	//	pass parameters from modal to calling ctrl
		}, 1000, 6);
	}

	$scope.cancel = function () {
		$uibModalInstance.dismiss();
	};
	
	$scope.uploadFiles = function($files) {
		$scope.files = $files;
	}
}