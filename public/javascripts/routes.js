angular.module("TouristHotspots")
.config(TouristHotspotsConfig);

TouristHotspotsConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

function TouristHotspotsConfig($stateProvider, $urlRouterProvider) {
	var home = {
		name: "home", 
		url: "/",
		tepmlateUrl: "/views/index.ejs",
		controller: "HomeCtrl"	
	}
	
	var hotspots = {
		name: "hotspots",
		url: "/hotspots",
		templateUrl: "/views/hotspots/hotspots.ejs",
		controller: "HotspotsCtrl",
		params: {
			searchKeyword: ""
		}
	}

	var singleHotspot = {
		name: "singleHotspot",
		url: "/hotspot/{hotspotId}",
		templateUrl: "/views/hotspots/singleHotspot.ejs",
		controller: "SingleHotspotCtrl",
		params: {
			name: ""
		}
	}

	var labelHotspot = {
		name: "labelHotspot", 
		url: "/hotspot/{hotspotId}/label",
		templateUrl: "/views/hotspots/labelHotspot.ejs",
		controller: "LabelHotspotCtrl"
	}

	var history = {
		name: "history",
		url: "/history",
		templateUrl: "/views/history/history.ejs",
		controller: "HistoryCtrl"
	}

	var route = {
		name: "route",
		url: "/route",
		templateUrl: "/views/route/route.ejs", 
		controller: "RouteCtrl",
		params: {
			destination: ""
		}
	}

	var login = {
		name: "login",
		url: "/login",
		templateUrl: "/views/account/login.ejs", 
		controller: "LoginCtrl"
	}

	var register = {
		name: "register",
		url: "/register",
		templateUrl: "/views/account/register.ejs", 
		controller: "RegistrationCtrl"
	}

	var trail = {
		name: "trail",
		url: "/trail",
		template: "<span>trail</span>"
	}

	var wishlist = {
		name: "wishlist",
		url: "/wishlist",
		templateUrl: "/views/user/wishlist.ejs",
		controller: "WishlistCtrl"
	}

	var favourites = {
		name: "favourites",
		url: "/favourites",
		template: "<span>favourites</span>"
	}

	var avatar = {
		name: "avatar",
		url: "/avatar",
		templateUrl: "/views/user/avatar.ejs",
		controller: "AvatarCtrl"
	}
	
	
	$stateProvider.state(home);
	$stateProvider.state(hotspots);
	$stateProvider.state(singleHotspot);
	$stateProvider.state(labelHotspot);
	$stateProvider.state(history);
	$stateProvider.state(route);
	$stateProvider.state(login);
	$stateProvider.state(register);
	$stateProvider.state(trail);
	$stateProvider.state(wishlist);
	$stateProvider.state(favourites);
	$stateProvider.state(avatar);
}