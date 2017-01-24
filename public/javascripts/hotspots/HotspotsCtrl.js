angular.module("TouristHotspots")
.controller("HotspotsCtrl", HotspotsCtrl);

HotspotsCtrl.$inject = ["$log", "$scope", "$stateParams", "HistoryService", "HotspotsService", "uiGmapGoogleMapApi", "$q"];

function HotspotsCtrl($log, $scope, $stateParams, HistoryService, HotspotsService, uiGmapGoogleMapApi, $q) {
	/**
	 *	@param {String} destination 目的地 
	 *	@return {Object} distance {distance.value{Number}, distance.text{String}}
	 *	@description
	 *	返回当前地点到目的地的距离。返回承诺，先检查浏览器支不支持geolocation，如果支持，访问google api获取两地的距离。
	 */
	$scope.getDistance = function(destination) {
		var outsideScope = "abc";
		return $q(function(resolve, reject) {
			// 	check for Geolocation support
			if (navigator.geolocation) {
				//	get coordinates if supported
				navigator.geolocation.getCurrentPosition(function(position) {
					var currentCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					var origins = [currentCoords];
					var destinations = [destination];

					var distanceMatrix  = new google.maps.DistanceMatrixService();
					var distanceRequest = { origins: origins, destinations: destinations, travelMode: google.maps.TravelMode.DRIVING };

					//	make distance request
					distanceMatrix.getDistanceMatrix(distanceRequest, function(response, status) {
						
							if (status != google.maps.DistanceMatrixStatus.OK) {
						        var errMsg = "Unable to calculate distance";
						        reject(errMsg);
						    }
						    else {
						    	var distance = response.rows[0].elements[0].distance;
						    	resolve(distance);
						    	
						    }
					});
				});
			}
			else {
				$log.info('Geolocation is not supported for this Browser/OS version yet.');
			}
		});
	}

	/**
	 *	@mock
	 *	@description
	 *	从后端那得到景点。
	 */
	HotspotsService.getAll().then(function(result) {
		$scope.hotspots = result;
		//	获取从当前地理位置的距离然后添加属性
		angular.forEach(result, function(hotspot, index) {
			$scope.getDistance(result[index].name).then(function(result) {
				$scope.hotspots[index].distance = ((result !== undefined) ? result : {value: -1, text: "Probably too far away"});
			}, function(result) {
				$log.info(result);
			});
		});
	});

	/*
	 *	@description
	 *	过滤器显示和选择的控制。
	 */
	$scope.filters = {
		ratingsSelected: true,
		favouritesSelected: false,
		trailedSelected: false,
		wishlistSelected: false,
		recommendationScoreSelected: false,
		nearbySelected: false
	}

	/*
	 *	@description
	 *	用来过滤（排序）景点。
	 */
	var	filterNames = ["rating", "favourites", "trailed", "wishlist", "recommendationScore", "distance.value"];

	/*
	 *	@description
	 *	用来排序景点。
	 */
	$scope.selectedFilter = filterNames[0];

	/**
	 *	@description
	 *	把toggledFilter设成true，其他false
	 */
	var toggleFilter = function(toggledFilter) {
		Object.keys($scope.filters).forEach(function(key, index) {
			if (index == toggledFilter)
				$scope.filters[key] = true;
			else 
				$scope.filters[key] = false;
		});

		$scope.selectedFilter = filterNames[toggledFilter];
	}

	/**
	 *	@description
	 *	换过滤器，然后把显示的信息替换掉，而且再次排序数据。
	 */
	$scope.selectRatings = function() {toggleFilter(0);};
	$scope.selectFavourites = function() {toggleFilter(1);};
	$scope.selectTrail = function() {toggleFilter(2);}; 
	$scope.selectWishlist = function() {toggleFilter(3);};
	$scope.selectRecommended = function() {toggleFilter(4);};
	$scope.selectNearby = function() {toggleFilter(5);};

	/**
	 *	@mock
	 *	@description
	 *	模拟后端搜索功能。
	 */
	$scope.searchHotspots = function() {
		HotspotsService.searchHotspots($scope.hotspotsSearchField).then(function(result) {
			$scope.hotspots = result;	
		});

		
	}

	//	当从上个状态跳到这个状态而且带参数的，自动把搜索框填，自动搜索
	if ($stateParams.searchKeyword != "") {
		$scope.hotspotsSearchField = $stateParams.searchKeyword;
		$scope.searchHotspots();
	}

	$scope.saveToHistory = function() {
		HistoryService.save({keyword: $scope.hotspotsSearchField});
	}
}