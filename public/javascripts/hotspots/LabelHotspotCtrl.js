angular.module("TouristHotspots")
.controller("LabelHotspotCtrl", LabelHotspotCtrl);

LabelHotspotCtrl.$inject = ["$log", "$scope", "$rootScope", "$state", "$stateParams"];

function LabelHotspotCtrl($log, $scope, $rootScope, $state, $stateParams) {
	/**
	 *	@mock
	 *	模拟当前页面的景点的数据
	 */
	$scope.hotspot = {
		id: 19283,
		location: {
			lat: 41.9179646,
			lng: 8.738659699999999
		},
		averageRating: 3.2,
		roundedRating: 3,
		raters: 2819,
		ratings: {
			oneStar: 4.8,
			twoStar: 27.6,
			threeStar: 28.9,
			fourStar: 18.3,
			fiveStar: 20.4
		},
		basicInformation: {
			summary: "Le musée de la Maison Bonaparte est un musée créé dans la maison où Napoléon Bonaparte est né à Ajaccio, et où il a passé son enfance.",
			address: "1 Rue Saint-Charles, 20000 Ajaccio, France",
			openingHours: "10:30–12:30, 13:15–16:30",
			telephone: "+33 4 95 21 43 89"	
		}, 
		user: 2938,
		username: "FranklinRoosevelt",
		favourited: true, 
		trailed: false,
		addedToWishlist: true
	}

	/**
	 *	@description
	 *	返回上层页面	
	 */
	$scope.goToPrevious = function() {
		$state.go($rootScope.route.from.name, {hotspotId: $stateParams.hotspotId});
	}

	/**
	 *	@description
	 *	地图属性
	 */
	$scope.map = { 
		center: { 
			latitude: $scope.hotspot.location.lat, 
			longitude: $scope.hotspot.location.lng 
		}, 
		zoom: 17,  
		options: {
			draggable: false,
			scrollwheel: false

		}
	};

	/**
	 *	@mock
	 *	设施选项
	 */
	$scope.facilities = [
		{name: "Benches"},
		{name: "Toilets"},
		{name: "Information desks"},
		{name: "Guideposts"},
		{name: "Buggies / carts"},
		{name: "Restaurants"},
		{name: "Souvenir shops"}
	];

	/**
	 *	@description
	 *	不同的标识符号的颜色
	 */
	$scope.MARKER_COLORS = {RED: 0, ORANGE: 1, YELLOW: 2, GREEN: 3, LIME: 4, LIGHTBLUE: 5, BLUE: 6, VIOLET: 7};

	/**
	 *	@description
	 *	标识符号有名字、颜色和index
	 */	
	$scope.markers = [
		{name: "red", color: "EF9A9A", index: 0},
		{name: "orange", color: "FFCC80", index: 1},
		{name: "yellow", color: "FFF59D", index: 2},
		{name: "green", color: "A5D6A7", index: 3},
		{name: "lime", color: "C5E1A5", index: 4},
		{name: "lightBlue", color: "81D4FA", index: 5},
		{name: "blue", color: "9FA8DA", index: 6},
		{name: "violet", color: "CE93D8", index: 7}
	]

	/**
	 *	@description
	 *	基于颜色获取标识符号icon
	 */
    var pinImage = function(MARKER_COLOR) {return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + $scope.markers[MARKER_COLOR].color;}

    /**
     *	@description
     *	把标签换成数字
     */
	$scope.labels = {activity: 0, place: 1, recommendations: 2};
	
	/**
	 *	@description
	 *	用来切换标签 (活动、地方、推荐)
	 */
	$scope.labelsSelected = [true, false, false];

	/**
	 *	@description
	 *	基本弹出视窗选项 
	 */
	$scope.windowOptions = {
        visible: false
    };

    $scope.closeClick = function() {
        $scope.windowOptions.visible = false;
    };

    /**
     *	@mock
     *	活动标识符号
     */
	$scope.activityMarkers = [
		{
			id: 0,	//	这些好像可以控制标识符如果有重叠的叠顺序
			coords: {
				latitude: 41.9179646,
				longitude: 8.738659699999999
			},
			options: {
				icon: pinImage($scope.MARKER_COLORS.ORANGE), 
				draggable: false
			}, 
			user: 2938,
			username: "FranklinRoosevelt"	
		},
		{
			id: 1,
			coords: {
				latitude: 41.9189646,
				longitude: 8.738659699999999
			},
			options: {
				icon: pinImage($scope.MARKER_COLORS.RED),
				draggable: false
			},
			user: 2938,
			username: "FranklinRoosevelt"	
		},
		{
			id: 2,
			coords: {
				latitude: 41.9189746,
				longitude: 8.737659699999999
			},
			options: {
				icon: pinImage($scope.MARKER_COLORS.RED),
				draggable: false
			},
			user: 2018,
			username: "BiotSavart"
		}
	];

	/**
	 *	@description
	 *	切换三个标签
	 */
	$scope.activityMarkersCopy = $scope.activityMarkers;
    $scope.labelMarkersCopy;
    $scope.recommendationMarkersCopy;

    /**
     *	@mock
     *	当前用户使用什么活动标识符号
     */	
    $scope.usedActivityMarkers = [$scope.MARKER_COLORS.RED, $scope.MARKER_COLORS.ORANGE];

    /**
     *	@description
     *	看看某标签的某颜色的标识符号是不是已经用过。
     *	依赖 usedActivityMarkers。
     */
    $scope.markerIsUsed = function(labelType, MARKER_COLOR) {
    	if ($scope.usedActivityMarkers.indexOf(MARKER_COLOR) == -1)
    		return false;
    	else 
    		return true;
    }

    /**
     *	@description
     *	在地图上加一个 labelType, markerType 的标识符号，如果那标识符号没有已经被加进去的话。每一个用户只能够一个景点使用一个标签。
     *	为了方便，用了的标签，我们设置不能够删除。
     */
	$scope.addMarker = function(labelType, markerType) {
		if (labelType == $scope.labels.activity) {
			if (!$scope.markerIsUsed($scope.labels.activity, $scope.MARKER_COLORS.RED) && markerType == $scope.MARKER_COLORS.RED) {
				$scope.activityMarkers.push({
					id: 200,
					coords: {latitude: 41.9179646, longitude: 8.738659699999999},
					options: {icon: pinImage($scope.MARKER_COLORS.RED), draggable: true},
					events: {
						dragend: function(marker, eventName, model, arguments) {
							$log.info(model.coords);
							/**
							 *	@Restangular
							 */
						}
					}	
				});
				$scope.usedActivityMarkers.push($scope.MARKER_COLORS.RED);
			} else if (!$scope.markerIsUsed($scope.labels.activity, $scope.MARKER_COLORS.ORANGE) && markerType == $scope.MARKER_COLORS.ORANGE) {
				$scope.activityMarkers.push({
					id: 201,
					coords: {latitude: 41.9179646, longitude: 8.738659699999999},
					options: {icon: pinImage($scope.MARKER_COLORS.ORANGE), draggable: true},
					events: {
						dragend: function(marker, eventName, model, arguments) {
							$log.info(model.coords);
						}
					}	
				});
				$scope.usedActivityMarkers.push($scope.MARKER_COLORS.ORANGE);
			} else if (!$scope.markerIsUsed($scope.labels.activity, $scope.MARKER_COLORS.YELLOW) && markerType == $scope.MARKER_COLORS.YELLOW) {
				$scope.activityMarkers.push({
					id: 202,
					coords: {latitude: 41.9179646, longitude: 8.738659699999999},
					options: {icon: pinImage($scope.MARKER_COLORS.YELLOW), draggable: true},
					events: {
						dragend: function(marker, eventName, model, arguments) {
							$log.info(model.coords);
						}
					}	
				});
				$scope.usedActivityMarkers.push($scope.MARKER_COLORS.YELLOW);
			} else if (!$scope.markerIsUsed($scope.labels.activity, $scope.MARKER_COLORS.GREEN) && markerType == $scope.MARKER_COLORS.GREEN) {
				$scope.activityMarkers.push({
					id: 203,
					coords: {latitude: 41.9179646, longitude: 8.738659699999999},
					options: {icon: pinImage($scope.MARKER_COLORS.GREEN), draggable: true},
					events: {
						dragend: function(marker, eventName, model, arguments) {
							$log.info(model.coords);
						}
					}	
				});
				$scope.usedActivityMarkers.push($scope.MARKER_COLORS.GREEN);
			} else if (!$scope.markerIsUsed($scope.labels.activity, $scope.MARKER_COLORS.LIME) && markerType == $scope.MARKER_COLORS.LIME) {
				$scope.activityMarkers.push({
					id: 204,
					coords: {latitude: 41.9179646, longitude: 8.738659699999999},
					options: {icon: pinImage($scope.MARKER_COLORS.LIME), draggable: true},
					events: {
						dragend: function(marker, eventName, model, arguments) {
							$log.info(model.coords);
						}
					}	
				});
				$scope.usedActivityMarkers.push($scope.MARKER_COLORS.LIME);
			} else if (!$scope.markerIsUsed($scope.labels.activity, $scope.MARKER_COLORS.LIGHTBLUE) && markerType == $scope.MARKER_COLORS.LIGHTBLUE) {
				$scope.activityMarkers.push({
					id: 205,
					coords: {latitude: 41.9179646, longitude: 8.738659699999999},
					options: {icon: pinImage($scope.MARKER_COLORS.LIGHTBLUE), draggable: true},
					events: {
						dragend: function(marker, eventName, model, arguments) {
							$log.info(model.coords);
						}
					}	
				});
				$scope.usedActivityMarkers.push($scope.MARKER_COLORS.LIGHTBLUE);
			} else if (!$scope.markerIsUsed($scope.labels.activity, $scope.MARKER_COLORS.BLUE) && markerType == $scope.MARKER_COLORS.BLUE) {
				$scope.activityMarkers.push({
					id: 206,
					coords: {latitude: 41.9179646, longitude: 8.738659699999999},
					options: {icon: pinImage($scope.MARKER_COLORS.BLUE), draggable: true},
					events: {
						dragend: function(marker, eventName, model, arguments) {
							$log.info(model.coords);
						}
					}	
				});
				$scope.usedActivityMarkers.push($scope.MARKER_COLORS.BLUE);
			} else if (!$scope.markerIsUsed($scope.labels.activity, $scope.MARKER_COLORS.VIOLET) && markerType == $scope.MARKER_COLORS.VIOLET) {
				$scope.activityMarkers.push({
					id: 207,
					coords: {latitude: 41.9179646, longitude: 8.738659699999999},
					options: {icon: pinImage($scope.MARKER_COLORS.VIOLET), draggable: true},
					events: {
						dragend: function(marker, eventName, model, arguments) {
							$log.info(model.coords);
						}
					}	
				});
				$scope.usedActivityMarkers.push($scope.MARKER_COLORS.VIOLET);
			}
		}
	}

	/**
	 *	@warning
	 *	没加一个标识符号要在两个数据维持。切换标签的时候需要用备份数组恢复。
	 */
	var toggleLabelType = function(labelType) {
		//	change which set of markers show
		for (var i = 0; i < 3; i++)
			if (i != labelType)
				$scope.labelsSelected[i] = false;
			else
				$scope.labelsSelected[i] = true;

		//	hide markers of other map types
		if (labelType != $scope.labels.activity) {
			$scope.activityMarkers = null;
		}

		if (labelType != $scope.labels.place) {
			$scope.placeMarkers = null;
		}

		if (labelType != $scope.labels.recommendations) {
			$scope.recommendationMarkers = null;
		}

		//	restore labels of currently selected label
		if (labelType == $scope.labels.activity) {
			$scope.activityMarkers = $scope.activityMarkersCopy;
		} else if (labelType == $scope.labels.place) {
			$scope.placeMarkers = $scope.placeMarkersCopy;
		} else if (labelType == $scope.labels.recommendations) {
			$scope.recommendationMarkers = $scope.recommendationMarkersCopy;
		} 
	}

	/**
	 *	@description
	 *	切换标签用的。
	 */
	$scope.toggleActivity = function() {toggleLabelType($scope.labels.activity);}
	$scope.togglePlace = function() {toggleLabelType($scope.labels.place);}
	$scope.toggleRecommendations = function() {toggleLabelType($scope.labels.recommendations);}
}