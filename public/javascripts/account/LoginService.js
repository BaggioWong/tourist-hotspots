angular.module("TouristHotspots")
.service("LoginService", LoginService);

LoginService.$inject = ["$log", "$q"];


function LoginService($log, $q) {
	/**
	 *	@mock
	 *	@description
	 *	模拟用户数据库
	 */
	var loginDatabase = [
		{username: "elton", password: "john"},
		{username: "betty", password: "suarez"},
		{username: "jean", password: "claude"},
		{username: "hinazuki", password: "minamoto"},
		{username: "baekmoon", password: "lee"},
		{username: "zhixuan", password: "he"},
		{username: "xican", password: "zheng"},
	];	

	/**
	 *	@mock
	 *	@description
	 *	模拟搜索数据库功能
	 */
	this.loginVerification = function(username, password) {
		for (var i = 0; i < loginDatabase.length; i++) {
			if (loginDatabase[i].username == username && loginDatabase[i].password == password)
				return true;
		}

		return false;
	}

	/**
	 *	@mock
	 *	@description
	 *	模拟登陆功能
	 */
	this.login = function(username, password) {
		var loginVerification = this.loginVerification;

		return $q(function(resolve, reject) {
			if (loginVerification(username, password))
				resolve("Login successful.");
			else
				reject("Wrong credentials.");
		})
	}
}