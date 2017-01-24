angular.module("TouristHotspots")
.service("WishlistService", WishlistService);

WishlistService.$inject = ["$log", "$q"];

function WishlistService($log, $q) {
	/**
	 *	@mock
	 */
	var wishlist = [
		{	
			id: 19283,
			name: "Universal's Islands of Adventure",
			review: "This was my first visit to IOA and I loved it so much. \nGreat Parts \nThe 'big' coasters. Hulk especially is the best ride in Orlando. Dualling dragons great too.Strong theming. Marvel island was like heaven for me! Great rides, great theming, great shops. Jurassic Park also amazing and of course Harry Potter. Staff, when around were brilliant. I'm a big chap and was unable to ride Forbidden Journey but staff member was so nice and accommodating about it. Still did then tour of the castle and waited for my partner who essentially was given a express pass so I wasn't waiting by myself. \nCould be better: \nLocker systems. Lockers themselves are free and plentiful in but there's too many idiots queueing in such a small space I.e. 5 people queuing to then put all stuff in 1 locker. Was nearly a crush at Dualling Dragons but staff member spotted it and manned it till it calmed down. Potentially these areas should be manned at all times.",
			summary: "Universal's Islands of Adventure is a theme park in Florida. It opened on May 28, 1999, along with CityWalk, as part of an expansion that converted Universal Studios Florida into the Universal Orlando Resort."
		},
		{
			id: 20193,
			name: "Discovery Cove",
			review: "Don't be put off by the price...This day of r n r amidst the hectic schedules of a Disney holiday, is worth its weight in gold! As places are limited here, there is no queueing or crowding and it offers a break for a day. The dolphin experience is wonderful, as is the ray pool. Food, wetsuit hire etc is all inclusive but keep a little cash reserved for photos/dvd. They are unsurprisingly expensive as they know you will definitely want keepsakes of this magical day.",
			summary: "6000 Discovery Cove Way, Orlando, FL 32821"
		}
	];

	/** 
	 *	@mock
	 */
	this.wishlistVerification = function(username) {
		//	模拟应该检查用户存在不，心愿单是否空，等。
		return true;
	}

	/**
	 *	@description
	 *	获取一个用户的心愿单
	 */
	this.get = function(username) {
		var wishlistVerification = this.wishlistVerification;
		var wishlistResult = {wishlist: wishlist};

		return $q(function(resolve, reject) {
			if (wishlistVerification(username))
				resolve(wishlistResult);
			else
				reject("Failed to fetch wishlist.");
		})	
	}

	/**
	 *	@description
	 *	搜索用户的心愿单，这里假设只有一个用户
	 */
	this.search = function(phrase) {
		var result = []
		angular.forEach(wishlist, function(item, index) {
			if (item.name.indexOf(phrase) !== -1 || 
				item.review.indexOf(phrase) !== -1 || 
				item.summary.indexOf(phrase) !== -1) {
				result.push(item);
			}
		});	

		return result;
	}

	/**
	 *	@description
	 *	删除心愿单的一个景点
	 */
	this.delete = function(hotspotId) {
		angular.forEach(wishlist, function(item, index) {
			if (item.id === hotspotId) 
				wishlist.splice(index, 1);
		});
	}

	/**
	 *	@description
	 *	编辑有三种
	 */
	var EDIT_MODE = {
		NAME: 0,
		REVIEW: 1,
		SUMMARY: 2
	}

	/**
	 *	@description
	 *	三种编辑的模拟后台功能
	 */
	this.edit = function(hotspotId, type, content) {
		angular.forEach(wishlist, function(item, index) {
			if (item.id === hotspotId) {
				if (type == EDIT_MODE.NAME)
					wishlist[index].name = content;
				else if (type == EDIT_MODE.REVIEW)
					wishlist[index].review = content;
				else if (type == EDIT_MODE.SUMMARY)
					wishlist[index].summary = content;
			}
		});	
	}
}