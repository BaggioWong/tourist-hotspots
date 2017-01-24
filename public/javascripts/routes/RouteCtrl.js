angular.module("TouristHotspots")
.controller("RouteCtrl", RouteCtrl);

RouteCtrl.$inject = ["uiGmapIsReady", "$log", "$scope", "uiGmapGoogleMapApi", "$timeout", "$q", "$stateParams"];

function RouteCtrl(uiGmapIsReady, $log, $scope, uiGmapGoogleMapApi, $timeout, $q, $stateParams) {
	/**
	 *	@mock
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
	 *	字符串的地址。
	 */
	$scope.destination = {
		from: null,
		to: null
	}

	/**
	 *	@description
	 *	切换出发地和目的地。
	 */
	$scope.swap = function() {
		var temp = $scope.destination.from; 
		$scope.destination.from = $scope.destination.to;
		$scope.destination.to = temp;
	}

	/**
	 *	@description
	 *	保存当前地理位置的对象。
	 */	
	$scope.currentLocation = {
		lat: 0,
		lng: 0,
		address: ""
	}

	/**
	 *	@description
	 *	地图属性。
	 */
	$scope.map = { 
		center: {
			latitude: $scope.hotspot.location.lat, 	//	默认的
			longitude: $scope.hotspot.location.lng
		},
		zoom: 17,  
		options: {
			scrollwheel: false,
		},
		control: {}
	};

	/**
	 *	@description
	 *	标识符号属性。
	 */
	$scope.marker = {
		id: 0,
		center: {
			latitude: $scope.hotspot.location.lat, 	//	默认
			longitude: $scope.hotspot.location.lng
		}
	};

	// 	检查支不支持geolocation
	if (navigator.geolocation) {
		//	改变标识符号和地图中心位置
		navigator.geolocation.getCurrentPosition(function(position) {
			var current = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			}

			$scope.map.center = current;
			$scope.marker.coords = current;
		});
	} else {
		var mockLatLng = {
			latitude: $scope.hotspot.location.lat, 	//	默认
			longitude: $scope.hotspot.location.lng 
		}

		$scope.map.center = mockLatLng;
		$scope.marker.coords = mockLatLng;
	}

	/**
	 *	@description
	 *	坐标地址转换服务。
	 */	
	var geocoder = new google.maps.Geocoder();
	

	/**
	 *	@return 	{Promise} 	如果ok返回地址，不ok返回提示信息。
	 *	@description
	 *	坐标换成地址。
	 */
	var latlngToAddress = function(lat, lng) {
		return $q(function(resolve, reject) {
			geocoder.geocode({
				location: {lat: lat, lng: lng}
			}, function(result, status) {
				// $log.info("Result: ", result, " Status: ", status);
				if (status == "OK" && result.length > 0)
					resolve(result[0].formatted_address);
				else 
					reject("No address was found");
			})	
		})
		
	}

	/**
	 *	@description
	 *	设置当前的坐标和地址。 
	 */
	$scope.setCoordinates  = function() {
		// 	检查支不支持geolocation
		if (navigator.geolocation) {
			//	获取坐标
			navigator.geolocation.getCurrentPosition(function(position) {
				$scope.currentLocation.lat = position.coords.latitude; 
				$scope.currentLocation.lng = position.coords.longitude; 

				//	转换坐标到地址，保存
				latlngToAddress(position.coords.latitude, position.coords.longitude).then(function(result) {
					$scope.currentLocation.address = result;
				});

				//	change the input display text to "Current location" (treat as a special value)
				$scope.$apply(function() {
					$scope.destination.from = "Current location"; 
				});

				return true;
			});
		}
		else {
			$log.info('Geolocation is not supported for this Browser/OS version yet.');
		}
	}

	$scope.setCoordinatesQ = function() {
		return $q(function(resolve, reject) {
			// 	check for Geolocation support
			if (navigator.geolocation) {
				//	get coordinates if supported
				navigator.geolocation.getCurrentPosition(function(position) {
					$scope.currentLocation.lat = position.coords.latitude; 
					$scope.currentLocation.lng = position.coords.longitude; 

					//	convert coordinates to address and save address
					latlngToAddress(position.coords.latitude, position.coords.longitude).then(function(result) {
						$scope.currentLocation.address = result;

						resolve(result);
					});

					//	change the input display text to "Current location" (treat as a special value)
					$scope.$apply(function() {
						$scope.destination.from = "Current location"; 
					});



					
				}, function(error) {
					reject(error);
				});
			}
			else {
				$log.info('Geolocation is not supported for this Browser/OS version yet.');
			}		
		});
		
	}

	/**
	 *	@description
	 *	若出发地 "Current location", 清掉输入框
	 */	
	$scope.clearFrom = function() {
		if ($scope.destination.from == "Current location")
			$scope.destination.from = "";
	}

	/**
	 *	@description
	 *	若目的地 "Current location", 清掉输入框
	 */	
	$scope.clearTo = function() {
		if ($scope.destination.to == "Current location")
			$scope.destination.to = "";
	}

	/**
	 *	@description
	 *	显示错误信息控制值
	 */
	$scope.routeUnsuccessful = false;

	/**
	 *	@description
	 *	显示详细信息控制值
	 */
	$scope.showDetailed = false;

	/**
	 *	@description
	 *	错误信息内容
	 */
	$scope.alert = {msg: "Oh drat, it seems like we can't calculate a route between these two places. Try again? "};

	/**
	 *	@description
	 *	隐藏错误信息
	 */
	$scope.closeAlert = function() {$scope.routeUnsuccessful = false;}

	/**
	 *	@description
	 *	禁止使用或者正常使用的控制值
	 */
	$scope.detailedDisabled = true;


	/**
	 *	@description
	 *	获取出发地和目的地的路线然后地图上显示
	 *
	 *	当地图加载好才会执行 
	 */
	uiGmapIsReady.promise(1).then(function(instances) {
		//	循环当页的地图
		instances.forEach(function(inst) {
			// 	初始化google 服务
			var directionsDisplay = new google.maps.DirectionsRenderer();
			var directionsService = new google.maps.DirectionsService();
			  
			//	获取路线，默认为开车模式
			$scope.getDirections = function () {
				var request = {
					origin: (($scope.destination.from == "Current location") ? $scope.currentLocation.address : $scope.destination.from),
					destination: (($scope.destination.to == "Current location") ? $scope.currentLocation.address : $scope.destination.to),
					travelMode: google.maps.DirectionsTravelMode.DRIVING
				};

				//	获取路线，在地图显示，显示详细方向
				directionsService.route(request, function (response, status) {
					if (status === google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
						directionsDisplay.setMap(inst.map);
						directionsDisplay.setPanel(document.getElementById('detailedPanel'));

						//	成功后才正常显示显示详细信息按钮
						$scope.detailedDisabled = false;

						//	显示或者隐藏详细信息
						$scope.showDetails = function() {
							if ($scope.showDetailed)
								$scope.showDetailed = false;
							else
								$scope.showDetailed = true;
						}
					} else {	
						//	失败的提示信息
						$scope.$apply(function() {
							$scope.routeUnsuccessful = true;
						});
					}
				});
			}

			if ($stateParams.destination != "") {
				$scope.destination.from = "Current location";
				$scope.destination.to = $stateParams.destination;

				$scope.setCoordinatesQ().then(function(result) {
					$log.info("In the setCoordinates promise: ", result);
					$scope.getDirections();	
				})
			}
		});
	});	 
}