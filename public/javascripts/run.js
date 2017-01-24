angular.module("TouristHotspots")
.run(RunBlock);

RunBlock.$inject = ["$rootScope", "$log", "$state"];

function RunBlock($rootScope, $log, $state) {
	/**
	 *	@description
	 *	所有功能能否被使用要看登陆状态，默认false
	 */
	$rootScope.loggedIn = false;

	/**
	 *	@description
	 *	主页跳转到登陆页面
	 */
	if ($rootScope.route === undefined) {
		$state.go("login");
	}

	/**
	 *	@description
	 *	用来保存路由的上一个状态
	 */
	$rootScope.$on("$stateChangeSuccess", function(event, to, toParams, from, fromParams) {
		$rootScope.route = {
			event: event, 
			to: to, 
			toParams: toParams, 
			from: from, 
			fromParams: fromParams
		}
	});

	/**
	 *	@description
	 *	若尝试没登录状态下访问页面，前置跳转登陆页面
	 */
	$rootScope.$on("$stateChangeSuccess", function(event, to, toParams, from, fromParams) {
		if (!$rootScope.loggedIn && (to.name !== "login" && to.name !== "register")) {
			$state.go("login");
		}
	});

		
	
}