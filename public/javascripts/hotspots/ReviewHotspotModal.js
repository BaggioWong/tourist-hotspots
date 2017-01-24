angular.module("TouristHotspots")
.service("ReviewHotspotModal", ReviewHotspotModal);

ReviewHotspotModal.$inject = ["$log", "$uibModal"];

function ReviewHotspotModal($log, $uibModal) {
	this.open = function() {
		var modalInstance = $uibModal.open({
			templateUrl: "/views/hotspots/ReviewHotspotModal.ejs",
			controller: ReviewHotspotModalCtrl,
		});
	}
}

ReviewHotspotModalCtrl.$inject = ["$uibModalInstance", "$scope"];

function ReviewHotspotModalCtrl($uibModalInstance, $scope) {
	$scope.ok = function() {
		$uibModalInstance.close('cancel');
	}

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}