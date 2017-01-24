angular.module("TouristHotspots")
.controller("WishlistCtrl", WishlistCtrl);

WishlistCtrl.$inject = ["$log", "$scope", "WishlistService"];

function WishlistCtrl($log, $scope, WishlistService) {
	//	显示逻辑用
	$scope.toggleEditState = function(hotspot) {hotspot.editState = (hotspot.editState) ? false : true;}
	$scope.toggleEditingHotspot = function (hotspot) {hotspot.editingHotspot = (hotspot.editingHotspot) ? false : true;}
	$scope.toggleEditingReview = function(hotspot) {hotspot.editingReview = (hotspot.editingReview) ? false : true;}
	$scope.toggleEditingSummary = function(hotspot) {hotspot.editingSummary = (hotspot.editingSummary) ? false : true;}
	$scope.deleteHotspot = function(hotspot) {hotspot.deleted = true;} 	//	one time operation (can't undo deletes)

	$scope.hotspots = [];

	/**
	 *	@mocked
	 *	@description
	 *	获取心愿单，每个单项加上不同属性控制显示逻辑
	 */
 	var username = "mocked";
 	WishlistService.get(username).then(function(result) {
 		$scope.hotspots = angular.copy(result.wishlist);

 		var extendedProperties = {
 			editState: false,
			editingHotspot: false,
			editingReview: false,
			editingSummary: false,
			deleted: false
 		}

 		angular.forEach($scope.hotspots, function(value, index) {
 			angular.extend($scope.hotspots[index], extendedProperties);
 		});
 	}, function(result) {
 		$log.info(result);
 	});

	/**
	 *	@description
	 *	搜索心愿单
	 */ 	
	$scope.searchWishlist = function() {
		$scope.hotspots = WishlistService.search($scope.wishlistSearchField);
	}

	/**
	 *	@description
	 *	删除景点
	 */
	$scope.deleteHotspot = function(hotspotId) {
		WishlistService.delete(hotspotId);
		$scope.hotspots = WishlistService.search("");
	}

	/**
	 *	@description
	 *	编辑名字
	 */
	$scope.editName = function(hotspotId, content) {
		WishlistService.edit(hotspotId, 0, content);
	}

	/**
	 *	@description
	 *	编辑评论
	 */
	$scope.editReview = function(hotspotId, content) {
		WishlistService.edit(hotspotId, 1, content);
	}

	/**
	 *	@description
	 *	删除详细信息
	 */
	$scope.editSummary = function(hotspotId, content) {
		WishlistService.edit(hotspotId, 2, content);
	}
}