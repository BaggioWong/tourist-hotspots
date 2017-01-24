angular.module("TouristHotspots")
.controller("TestCtrl", TestCtrl);

TestCtrl.$inject = ["$log", "$scope", "$uibModal"];

function TestCtrl($log, $scope, $uibModal) {
	$scope.openModal = function() {
		var modalInstance = $uibModal.open({
			template: "Modal<br/><button class='btn btn-default' ng-click='ok()'>ok</button><br /><button class='btn btn-default' ng-click='cancel()'>cancel</button>",
			controller: function($uibModalInstance, $scope) {
				$scope.ok = function() {
					$uibModalInstance.close('cancel');
				}

				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			},
		});

		modalInstance.result.then(function() {

		}, function() {
			$log.info("Modal dismissed at: ", new Date());
		});
	}
}