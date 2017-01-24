angular.module("TouristHotspots")
.controller("HistoryCtrl", HistoryCtrl);

HistoryCtrl.$inject = ["$log", "$scope", "HistoryService"];

function HistoryCtrl($log, $scope, HistoryService) {
	$scope.searchHistory = HistoryService.get();

	/**
	 *	@mock
	 *	@description
	 *	恢复数据
	 */
	$scope.restoreArray = function() {
		$scope.searchHistory = HistoryService.get();
	}

	/**
	 *	@mock
	 *	@description
	 *	模拟后台搜索历史功能
	 */
	$scope.searchSearchHistory = function() {
		var resultArray = [];
		var counter = 0;

		for (var i = 0; i < $scope.searchHistory.length; i++) {
			if ($scope.searchHistory[i].keyword.indexOf($scope.historySearchField) !== -1)
				resultArray[counter++] = $scope.searchHistory[i];
		}

		$scope.searchHistory = resultArray;
	}
}
