angular.module("TouristHotspots")
.controller("SingleHotspotCtrl", SingleHotspotCtrl);

SingleHotspotCtrl.$inject = ["$log", "$scope", "ReviewHotspotModal", "$rootScope", "$state", "MovieModal", 
							"ReportHotspotModal", "uiGmapGoogleMapApi", "$stateParams", "uiGmapIsReady", 
							"HotspotsService", "HotspotQuestionnaireModal"];

function SingleHotspotCtrl($log, $scope, ReviewHotspotModal, $rootScope, $state, MovieModal, 
							ReportHotspotModal, uiGmapGoogleMapApi, $stateParams, uiGmapIsReady,
							HotspotsService, HotspotQuestionnaireModal) {

	$scope.openReviewModal = function() {ReviewHotspotModal.open();}
	$scope.openReportModal = function() {ReportHotspotModal.open();}
	$scope.openQuestionnaireModal = function() {HotspotQuestionnaireModal.open();}

	HotspotsService.getHotspot($stateParams.hotspotId).then(function(result) {
	 	$scope.hotspot = result;
	 	$scope.hotspotPhotos = result.photos;
	 	$scope.hotspotReviews = result.reviews;
	 });

	/**
	 *	@description
	 *	返回上页。
	 */
	$scope.goToPrevious = function() {
		$state.go($rootScope.route.from.name);
	}

	/**
	 *	@description
	 *	控制显示信息。
	 */
	$scope.showBasicInformation = false;
	$scope.toggleBasicInformation = function() {$scope.showBasicInformation = (($scope.showBasicInformation) ? false : true);}

	$scope.showRatings = false;
	$scope.toggleRatings = function() {$scope.showRatings = (($scope.showRatings) ? false : true);}

	$scope.showPhotos = false;
	$scope.togglePhotos = function() {$scope.showPhotos = (($scope.showPhotos) ? false : true);}

	$scope.showReviews = false;
	$scope.toggleReviews = function() {$scope.showReviews = (($scope.showReviews) ? false : true);}

	/**
	 *	@description
	 *	控制收藏、足迹等按钮颜色。
	 */
	HotspotsService.getHotspotMeta($stateParams.hotspotId, 2938).then(function(result) {
		$scope.favouriteClicked = result.favourited;
		$scope.trailClicked = result.trailed;
		$scope.wishlistClicked = result.addedToWishlist;
		$scope.shareClicked = false; 	//	shared does not have saved state
	});

	/**
	 *	@restangular
	 */
	$scope.toggleFavourite = function() {
		if ($scope.favouriteClicked) {
			$scope.favouriteClicked = false;
			return false;
		} else {
			$scope.favouriteClicked = true;
			return true;
		}
	}

	$scope.toggleTrail = function() {
		if ($scope.trailClicked) {
			$scope.trailClicked = false;
			return false;
		} else {
			$scope.trailClicked = true;
			return true;
		}
	}

	$scope.toggleWishlist = function() {
		if ($scope.wishlistClicked) {
			$scope.wishlistClicked = false;
			return false;
		} else {
			$scope.wishlistClicked = true;
			return true;
		}
	}

	/**
	 *		
	 *	@todo
	 *	Sharing modal. 
	 *	@extensible
	 *	@description
	 *	分享不会被保存的。用户可以多次分享。而且分享完就不能够撤销，所以颜色一次改变。
	 */
	$scope.toggleShare = function() {
		$scope.shareClicked = true;
		return true;
	}

	/**
	 *	@description
	 *	地图属性。
	 */
	$scope.map = { 
		center: { 
			latitude: 41.9179646, 
			longitude: 8.738659699999999
		}, 
		zoom: 16,  
		options: {
			draggable: false,
			scrollwheel: false
		}
	};

	/**
	 *	@warning
	 *	此页面暂时不能被刷新或者从其他页面访问，只能从 /hotspots 访问，因为需要参数。有些地方可能还没有更新。
	 *	
	 *	@description
	 *	放置标识符号，设置地图中心为当前位置。
	 */
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		address: $stateParams.name
	}, function(result, status) {
		if (status == 'OK') {
			$scope.$apply(function() {
				$scope.marker = {
					id: 0,
					coords: {
						latitude: result[0].geometry.location.lat(),
						longitude: result[0].geometry.location.lng()
					}
				};
			});

			$scope.map.center.latitude = result[0].geometry.location.lat();
			$scope.map.center.longitude = result[0].geometry.location.lng();
		} else {
			//	失败是模拟默认数据
			$scope.marker = {
				id: 0,
				coords: {
					latitude: 41.9179646,
					longitude: 8.738659699999999
				}
			};
		}
	});

	/**
	 *	@description
	 *	打开视频弹出层	
	 */
	$scope.openMovie = function(movieUrl) {
		MovieModal.open(movieUrl);
	};
}