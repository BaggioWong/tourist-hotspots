angular.module("TouristHotspots")
.service("MovieModal", MovieModal);

MovieModal.$inject = ["$log", "$uibModal"];

function MovieModal($log, $uibModal) {
	this.open = function(movieUrl) {
		var modalInstance = $uibModal.open({
			templateUrl: "/views/hotspots/MovieModal.ejs",
			controller: MovieModalCtrl,
			resolve: {
				movieUrl: function() {
					return movieUrl;
				} 
			}
		});
	}
}

MovieModalCtrl.$inject = ["$uibModalInstance", "$scope", "movieUrl"];

function MovieModalCtrl($uibModalInstance, $scope, movieUrl) {
	$scope.movieUrl =  movieUrl;
}